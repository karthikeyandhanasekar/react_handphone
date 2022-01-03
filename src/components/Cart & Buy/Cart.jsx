import React from "react"
import Header from '../Header';
import { collection, doc, deleteDoc, getDoc, setDoc, getDocsFromServer } from "firebase/firestore";
import { database } from "../../Firebase/firebaseconfig";
import { Button, Collapse, Descriptions, InputNumber, List, Space, Typography, } from "antd";
import CartItem from "./List";
import TextArea from "antd/lib/input/TextArea";
import Form from "antd/lib/form/Form";

import { PhoneOutlined, ShoppingCartOutlined, } from "@ant-design/icons";
import CollapsePanel from "antd/lib/collapse/CollapsePanel";



const Cart = () => {
    const [cartlist, getcartlist] = React.useState()
    const [buylist, getbuylist] = React.useState()

    const [address, getaddress] = React.useState('')
    const [phone, getphone] = React.useState('')

    const [total, gettotal] = React.useState()

    const [rerender, setrender] = React.useState(false)


    //delete document
    const deletedocument = async (name) => {
        try {
            const cartdocument = doc(database, "cart", sessionStorage.getItem("email"), "items", name)
            await deleteDoc(cartdocument)


        } catch (error) {
            console.error(error.message);
        }
    }


    //cartlist from server
    const getcartfromserver = async () => {
        const cart = collection(database, "cart", sessionStorage.getItem("email"), "items")
        const data = await getDocsFromServer(cart)
        console.log(!!data.docs[0]);
        getcartlist(data.docs.map(ele =>
            ele.data()))
        gettotal(!!data.docs[0] ? data.docs.map(ele => Number.parseInt(ele.data()["updatedprice"])).reduce((output, ele) => output + ele) : 0);
    }

    //buylist from server
    const getbuyfromserver = async () => {
        const cart = collection(database, "buy", sessionStorage.getItem("email"), "items")
        const data = await getDocsFromServer(cart)
        getbuylist(data.docs.map(ele =>
            ele.data()))
    }


    //handle buy process
    const handlebuy = async () => {
        try {
            const token = new Date().valueOf().toString()
            const document = doc(database, "buy", sessionStorage.getItem("email"), "items", token)

            const details = {
                invoice: token,
                invoicedate: new Date().toUTCString(),
                total: total,
                phone: phone,
                address: address,
                email: sessionStorage.getItem("email"),
                cartlist: cartlist,
            }
            await setDoc(document, details)
            cartlist.forEach(async (item) => {
                console.log(item.name);
                deletedocument(item.name)


            });
            handlerender()



        } catch (error) {
            console.error(error.message);
        }
    }
    //rerender parent by child
    const handlerender = () => {
        setrender(data => !data)
    }
    React.useEffect(() => {
        getcartfromserver()
        getbuyfromserver()
    }, [rerender])

    console.log(buylist);
    return (
        <React.Fragment>

            <Header cartcount={cartlist?.length} />
            <main className="cartmain">
                <h1><ShoppingCartOutlined />&nbsp;Here {sessionStorage.getItem("username")},Your Shopping Cart</h1>
                <div>
                    <Space direction="vertical">
                        <Collapse collapsible={cartlist[0]? "header" : "disabled"} defaultActiveKey={['1']}>
                            <CollapsePanel header={"Cart List"} key="1">
                                {

                                    <List className="cartlist" dataSource={cartlist}
                                        renderItem={item =>
                                            <CartItem type={"cart"} data={item} onrerender={handlerender} />
                                        } />
                                }
                            </CollapsePanel>
                        </Collapse>
                        <Collapse  collapsible={buylist[0]? "header" : "disabled"} defaultActiveKey={['1']}>
                            <CollapsePanel header={"List of Buy Items"} key="1">
                                {
                                    buylist?.map((ele, index) =>
                                        <Collapse collapsible="header" key={index}>
                                            <CollapsePanel header={ele.invoicedate}>
                                               <Descriptions title={`Invoice No : ${ele.invoice}`}>
                                               <Descriptions.Item label="Total"  span={1} >{`₹ ${(ele.total).toLocaleString()}`}</Descriptions.Item>

                                               <Descriptions.Item label="Phone" span={2}>{ele.phone}</Descriptions.Item>
                                               <Descriptions.Item label="Product" span={3}>{ele.cartlist.map(ele=>ele.name).join(",")}</Descriptions.Item>

                                               <Descriptions.Item label="Address"  span={2} >{ele.address}</Descriptions.Item>




                                               </Descriptions>
                                            </CollapsePanel>
                                        </Collapse>

                                    )
                                }
                            </CollapsePanel>
                        </Collapse>
                    </Space>

                    <div className="cartdetails">
                        <Form className="form" onFinish={handlebuy}>
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
                            <Button type="primary" htmlType="submit" disabled={total !== 0 ? false : true} >Buy</Button>
                        </Form>

                    </div>

                </div>
            </main>
        </React.Fragment>
    )
}


export default Cart


