/** @format */

const express = require("express");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const db = require("../database");
const router = express.Router();

// Ensure receipts directory exists
const receiptsDir = "./receipts";
if (!fs.existsSync(receiptsDir)) {
	fs.mkdirSync(receiptsDir);
}

// Generate Receipt PDF
router.get("/:saleId", (req, res) => {
	const { saleId } = req.params;
	db.get(
		`SELECT sales.id, products.name, sales.quantity, sales.total_price, sales.date FROM sales 
            JOIN products ON sales.product_id = products.id WHERE sales.id = ?`,
		[saleId],
		(err, sale) => {
			if (err || !sale) {
				return res.status(500).json({ error: "Sale not found" });
			}

			// Create a PDF Document
			const doc = new PDFDocument();
			const filePath = `${receiptsDir}/receipt_${sale.id}.pdf`;
			doc.pipe(fs.createWriteStream(filePath));
			doc.pipe(res);

			doc.fontSize(20).text("Sales Receipt", { align: "center" });
			doc.moveDown();
			doc.fontSize(14).text(`Receipt ID: ${sale.id}`);
			doc.text(`Product: ${sale.name}`);
			doc.text(`Quantity: ${sale.quantity}`);
			doc.text(`Total Price: $${sale.total_price}`);
			doc.text(`Date: ${sale.date}`);
			doc.moveDown();
			doc.text("Thank you for your purchase!", { align: "center" });

			doc.end();
		}
	);
});

module.exports = router;
