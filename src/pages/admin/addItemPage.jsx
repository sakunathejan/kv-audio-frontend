import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AddItemPage() {
    const [productKey, setProductKey] = useState("");
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState(0);
    const [productCategory, setProductCategory] = useState("audio");
    const [productDimensions, setProductDimensions] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const navigate = useNavigate()

    async function handleAddItem()
    {
        console.log("Sending product data:", {
            key: productKey,
            name: productName,
            price: productPrice,
            category: productCategory,
            dimensions: productDimensions,
            description: productDescription
        });
        const token = localStorage.getItem("token")


        if(token)
        {
            try
            {
                const result = await axios.post("http://localhost:3000/api/products" , {
                    key: productKey,
                    name: productName, 
                    price: productPrice,
                    category: productCategory,
                    dimensions: productDimensions,
                    description: productDescription
                }, {

                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                })
                toast.success(result.data.message)
                navigate("/admin/items")
            
            
            }catch(err)
            {
                console.log(err)
                console.error("API Error:", err);
                if (err.response) {
                    toast.error(err.response.data.error || "Failed to add product");
                } else {
                    toast.error(err.message || "Failed to add product");
                }


            }
        }
        else{
            {
                toast.error(" Your not authorized to add items ")
            }
        }
    }
    return (
        <div className="w-full h-full flex flex-col items-center">
            <h1 className="text-2xl font-bold mb-4">Add Items</h1>
            <div className="w-[400px] border p-4 flex flex-col items-center gap-2">
                <input 
                    type="text" 
                    placeholder="Product Key" 
                    value={productKey} 
                    onChange={(e) => setProductKey(e.target.value)}
                    className="border p-2 w-full"
                />
                <input 
                    type="text" 
                    placeholder="Product Name" 
                    value={productName} 
                    onChange={(e) => setProductName(e.target.value)}
                    className="border p-2 w-full"
                />
                <input 
                    type="number" 
                    placeholder="Product Price" 
                    value={productPrice} 
                    onChange={(e) => setProductPrice(Number(e.target.value))}
                    className="border p-2 w-full"
                />
                <select
                    value={productCategory}
                    onChange={(e) => setProductCategory(e.target.value)}
                    className="w-full p-2 border rounded"
                >
                    <option value="audio">Audio</option>
                    <option value="lights">Lights</option>
                </select>

                <input 
                    type="text" 
                    placeholder="Product Dimensions" 
                    value={productDimensions} 
                    onChange={(e) => setProductDimensions(e.target.value)}
                    className="border p-2 w-full"
                />
                <textarea 
                    type="text" 
                    placeholder="Product Description" 
                    value={productDescription} 
                    onChange={(e) => setProductDescription(e.target.value)}
                    className="border p-2 w-full"
                />
                <button onClick={handleAddItem} className="bg-blue-500 text-white p-2 rounded w-full">Add</button>
                <button onClick={()=>(navigate("/admin/items"))} className="bg-red-500 text-white p-2 rounded w-full">Cancel</button>

            </div>
        </div>
    );
}
