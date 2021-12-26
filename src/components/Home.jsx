import { Carousel } from "antd"
import React from "react"
import poster from '../assets/images/poster1.webp'
import poster2 from '../assets/images/poster2.webp'


const Home = () => {
    return (
        <React.Fragment>
            <Carousel autoplay className="carousel">
                <div>
                    <img src={poster} alt="flipkartmobile.webp" />
                </div>
                <div>
                    <img src={poster2} alt="flipkartmobile.webp" />
                </div>
            </Carousel>
        </React.Fragment>
    )
}

export default Home