/** @format */

import React from "react";
import api from "../services/api";

const Reports = () => {
	const handleGenerateReport = () => {
		api.getSalesReport();
	};

	const handlePrintReceipt = (saleId) => {
		window.open(`http://localhost:5000/receipt/${saleId}`, "_blank");
	};
	return <button onClick={handleGenerateReport}>Generate Report</button>;
};

export default Reports;
