import { database } from '../Firebase/firebaseconfig'
import { setDoc, doc, deleteDoc } from "firebase/firestore";
import { Button, Modal } from "antd";

import { useNavigate } from "react-router-dom";
import React from 'react';

const Phone = ({ phone }) => {
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
            if (token) {

                //if user signin
                const details = {
                    id: data.id,
                    name: data.title,
                    price: data.price.toFixed(0),
                    features: data.cpu + ", " + data.display + ", " + data.memory + ", " + data.battery,
                    quantity: 1
                }
                const collect = doc(database, "cart", sessionStorage.getItem("email"), "items", data.title)
                await setDoc(collect, details)
                setcartsucess(true)

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
            <Button className="primary buttons" onClick={() => { iscartsucess ? removecart(phone) : addcart(phone) }} > {iscartsucess ? `Remove from Cart` : `Add to Cart`}</Button>
        </div>
    )

}


export default Phone