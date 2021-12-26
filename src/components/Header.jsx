import { Cascader } from "antd"
import React from "react"
import { brands } from '../data/brand.jsx'
import { phones } from '../data/phones.jsx'
import brand from '../assets/images/brand-transparent.png'
import { Button, } from 'antd';
import { ShoppingCartOutlined, UserSwitchOutlined } from '@ant-design/icons';



const Header = () => {
    //get search value from cascader
    const [search, getsearch] = React.useState()


    console.log(search);
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
            <picture>
                <img src={brand} alt="HandPhone.png" />
            </picture>
            <Cascader options={options} placeholder="please search" className="cascader"
                onChange={(value) => getsearch(value[1])}
                showSearch={{ filter }}
            />
            <Button type="text" icon={<UserSwitchOutlined />}
                style={
                    {
                        color: "white",
                        backgroundColor: "transparent",
                        border: "none",
                        fontSize: "20px"
                    }
                }>Sign in</Button>
            <Button type="text" icon={<ShoppingCartOutlined />}
                style={
                    {
                        color: "white",
                        backgroundColor: "transparent",
                        border: "none",
                        fontSize: "20px"
                    }
                }>Cart</Button>
        </header>
    )
}

export default Header
