import { Route, Routes } from "react-router-dom"
import Cart from "./Cart & Buy/Cart"
import Home from './Home'
import Login from "./Login"
import PhoneDetails from "./PhoneDetails"
import Signin from "./Signin"


const Main = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={< Login />} />
            <Route path="/signin" element={< Signin />} />
            <Route path="/cart" element={< Cart />} />
            <Route path="/phonedetails/:name" element={< PhoneDetails />} />

        </Routes>
    )
}

export default Main