import { Cascader } from "antd"
import React from "react"
import { brands } from '../data/brand.jsx'
import { phones } from '../data/phones.jsx'
import brand from '../assets/images/brand-transparent.png'
import { Button } from 'antd';
import { ShoppingCartOutlined, UserSwitchOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link, useNavigate } from "react-router-dom"



const Header = () => {
    //get session token & email
    const [token] = React.useState(!!sessionStorage['auth-token'])
    const navigate = useNavigate()

    //get search value from cascader
    const [search, getsearch] = React.useState()
    console.log(token);

    const logout = () => {
        sessionStorage.removeItem('auth-token');
        navigate('/login')

    }

    //generate option for cascader
    const options = brands.map(brand => {
        return {
            value: brand.toLowerCase(),
            label: brand,
            children: phones.map(ele => ele.title.toLowerCase().search(brand) >= 0 ? ele.title : null)
                .filter(Boolean)
                .map(ele => { return { value: ele.toLowerCase(), label: ele } })
        }
    })

    //filter for typing feature in cascader
    const filter = (inputValue, path) => path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);


    return (
        <header>
            <div className="logo">
                <picture>
                    <img src={brand} alt="HandPhone.png" />
                </picture>
            </div>

            <div>
                <Cascader options={options} placeholder="please search" className="cascader"
                    onChange={(value) => getsearch(value[1])}
                    showSearch={{ filter }}
                />
            </div>

            <div className="headerbuttons">
                <Link to="/login" >

                    <Button type="text" icon={<UserSwitchOutlined />}
                        style={
                            {
                                color: "white",
                                backgroundColor: "transparent",
                                border: "none",
                                fontSize: "20px"
                            }
                        }>{!!sessionStorage.getItem('username') ? `Welcome ${sessionStorage.getItem('username')}` : `Sign in`}</Button>
                </Link>
                <Button type="text" icon={<ShoppingCartOutlined />}
                    style={
                        {
                            color: "white",
                            backgroundColor: "transparent",
                            border: "none",
                            fontSize: "20px"
                        }
                    }>Cart</Button>
                {
                    token ? <Button type="text" icon={<LogoutOutlined />} onC lick={logout}
                        style={
                            {
                                color: "white",
                                backgroundColor: "transparent",
                                border: "none",
                                fontSize: "20px"
                            }
                        }>LogOut</Button> : null
                }
            </div>
        </header>
    )
}

export default Header
