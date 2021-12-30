import { DeleteFilled } from "@ant-design/icons"
import { InputNumber, List } from "antd"
import React from "react"
import { updateDoc, doc, deleteDoc, getDocFromServer } from "firebase/firestore";
import { database } from "../../Firebase/firebaseconfig";



const CartItem = ({ data, onrerender }) => {

    const [quantity, setquantity] = React.useState(data.quantity)

    const document = doc(database, "cart", sessionStorage.getItem("email"), "items", data.name)

    const deletecart = async () => {
        try {
            await deleteDoc(document)
            onrerender()
        } catch (error) {
            console.error(error.message);
        }
    }

    React.useEffect(() => {

        const updatecart = async (value) => {
            try {
                if (quantity > 0) {
                    const docfromserver = await getDocFromServer(document)
                    let existdata = docfromserver.data()
                    existdata["quantity"] = value
                    existdata["price"] *= value
                    await updateDoc(document, existdata)
                }
            } catch (error) {
                console.error(error.message);
            }

        }
        updatecart(quantity)
    }, [quantity, data.name, document])
    return (
        <List.Item key={data.name} actions={
            [
                <InputNumber min={1} max={10} defaultValue={quantity} onChange={(value) => value === 0 ? setquantity(1) : setquantity(value)} />,
                <span className="price">{`₹ ${(data.price * quantity).toLocaleString()}`}</span>,
                <DeleteFilled onClick={deletecart} className="deleteicon" />
            ]
        }   >

            <List.Item.Meta
                avatar={null}
                title={<p>{data.name}</p>}
                description={<p>{data.features}</p>}
            />
        </List.Item>
    )
}


export default CartItem