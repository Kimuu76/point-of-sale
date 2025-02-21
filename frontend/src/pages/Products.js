/** @format */

import React, { useEffect, useState } from "react";
import api from "../services/api";

const Products = () => {
	const [products, setProducts] = useState([]);
	const [newProduct, setNewProduct] = useState({
		name: "",
		price: "",
		stock: "",
	});

	useEffect(() => {
		fetchProducts();
	}, []);

	const fetchProducts = async () => {
		const response = await api.getProducts();
		setProducts(response.data);
	};

	const handleAddProduct = async () => {
		await api.addProduct(newProduct);
		setNewProduct({ name: "", price: "", stock: "" });
		fetchProducts();
	};

	const handleUpdateStock = async (id, stock) => {
		await api.updateStock(id, stock);
		fetchProducts();
	};

	const handleDelete = async (id) => {
		await api.deleteProduct(id);
		fetchProducts();
	};

	return (
		<div>
			<h2>Product Management</h2>
			<input
				type='text'
				placeholder='Name'
				value={newProduct.name}
				onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
			/>
			<input
				type='number'
				placeholder='Price'
				value={newProduct.price}
				onChange={(e) =>
					setNewProduct({ ...newProduct, price: e.target.value })
				}
			/>
			<input
				type='number'
				placeholder='Stock'
				value={newProduct.stock}
				onChange={(e) =>
					setNewProduct({ ...newProduct, stock: e.target.value })
				}
			/>
			<button onClick={handleAddProduct}>Add Product</button>

			<ul>
				{products.map((product) => (
					<li key={product.id}>
						{product.name} - ${product.price} - Stock: {product.stock}
						<button
							onClick={() => handleUpdateStock(product.id, product.stock + 1)}
						>
							+1 Stock
						</button>
						<button onClick={() => handleDelete(product.id)}>Delete</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Products;
