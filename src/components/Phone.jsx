import { database } from '../Firebase/firebaseconfig'
import { setDoc, doc, deleteDoc, getDocFromServer } from "firebase/firestore";
import { Button, Modal } from "antd";
import { Link, useNavigate } from "react-router-dom";
import React from 'react';



const Phone = ({ phone }) => {
    const navigate = useNavigate()
    const [iscartsucess, setcartsucess] = React.useState(false)


    const token = !!sessionStorage['auth-token']



    React.useEffect(() => {
        if (token) {
            const isDocumentexist = async () => {
                const document = doc(database, "cart", sessionStorage.getItem("email"), "items", phone.title)
                const docfromserver = await getDocFromServer(document)
                if (docfromserver.exists()) {
                    setcartsucess(true)
                }
            }
            isDocumentexist()
        }
    }, [token, phone.title])

    //deletecart in firstore
    const removecart = async (data) => {
        try {
            await deleteDoc(doc(database, "cart", sessionStorage.getItem("email"), "items", data.title))
            setcartsucess(false)
        } catch (error) {
            console.error(error.message);
        }
    }

    //upload cart in firestore
    const addcart = async (data) => {

        try {
            //if user signin
            if (token) {
                const document = doc(database, "cart", sessionStorage.getItem("email"), "items", data.title)
                const docfromserver = await getDocFromServer(document)
                if (docfromserver.exists()) {

                    // const updatecart = async () => {
                    //     let existdata = docfromserver.data()
                    //     existdata["quantity"] += 1
                    //     await updateDoc(document, existdata)
                    // }

                    //update existing cart

                    Modal.info({
                        title: "Already Added in cart",
                        content: "Press Exit to enter shopping page or click ok to enter your cart",
                        onOk() {
                            //  updatecart()
                            navigate('/cart')

                        },
                        onCancel() {
                            navigate('/')
                        }
                    })
                }
                else {
                    //add fresh cart
                    const details = {
                        id: data.id,
                        name: data.title,
                        updatedprice: data.price.toFixed(0),
                        initialprice: data.price.toFixed(0),
                        features: data.cpu + ", " + data.display + ", " + data.memory + ", " + data.battery,
                        quantity: 1
                    }
                    await setDoc(document, details)
                    setcartsucess(true)
                }

            }
            else {
                //if user not signin
                Modal.info({
                    title: "Login to continue your Shopping",
                    onOk() {
                        navigate('/login')
                    },
                    onCancel() {
                        navigate('/')
                    }
                })
            }

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div key={phone.id} className="phone" >
            <picture>
                <img src={phone.images[0]} alt={phone.title} />
            </picture>
            <h4>{phone.title}</h4>
            <p>{`₹ ${phone.price.toFixed(0)}`}</p>
            <Button type="primary" danger={iscartsucess} onClick={() => { iscartsucess ? removecart(phone) : addcart(phone) }} > {iscartsucess ? `Remove from Cart` : `Add to Cart`}</Button>
           <Link to={`/phonedetails/${phone.title}`} target="_blank" > <Button className="primary Default" >More Details</Button></Link>

        </div>
    )

}


export default Phone