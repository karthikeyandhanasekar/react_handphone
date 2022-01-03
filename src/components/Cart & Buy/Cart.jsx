import React from "react"
import Header from '../Header';
import { collection, doc, deleteDoc, setDoc, getDocsFromServer } from "firebase/firestore";
import { database } from "../../Firebase/firebaseconfig";
import { Button, Collapse, Descriptions, InputNumber, List, Space } from "antd";
import CartItem from "./List";
import TextArea from "antd/lib/input/TextArea";

import { PhoneOutlined, ShoppingCartOutlined, } from "@ant-design/icons";
import CollapsePanel from "antd/lib/collapse/CollapsePanel";



const Cart = () => {
    const [cartlist, getcartlist] = React.useState()
    const [buylist, getbuylist] = React.useState()
    const [address, getaddress] = React.useState('')
    const [phone, getphone] = React.useState('')

    const [total, gettotal] = React.useState(0)

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
        getcartlist(data.docs.map(ele =>
            ele.data()))
        gettotal(!!data.docs[0] ? data.docs.map(ele => Number.parseInt(ele.data()["updatedprice"])).reduce((output, ele) => output + ele) : 0);
    }

    //buylist from server
    const getbuyfromserver = async () => {
        const cart = collection(database, "buy", sessionStorage.getItem("email"), "items")
        const data = await getDocsFromServer(cart)
        getbuylist(data.docs.map(ele =>
            ele.data()).reverse())
    }



    //buy product
    const handlebuy = async () => {
        try {
            const token = new Date().valueOf().toString()
            const document = doc(database, "buy", sessionStorage.getItem("email"), "items", token)

            const details = {
                invoice: token,
                invoicedate: new Date().toDateString() + " " + new Date().toLocaleTimeString(),
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
            getphone(null)
            getaddress("")
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


    // console.log(typeof phone);
    return (
        <React.Fragment>
            <Header cartcount={cartlist?.length} />
            <main className="cartmain">
                <h1><ShoppingCartOutlined />&nbsp;{cartlist?.length !== 0 ? `Here ${sessionStorage.getItem("username")},Your Shopping Cart` : `Your buying cart is presently empty. Add new merchandise on your collections.`}</h1>
                <div>
                    <Space direction="vertical">
                        <Collapse collapsible={cartlist?.length !== 0 ? "header" : "disabled"} defaultActiveKey={['1']}>
                            <CollapsePanel header={"Cart List"} key="1">
                                {
                                    cartlist?.length !== 0 ?
                                        <List className="cartlist" dataSource={cartlist}
                                            renderItem={item =>
                                                <CartItem key={item.name} type={"cart"} data={item} onrerender={handlerender} />
                                            } /> : null
                                }
                            </CollapsePanel>
                        </Collapse>
                        <Collapse collapsible={buylist?.length !== 0 ? "header" : "disabled"} defaultActiveKey={['1']}>
                            <CollapsePanel header={"List of Buy Items"} key="1">
                                {
                                    buylist?.map((ele, index) =>
                                        <Collapse collapsible="header" key={index}>
                                            <CollapsePanel header={ele.invoicedate}>
                                                <Descriptions title={`Invoice No : ${ele.invoice}`}
                                                    column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}

                                                >
                                                    <Descriptions.Item label="Total" span={1} >{`₹ ${(ele.total).toLocaleString()}`}</Descriptions.Item>

                                                    <Descriptions.Item label="Phone" span={2}>{ele.phone}</Descriptions.Item>
                                                    <Descriptions.Item label="Product" span={3}>{ele.cartlist.map(ele => ele.name).join(",")}</Descriptions.Item>

                                                    <Descriptions.Item label="Address" span={2} >{ele.address}</Descriptions.Item>
                                                </Descriptions>
                                            </CollapsePanel>
                                        </Collapse>

                                    )
                                }
                            </CollapsePanel>
                        </Collapse>
                    </Space>

                    <div className="cartdetails">
                        <Collapse collapsible={cartlist?.length !== 0 ? "header" : "disabled"} defaultActiveKey={["1"]}>
                            <CollapsePanel header="Shipping Information" key="1" >
                                <TextArea className="textarea" defaultValue={address} onChange={(value) => getaddress(value.target.value)} spellCheck required rows={3} placeholder="Address....." />
                                <br />                            <br />
                                <InputNumber required placeholder="phone number" defaultValue={phone} onChange={getphone} maxLength={10} minLength={10} addonBefore={<PhoneOutlined />} style={{ width: '100%' }} />
                                <br />
                            </CollapsePanel>
                        </Collapse>
                        <Collapse collapsible={address.length !== 0 && !!phone ? "header" : "disabled"} defaultActiveKey={["1"]}>
                            <CollapsePanel header="Order Summary" key="1" >
                                {address.length !== 0 && !!phone ?
                                    <Descriptions layout="vertical" bordered
                                        column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}

                                    >

                                        <Descriptions.Item label="Address" >
                                            <address>{address}</address>
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Phone" >
                                            {phone}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Item" >
                                            {cartlist?.length}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Total" >
                                            {`₹ ${(total.toLocaleString())}`}
                                        </Descriptions.Item>
                                        <Descriptions.Item  ><Button type="primary" onClick={handlebuy} >Buy</Button></Descriptions.Item>

                                    </Descriptions> : null}
                            </CollapsePanel>
                        </Collapse>
                    </div>

                </div>
            </main>
        </React.Fragment>
    )
}


export default Cart


