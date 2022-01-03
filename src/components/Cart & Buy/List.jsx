import { DeleteFilled } from "@ant-design/icons"
import { InputNumber, List } from "antd"
import React from "react"
import { updateDoc, doc, deleteDoc, getDocFromServer } from "firebase/firestore";
import { database } from "../../Firebase/firebaseconfig";



const CartItem = ({ data, onrerender, type }) => {
    const [updateddata, setupdateddata] = React.useState(data)




    const document = doc(database, "cart", sessionStorage.getItem("email"), "items", data.name)

    const deletecart = async () => {
        try {
            await deleteDoc(document)
            onrerender()
        } catch (error) {
            console.error(error.message);
        }
    }
    const updatecart = async (value) => {
        try {
            if (value > 0) {
                console.log(typeof value);
                const docfromserver = await getDocFromServer(document)
                let existdata = docfromserver.data()
                existdata["updatedprice"] = existdata["initialprice"] * value
                existdata["quantity"] = value

                setupdateddata(existdata)
                await updateDoc(document, existdata)
                onrerender()
                console.log(typeof value);


            }
        } catch (error) {
            console.error(error.message);
        }

    }

    const action = [
        <InputNumber min={1} max={10} defaultValue={updateddata.quantity} onChange={updatecart} />,
        <span className="price">{`₹ ${(updateddata.updatedprice).toLocaleString()}`}</span>,
        <DeleteFilled onClick={deletecart} className="deleteicon" />
    ]
    return (
        <List.Item key={data.name} actions={type === "cart" ? action : null}   >

            <List.Item.Meta
                avatar={null}
                title={<p>{data.name}</p>}
                description={<p>{data.features}</p>}
            />
        </List.Item>
    )
}


export default CartItem