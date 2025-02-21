/** @format */

const express = require("express");
const db = require("../database");
const router = express.Router();

// Add a new product
router.post("/add", (req, res) => {
	const { name, price, stock } = req.body;
	if (!name || !price || !stock) {
		return res
			.status(400)
			.json({ error: "Please provide name, price, and stock" });
	}
	db.run(
		`INSERT INTO products (name, price, stock) VALUES (?, ?, ?)`,
		[name, price, stock],
		function (err) {
			if (err) {
				return res.status(500).json({ error: err.message });
			}
			res.json({ id: this.lastID, name, price, stock });
		}
	);
});

// Get all products
router.get("/list", (req, res) => {
	db.all(`SELECT * FROM products`, [], (err, rows) => {
		if (err) {
			return res.status(500).json({ error: err.message });
		}
		res.json(rows);
	});
});

// Update stock
router.put("/update/:id", (req, res) => {
	const { stock } = req.body;
	const { id } = req.params;
	db.run(
		`UPDATE products SET stock = ? WHERE id = ?`,
		[stock, id],
		function (err) {
			if (err) {
				return res.status(500).json({ error: err.message });
			}
			res.json({ message: "Stock updated successfully" });
		}
	);
});

// Delete a product
router.delete("/delete/:id", (req, res) => {
	const { id } = req.params;
	db.run(`DELETE FROM products WHERE id = ?`, [id], function (err) {
		if (err) {
			return res.status(500).json({ error: err.message });
		}
		res.json({ message: "Product deleted successfully" });
	});
});

module.exports = router;
