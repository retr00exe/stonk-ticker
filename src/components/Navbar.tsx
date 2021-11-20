import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = (): JSX.Element => {
	return (
		<section className="border-b border-gray-100">
			<div className="max-w-6xl mx-auto px-4">
				<div className="flex justify-between">
					<div className="flex space-x-4">
						<div>
							<Link
								to="/"
								className="flex items-center py-4 px-2 text-gray-700 hover:text-gray-900"
							>
								<img src="./icons/logo.webp" alt="logo" className="w-12 h-12 object-cover mr-2" />
								<span className="font-bold">Stonk Ticker</span>
							</Link>
						</div>
						<div className="hidden md:flex items-center space-x-1">
							<Link to="/feature" className="py-5 px-3 text-gray-700 hover:text-gray-900">
								Features
							</Link>
							<Link to="/about" className="py-5 px-3 text-gray-700 hover:text-gray-900">
								About
							</Link>
						</div>
					</div>
					<div className="hidden md:flex items-center space-x-1">
						<Link to="/login" className="py-5 px-3">
							Login
						</Link>
						<Link
							to="/signup"
							className="py-2 px-3 bg-green hover:bg-yellow-300 text-white hover:text-yellow-800 rounded-full transition duration-300"
						>
							Signup
						</Link>
					</div>
					<div className="md:hidden flex items-center">
						<button className="mobile-menu-button">
							<svg
								className="w-6 h-6"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M4 6h16M4 12h16M4 18h16"
								/>
							</svg>
						</button>
					</div>
				</div>
			</div>
			<div className="mobile-menu hidden md:hidden">
				<Link to="/feature" className="block py-2 px-4 text-sm hover:bg-gray-200">
					Features
				</Link>
				<Link to="/about" className="block py-2 px-4 text-sm hover:bg-gray-200">
					About
				</Link>
			</div>
		</section>
	);
};

export default Navbar;
