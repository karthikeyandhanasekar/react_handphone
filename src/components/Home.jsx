import { Carousel } from "antd"
import React from "react"
import poster from '../assets/images/poster1.webp'
import poster2 from '../assets/images/poster2.webp'
import { brands } from '../data/brand.jsx'
import { phones } from '../data/phones.jsx'
import Phones from "./phonedisplay"

import Header from './Header';


const Home = () => {

    const options = brands.map(brand => phones.filter(ele => ele.title.toLowerCase().search(brand) >= 0 ? ele : null))
    const ui = options.map((ele, index) =>
        <Phones data={ele} key={brands[index]} brand={brands[index]} />
    )


    return (
        <React.Fragment>
            <Header />

            <Carousel autoplay className="carousel">
                <div>
                    <img src={poster} alt="flipkartmobile.webp" />
                </div>
                <div>
                    <img src={poster2} alt="flipkartmobile.webp" />
                </div>
            </Carousel>
            <div>
                {
                    ui
                }
            </div>
        </React.Fragment>
    )
}

export default Home

