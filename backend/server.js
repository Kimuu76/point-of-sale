/** @format */

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./database");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

// Basic route
/*app.get("/", (req, res) => {
	res.json({ message: "POS System API is running" });
});*/

const productRoutes = require("./routes/products");
app.use("/products", productRoutes);

const salesRoutes = require("./routes/sales");
app.use("/sales", salesRoutes);

const reportsRoutes = require("./routes/reports");
app.use("/reports", reportsRoutes);

const receiptRoutes = require("./routes/receipt");
app.use("/receipt", receiptRoutes);

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
