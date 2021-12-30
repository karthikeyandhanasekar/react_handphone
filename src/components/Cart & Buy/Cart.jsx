import React from "react"
import Header from '../Header';
import { collection, getDocsFromServer } from "firebase/firestore";
import { database } from "../../Firebase/firebaseconfig";
import { InputNumber, List, Typography } from "antd";
import CartItem from "./List";
import TextArea from "antd/lib/input/TextArea";
import Form from "antd/lib/form/Form";
import { PhoneOutlined, ShoppingCartOutlined } from "@ant-design/icons";

const Cart = () => {
    const [cartlist, getcartlist] = React.useState()
    const [address, getaddress] = React.useState('')
    const [phone, getphone] = React.useState('')

    const [total, gettotal] = React.useState()

    const [rerender, setrender] = React.useState(false)

    console.log(phone);

    const getcartfromserver = async () => {
        const cart = collection(database, "cart", sessionStorage.getItem("email"), "items")
        const data = await getDocsFromServer(cart)
        getcartlist(data.docs.map(ele =>
            ele.data()))
        gettotal(data.docs.map(ele => Number.parseInt(ele.data()["updatedprice"])).reduce((output, ele) => output + ele));

    }

    const handlerender = () => {
        setrender(data => !data)
    }
    React.useEffect(() => {
        getcartfromserver()
    }, [rerender])

    return (
        <React.Fragment>
            <Header cartcount={cartlist?.length} />
            <main className="cartmain">
                <h1><ShoppingCartOutlined />&nbsp;Here {sessionStorage.getItem("username")},Your Shopping Cart</h1>
                <div>
                   {
                 
                       <List className="cartlist" dataSource={cartlist}
                       renderItem={item =>
                           <CartItem data={item} onrerender={handlerender} />
                       }/>  
                   }
                    <div className="cartdetails">
                        <Form className="form">
                            <Typography ><h4 className="text"> Order Summary</h4></Typography>
                            <div>
                                <Typography className="text">Items {cartlist?.length} </Typography>
                                <Typography className="text">{total?.toLocaleString()}</Typography>
                            </div>
                            <br />
                            <TextArea className="textarea" defaultValue={address} onChange={(value) => getaddress(value.target.value)} spellCheck required rows={3} placeholder="Address....." />
                            <br />                            <br />

                            <InputNumber required placeholder="phone number" defaultValue={phone} onChange={getphone} maxLength={10} minLength={10} addonBefore={<PhoneOutlined />} style={{ width: '100%' }} />
                            <br />
                            <div>
                                <Typography className="text total">Total</Typography>
                                <Typography className="text total">{total?.toLocaleString()}</Typography>
                            </div>
                            <br />
                            <input type="submit" value={"Buy"} />
                        </Form>

                    </div>

                </div>
            </main>
        </React.Fragment>
    )
}


export default Cart