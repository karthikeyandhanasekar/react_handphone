import { Button, Carousel, Modal } from "antd";
import Text from "antd/lib/typography/Text";
import React from "react"
import { useParams } from "react-router-dom"
import { phones } from '../data/phones'
import Header from './Header';
import { database } from '../Firebase/firebaseconfig'
import { setDoc, doc, deleteDoc, getDocFromServer } from "firebase/firestore";
import {  useNavigate } from "react-router-dom";

const PhoneDetails = () => {
    const { name } = useParams()
    const data = phones.find(ele => ele.title === name)
    const navigate = useNavigate()
    const [iscartsucess, setcartsucess] = React.useState(false)


    const token = !!sessionStorage['auth-token']
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
        <React.Fragment>
            <Header />
            <main className="phonedetails">
                <Carousel className="phonedisplay" autoplay dotPosition="bottom">
                    {
                        data.images.map(ele => <img alt={ele} key={ele} className="image" width={200} src={ele} />)
                    }
                </Carousel>
                <div className="details">
                    <h1>{data.title}</h1>
                    <Text className="phonetext">{data.description}</Text><br />
                    <Text className="phonetext title" type="success">Price : ₹ {data.price.toFixed(0)}</Text>
                    <br />
                    <Button type="primary" danger={iscartsucess} onClick={() => { iscartsucess ? removecart(data) : addcart(data) }} > {iscartsucess ? `Remove from Cart` : `Add to Cart`}</Button>
                    <br/>
                    <Text className="phonetext title" type="success" >Features</Text>
                    <ul>
                        <li>{data.cpu}</li>
                        <li>{data.memory}</li>
                        <li>{data.battery}</li>
                        <li>{data.camera}</li>
                        <li>{data.size}</li>
                        <li>{data.weight}</li>


                    </ul>

                </div>
            </main>
        </React.Fragment>
    )
}

export default PhoneDetails
/**
 * battery: "1480 mAh"
brand: "huawei"
camera: "8mp (3264x2448)"
category: "phone"
cpu: "1.3GHz Apple A6"
description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur!"
display: "4.0 326 pixel density"
id: 16
images: (4) ['https://productimages.hepsiburada.net/s/23/280-413/10059934859314.jpg?v1', 'https://productimages.hepsiburada.net/s/23/280-413/10059934892082.jpg?v1', 'https://productimages.hepsiburada.net/s/23/280-413/10059934924850.jpg?v1', 'https://productimages.hepsiburada.net/s/23/280-413/10059934957618.jpg?v1']
memory: "16GB, 32GB and RAM 1 GB"
price: 5288.552334214134
size: "124.4mm x 59.2mm x 8.97mm (4.9 x 2.33 x 0.35)"
title: "Huawei P Smart 2019 64 GB (Huawei Türkiye Garantili)"
weight: "132 grams (4.7 ounces) with battery"
 */