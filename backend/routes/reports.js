/** @format */

const express = require("express");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const db = require("../database");
const router = express.Router();

// Generate Sales Report PDF
router.get("/sales-report", (req, res) => {
	db.all(
		`SELECT sales.id, products.name, sales.quantity, sales.total_price, sales.date FROM sales 
            JOIN products ON sales.product_id = products.id`,
		[],
		(err, rows) => {
			if (err) {
				return res.status(500).json({ error: err.message });
			}

			// Create a PDF Document
			const doc = new PDFDocument();
			const filePath = `./reports/sales_report_${Date.now()}.pdf`;
			doc.pipe(fs.createWriteStream(filePath));
			doc.pipe(res);

			doc.fontSize(20).text("Sales Report", { align: "center" });
			doc.moveDown();

			rows.forEach((sale, index) => {
				doc
					.fontSize(12)
					.text(
						`${index + 1}. ${sale.name} - Qty: ${sale.quantity} - Total: $${
							sale.total_price
						} - Date: ${sale.date}`
					);
				doc.moveDown();
			});

			doc.end();
		}
	);
});

module.exports = router;
