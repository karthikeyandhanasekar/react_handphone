import { Button, Divider } from "antd";
import React from "react";


const Phones = ({ data, brand }) => {

    return (
        <React.Fragment>
            <Divider dashed><strong>{brand.slice(0, 1).toUpperCase() + brand.slice(1,).toLowerCase()}</strong></Divider>

            <div className="brand" >
                {
                    data.map(ele =>
                        <div key={ele.id} className="phone" >
                            <picture>
                                <img src={ele.images[0]} alt={ele.title} />
                            </picture>
                            <h4>{ele.title}</h4>
                            <Button className="primary buttons" >Add to Cart</Button>
                        </div>
                    )
                }

            </div>
        </React.Fragment>


    )
}


export default Phones
/**
 * battery: "1480 mAh"
brand: "apple"
camera: "8mp (3264x2448)"
category: "phone"
cpu: "1.3GHz Apple A6"
description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur!"
display: "4.0 326 pixel density"
id: 0
images: Array(4)
0: "https://productimages.hepsiburada.net/s/18/280-413/9801258663986.jpg?v1"
1: "https://productimages.hepsiburada.net/s/18/280-413/9801258696754.jpg?v1"
2: "https://productimages.hepsiburada.net/s/18/280-413/9801258729522.jpg?v1"
3: "https://productimages.hepsiburada.net/s/18/280-413/9801258762290.jpg?v1"
length: 4
[[Prototype]]: Array(0)
memory: "16GB, 32GB and RAM 1 GB"
price: 4241.499828399639
size: "124.4mm x 59.2mm x 8.97mm (4.9 x 2.33 x 0.35)"
title: "Apple iPhone 7 Plus 32 GB (Apple Türkiye Garantili)"
weight: "132 grams (4.7 ounces) with battery"

 */