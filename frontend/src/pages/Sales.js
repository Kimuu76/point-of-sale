/** @format */

import React, { useEffect, useState } from "react";
import api from "../services/api";

const Sales = () => {
	const [sales, setSales] = useState([]);
	const [products, setProducts] = useState([]);
	const [newSale, setNewSale] = useState({ product_id: "", quantity: "" });

	useEffect(() => {
		fetchSales();
		fetchProducts();
	}, []);

	const fetchSales = async () => {
		const response = await api.getSales();
		setSales(response.data);
	};

	const fetchProducts = async () => {
		const response = await api.getProducts();
		setProducts(response.data);
	};

	const handleAddSale = async () => {
		await api.addSale(newSale);
		setNewSale({ product_id: "", quantity: "" });
		fetchSales();
		fetchProducts();
	};

	const handleGenerateReport = () => {
		api.getSalesReport();
	};

	const handlePrintReceipt = (saleId) => {
		window.open(`http://localhost:5000/receipt/${saleId}`, "_blank");
	};

	return (
		<div>
			<h2>Sales Management</h2>
			<select
				value={newSale.product_id}
				onChange={(e) => setNewSale({ ...newSale, product_id: e.target.value })}
			>
				<option value=''>Select Product</option>
				{products.map((product) => (
					<option key={product.id} value={product.id}>
						{product.name}
					</option>
				))}
			</select>
			<input
				type='number'
				placeholder='Quantity'
				value={newSale.quantity}
				onChange={(e) => setNewSale({ ...newSale, quantity: e.target.value })}
			/>
			<button onClick={handleAddSale}>Add Sale</button>
			<button onClick={handleGenerateReport}>Generate Report</button>

			<ul>
				{sales.map((sale) => (
					<li key={sale.id}>
						{sale.name} - Qty: {sale.quantity} - Total: ${sale.total_price}
						<button onClick={() => handlePrintReceipt(sale.id)}>
							Print Receipt
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Sales;
