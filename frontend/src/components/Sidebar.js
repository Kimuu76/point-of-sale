/** @format */

// Sidebar.js
/** @format */

import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
	return (
		<nav className='w-1/5 bg-white text-gray-800 h-full p-6 fixed top-0 left-0 shadow-lg flex flex-col'>
			<h2 className='text-2xl font-bold mb-6'>My Restaurant</h2>
			<ul className='space-y-4'>
				<li>
					<Link to='/' className='text-gray-700 hover:text-blue-500'>
						Dashboard
					</Link>
				</li>
				<li>
					<Link to='/sales' className='text-gray-700 hover:text-blue-500'>
						Sales
					</Link>
				</li>
				<li>
					<Link to='/products' className='text-gray-700 hover:text-blue-500'>
						Stock
					</Link>
				</li>
				<li>
					<Link to='/reports' className='text-gray-700 hover:text-blue-500'>
						Reports
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Sidebar;
