/** @format */

import axios from "axios";

const API_URL = "http://localhost:5000";

const api = {
	getProducts: () => axios.get(`${API_URL}/products/list`),
	addProduct: (product) => axios.post(`${API_URL}/products/add`, product),
	updateStock: (id, stock) =>
		axios.put(`${API_URL}/products/update/${id}`, { stock }),
	deleteProduct: (id) => axios.delete(`${API_URL}/products/delete/${id}`),

	getSales: () => axios.get(`${API_URL}/sales/list`),
	addSale: (sale) => axios.post(`${API_URL}/sales/add`, sale),
	getSalesByDate: (date) => axios.get(`${API_URL}/sales/by-date/${date}`),

	getSalesReport: () =>
		window.open(`${API_URL}/reports/sales-report`, "_blank"),
};

export default api;
