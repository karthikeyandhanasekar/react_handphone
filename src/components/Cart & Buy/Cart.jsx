import React from "react"
import Header from '../Header';
import { collection, doc, setDoc, getDocsFromServer } from "firebase/firestore";
import { database } from "../../Firebase/firebaseconfig";
import { Button, InputNumber, List, Typography } from "antd";
import CartItem from "./List";
import TextArea from "antd/lib/input/TextArea";
import Form from "antd/lib/form/Form";
import { PhoneOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import brand from '../../assets/images/brand.png'
import jsPDFInvoiceTemplate, { OutputType, jsPDF } from "jspdf-invoice-template";


const Cart = () => {
    const [cartlist, getcartlist] = React.useState()
    const [address, getaddress] = React.useState('')
    const [phone, getphone] = React.useState('')

    const [total, gettotal] = React.useState()

    const [rerender, setrender] = React.useState(false)


    //create invoice
    const createinvoice = (details) => {
        const props = {
            outputType: OutputType.Save,
            returnJsPDFDocObject: true,
            fileName: sessionStorage.getItem("email") + "-" + details.invoice,
            orientationLandscape: false,
            logo: {
                src: brand,
                width: 53.33, //aspect ratio = width/height
                height: 26.66,
                margin: {
                    top: 0, //negative or positive num, from the current position
                    left: 0 //negative or positive num, from the current position
                }
            },
            business: {
                name: "HandPhone",
                address: "Albania, Tirane ish-Dogana, Durres 2001",
                phone: "(+355) 069 11 11 111",
                email: "handpone@gmail.com",
                email_1: "admin@handphone.al",
                website: "www.handphone.net",
            },
            contact: {
                label: "Invoice issued for:",
                name: sessionStorage.getItem("username"),
                address: details.address,
                phone: details.phone.toLocaleString(),
                email: details.email,
                otherInfo: "www.website.al",
            },
            invoice: {
                label: `Invoice #:  `,
                num: details.invoice,
                invDate: `Payment Date: ${details.invoicedate}`,
                invGenDate: `Invoice Date: ${details.invoicedate}`,
                headerBorder: false,
                tableBodyBorder: false,
                header: ["#", "Description", "Price", "Quantity", "Total"],
                table: cartlist.map((item, index) => {
                    return [index + 1,
                    item.name,
                    item.initialprice.toLocaleString(),
                    item.quantity,
                    item.updatedprice.toLocaleString()]
                }),
                invTotalLabel: "Total:",
                invTotal: details.total.toLocaleString(),
                invCurrency: "ALL",

                invDescLabel: "Invoice Note",
                invDesc: "Save this invoice for future use..Be Safe Keep Safe",
            },
            footer: {
                text: "The invoice is created on a computer and is valid without the signature and stamp.",
            },
            pageEnable: true,
            pageLabel: "Page ",
        };

        const pdfObject = jsPDFInvoiceTemplate(props);
        pdfObject.jsPDFDocObject.save();
        console.log(pdfObject);
    }



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
            const token = new Date().valueOf()
            // const document = doc(database, "buy", sessionStorage.getItem("email"), "items", token)

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
            createinvoice(details)

        } catch (error) {
            console.error(error.message);
        }
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