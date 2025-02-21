/** @format */

import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Sales from "../pages/Sales";
import Products from "../pages/Products";
import Reports from "../pages/Reports";

const DashboardLayout = ({ children }) => {
	return (
		<div className='flex h-screen bg-gray-100'>
			{/* Sidebar */}
			<Sidebar />

			{/* Main Content */}
			<div className='flex flex-col w-full ml-[20%]'>
				<Header />
				<main className='p-6'>{children}</main>
			</div>
		</div>
	);
};

const Dashboard = () => {
	return (
		<DashboardLayout>
			<Routes>
				<Route path='/sales' element={<Sales />} />
				<Route path='/products' element={<Products />} />
				<Route path='/reports' element={<Reports />} />
			</Routes>
		</DashboardLayout>
	);
};

export default Dashboard;
