const sampleArr = [
    {
      key: "AUDIO123",
      name: "Wireless Headphones",
      price: 199.99,
      catergoy: "audio",
      dimensions: "7x6x3 inches",
      description: "High-quality noise-canceling wireless headphones.",
      availability: "In Stock",
      image: [
        "https://example.com/images/wireless-headphones.jpg"
      ]
    },
    {
      key: "LIGHTS456",
      name: "Smart LED Strip",
      price: 49.99,
      catergoy: "lights",
      dimensions: "10m length",
      description: "Customizable RGB LED strip with smart app control.",
      availability: "Limited Stock",
      image: [
        "https://example.com/images/smart-led-strip.jpg"
      ]
    },
    {
      key: "AUDIO789",
      name: "Bluetooth Speaker",
      price: 79.99,
      catergoy: "audio",
      dimensions: "5x5x5 inches",
      description: "Portable Bluetooth speaker with deep bass and waterproof design.",
      availability: "In Stock",
      image: [
        "https://example.com/images/bluetooth-speaker.jpg"
      ]
    },
    {
      key: "LIGHTS101",
      name: "Smart Ceiling Light",
      price: 129.99,
      catergoy: "lights",
      dimensions: "12-inch diameter",
      description: "Dimmable smart ceiling light with voice control.",
      availability: "Pre-Order",
      image: [
        "https://example.com/images/smart-ceiling-light.jpg"
      ]
    },
    {
      key: "AUDIO555",
      name: "Noise Cancelling Earbuds",
      price: 149.99,
      catergoy: "audio",
      dimensions: "2x1x1 inches",
      description: "True wireless earbuds with ANC and 30-hour battery life.",
      availability: "In Stock",
      image: [
        "https://example.com/images/noise-cancelling-earbuds.jpg"
      ]
    }
  ];
import { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import {Link} from "react-router-dom";

export default function AdminItemPage(){
     const [items , setItems] = useState(sampleArr)
    return(
        <div  className="w-full h-full relative">            
                <table>
                    <thead>
                        <th>Key</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Dimensions</th>
                        <th>Availability</th>                        
                    </thead>
                    <tbody>
                        {
                            items.map((product)=>{
                                console.log(product)
                                return(
                                    <tr key={product.key}>
                                        <td>{product.key}</td>
                                        <td>{product.name}</td>
                                        <td>{product.price}</td>
                                        <td>{product.catergoy}</td>
                                        <td>{product.dimensions}</td>
                                        <td>{product.availability}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            <Link to="/admin/items/add">
                <CiCirclePlus className="text-[100px]  absolute right-2 bottom-2 hover:text-red-400 "/>
            </Link>
            
        </div>
    )
}
