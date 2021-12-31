import React from "react"
import Header from '../Header';
import { collection, doc, setDoc, getDocsFromServer } from "firebase/firestore";
import { database } from "../../Firebase/firebaseconfig";
import { Button, InputNumber, List, Modal, Typography, } from "antd";
import CartItem from "./List";
import TextArea from "antd/lib/input/TextArea";
import Form from "antd/lib/form/Form";

import { PhoneOutlined, ShoppingCartOutlined, UploadOutlined } from "@ant-design/icons";
import brand from '../../assets/images/brand.png'

import Dragger from "antd/lib/upload/Dragger";


const Cart = () => {
    const [cartlist, getcartlist] = React.useState()
    const [address, getaddress] = React.useState('')
    const [phone, getphone] = React.useState('')

    const [total, gettotal] = React.useState()

    const [rerender, setrender] = React.useState(false)
    const [modalvisible, setmodal] = React.useState(false)
    const [isdownload, setdownload] = React.useState(false)







    const getcartfromserver = async () => {
        const cart = collection(database, "cart", sessionStorage.getItem("email"), "items")
        const data = await getDocsFromServer(cart)
        getcartlist(data.docs.map(ele =>
            ele.data()))
        gettotal(data.docs.map(ele => Number.parseInt(ele.data()["updatedprice"])).reduce((output, ele) => output + ele));
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
            console.log(details);
            await setDoc(document, details)
            
            // createinvoice(details)
            // setmodal(true)
            // console.log(storage);

        } catch (error) {
            console.error(error.message);
        }
    }
    const uploadfile = (file) => {
        console.log(file);
    }
    //rerender parent by child
    const handlerender = () => {
        setrender(data => !data)
    }
    React.useEffect(() => {
        getcartfromserver()
    }, [rerender])

    return (
        <React.Fragment>
            <Modal
                visible={modalvisible}
                onOk={() => { setdownload(true); setmodal(false) }}
                onCancel={() => { setmodal(false) }}
            //    okButtonProps={{ disabled: true }}
            //    cancelButtonProps={{ disabled: true }}
            >
                <Form >
                    <Dragger beforeUpload={uploadfile}
                        name="file" >
                        <Button icon={<UploadOutlined />}>Click to upload</Button>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">
                            Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                            band files
                        </p>
                    </Dragger>


                </Form>
            </Modal>
            <Header cartcount={cartlist?.length} />
            <main className="cartmain">
                <h1><ShoppingCartOutlined />&nbsp;Here {sessionStorage.getItem("username")},Your Shopping Cart</h1>
                <div>
                    {

                        <List className="cartlist" dataSource={cartlist}
                            renderItem={item =>
                                <CartItem data={item} onrerender={handlerender} />
                            } />
                    }
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
                            <Button type="primary" htmlType="submit" >Buy</Button>
                        </Form>

                    </div>

                </div>
            </main>
        </React.Fragment>
    )
}


export default Cart


