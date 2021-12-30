import React from "react"
import Header from '../Header';

import { collection, getDocsFromServer } from "firebase/firestore";
import { database } from "../../Firebase/firebaseconfig";
import { List } from "antd";
import CartItem from "./List";

const Cart = () => {
    const [cartlist, getcartlist] = React.useState()
    const [rerender, setrender] = React.useState(false)



    const getcartfromserver = async () => {
        const cart = collection(database, "cart", sessionStorage.getItem("email"), "items")
        const data = await getDocsFromServer(cart)
        getcartlist(data.docs.map(ele =>
            ele.data()))
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
                <h1>Your Bag <span className="noofitems">{cartlist?.length} Items</span></h1>
                <div>
                    <List className="cartlist" dataSource={cartlist}
                        renderItem={item =>
                            <CartItem data={item} onrerender={handlerender} />
                        }
                    />

                </div>
            </main>
        </React.Fragment>
    )
}


export default Cart