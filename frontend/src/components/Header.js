/** @format */

// Header.js
/** @format */

import React from "react";

const Header = () => {
	return (
		<header className='bg-white shadow-md p-4 sticky top-0 w-full flex justify-between items-center z-10'>
			<h1 className='text-2xl font-bold'>Dashboard</h1>
			<span className='text-gray-500'>Welcome Back, User</span>
		</header>
	);
};

export default Header;
