/** @format */

const express = require("express");
const db = require("../database");
const router = express.Router();

// Record a new sale
router.post("/add", (req, res) => {
	const { product_id, quantity } = req.body;
	if (!product_id || !quantity) {
		return res
			.status(400)
			.json({ error: "Please provide product_id and quantity" });
	}

	// Get product price and check stock
	db.get(
		`SELECT price, stock FROM products WHERE id = ?`,
		[product_id],
		(err, product) => {
			if (err) {
				return res.status(500).json({ error: err.message });
			}
			if (!product) {
				return res.status(404).json({ error: "Product not found" });
			}
			if (product.stock < quantity) {
				return res.status(400).json({ error: "Insufficient stock" });
			}

			const total_price = product.price * quantity;

			// Insert sale record
			db.run(
				`INSERT INTO sales (product_id, quantity, total_price) VALUES (?, ?, ?)`,
				[product_id, quantity, total_price],
				function (err) {
					if (err) {
						return res.status(500).json({ error: err.message });
					}

					// Update stock
					db.run(`UPDATE products SET stock = stock - ? WHERE id = ?`, [
						quantity,
						product_id,
					]);
					res.json({ id: this.lastID, product_id, quantity, total_price });
				}
			);
		}
	);
});

// Get all sales
router.get("/list", (req, res) => {
	db.all(
		`SELECT sales.id, products.name, sales.quantity, sales.total_price, sales.date FROM sales 
            JOIN products ON sales.product_id = products.id`,
		[],
		(err, rows) => {
			if (err) {
				return res.status(500).json({ error: err.message });
			}
			res.json(rows);
		}
	);
});

// Get sales by date
router.get("/by-date/:date", (req, res) => {
	const { date } = req.params;
	db.all(
		`SELECT sales.id, products.name, sales.quantity, sales.total_price, sales.date FROM sales 
            JOIN products ON sales.product_id = products.id 
            WHERE DATE(sales.date) = ?`,
		[date],
		(err, rows) => {
			if (err) {
				return res.status(500).json({ error: err.message });
			}
			res.json(rows);
		}
	);
});

module.exports = router;
