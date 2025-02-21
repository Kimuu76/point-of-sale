/** @format */

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Sales from "./pages/Sales";
import Products from "./pages/Products";
import Reports from "./pages/Reports";

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/*' element={<Dashboard />} />
				<Route path='/sales' element={<Sales />} />
				<Route path='/products' element={<Products />} />
				<Route path='/reports' element={<Reports />} />
			</Routes>
		</Router>
	);
}

export default App;
