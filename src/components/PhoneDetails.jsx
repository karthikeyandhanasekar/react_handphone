import { Button, Carousel, Typography} from "antd";
import ExportTypography from "antd/lib/typography/Typography";
import React from "react"
import { useParams } from "react-router-dom"
import { phones } from '../data/phones'
import Header from './Header';

const PhoneDetails = () => {
    const { name } = useParams()
    const data = phones.find(ele => ele.title === name)
    console.log(data);

    return (
        <React.Fragment>
            <Header />
            <main className="phonedetails">
                <Carousel className="phonedisplay" autoplay dotPosition="bottom">
                    {
                        data.images.map(ele => <img alt={ele} className="image" width={200} src={ele} />)
                    }
                </Carousel>
                <div className="details">
                    <h1>{data.title}</h1>
                    <Typography className="phonetext">{data.description}</Typography>
                    <Typography className="phonetext"  type="success">Price : ₹ {data.price.toFixed(0)}</Typography>
                    <Button type="primary">Add to Cart</Button>
                    <Typography className="phonetext"  type="success" leve>Features</Typography>
                    <ul>
                        <li>{data.cpu}</li>
                        <li>{data.memory}</li>
                        <li>{data.battery}</li>
                        <li>{data.camera}</li>
                        <li>{data.size}</li>
                        <li>{data.weight}</li>


                    </ul>

                </div>
            </main>
        </React.Fragment>
    )
}

export default PhoneDetails
/**
 * battery: "1480 mAh"
brand: "huawei"
camera: "8mp (3264x2448)"
category: "phone"
cpu: "1.3GHz Apple A6"
description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur!"
display: "4.0 326 pixel density"
id: 16
images: (4) ['https://productimages.hepsiburada.net/s/23/280-413/10059934859314.jpg?v1', 'https://productimages.hepsiburada.net/s/23/280-413/10059934892082.jpg?v1', 'https://productimages.hepsiburada.net/s/23/280-413/10059934924850.jpg?v1', 'https://productimages.hepsiburada.net/s/23/280-413/10059934957618.jpg?v1']
memory: "16GB, 32GB and RAM 1 GB"
price: 5288.552334214134
size: "124.4mm x 59.2mm x 8.97mm (4.9 x 2.33 x 0.35)"
title: "Huawei P Smart 2019 64 GB (Huawei Türkiye Garantili)"
weight: "132 grams (4.7 ounces) with battery"
 */