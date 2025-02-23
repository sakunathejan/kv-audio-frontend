import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

export default function UpdateItemPage() {
    const location = useLocation()

    console.log(location)

	const [productKey, setProductKey] = useState(location.state.key);
	const [productName, setProductName] = useState(location.state.name);
	const [productPrice, setProductPrice] = useState(location.state.price);
	const [productCategory, setProductCategory] = useState(location.state.category);
	const [productDimensions, setProductDimensions] = useState(location.state.dimensions);
	const [productDescription, setProductDescription] = useState(location.state.description);
    const navigate = useNavigate()
    
	async function handleAddItem() {
		console.log(
			productKey,
			productName,
			productPrice,
			productCategory,
			productDimensions,
			productDescription
		);
		const token = localStorage.getItem("token");

		if (token) {
			try {
				const result = await axios.put("http://localhost:3000/api/products/" + productKey,
					{
						name: productName,
						price: productPrice,
						category: productCategory,
						dimensions: productDimensions,
						description: productDescription,
					},
					{
						headers: {
							Authorization: "Bearer " + token,
						},
					}
				);
                toast.success(result.data.message);
                navigate("/admin/items")

			} catch (err) {
				toast.error(err.response.data.error);
			}
		} else {
			toast.error("You are not authorized to add items");
		}
	}

	return (
		<div className="w-full h-full flex flex-col items-center p-4">
			<h1 className="text-lg font-bold mb-4">Update Item</h1>
			<div className="w-[400px] border p-4 flex flex-col items-center gap-2 rounded-lg shadow-md">
				<input
                    disabled
					type="text"
					placeholder="Product Key"
					value={productKey}
					onChange={(e) => setProductKey(e.target.value)}
					className="w-full p-2 border rounded"
				/>
				<input
					type="text"
					placeholder="Product Name"
					value={productName}
					onChange={(e) => setProductName(e.target.value)}
					className="w-full p-2 border rounded"
				/>
				<input
					type="number"
					placeholder="Product Price"
					value={productPrice}
					onChange={(e) => setProductPrice(e.target.value)}
					className="w-full p-2 border rounded"
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
					className="w-full p-2 border rounded"
				/>
				<textarea
					type="text"
					placeholder="Product Description"
					value={productDescription}
					onChange={(e) => setProductDescription(e.target.value)}
					className="w-full p-2 border rounded"
				/>
				<button
					onClick={handleAddItem}
					className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
				>
					Update Item
				</button>
				<button onClick={()=>{ navigate("/admin/items")}} className="w-full p-2 bg-red-500 text-white rounded hover:bg-red-600">
					Cancel
				</button>
			</div>
		</div>
	);
}