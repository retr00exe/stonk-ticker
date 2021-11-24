import React from 'react';
import { Link } from 'react-router-dom';

const Index = (): JSX.Element => {
	return (
		<section className="w-full max-w-6xl mx-auto">
			<div className="container">
				<h1 className="font-medium">Hi, Welcome! 😆</h1>
				<p>Select the available market</p>
				<div className="grid grid-cols-2 -sm:grid-cols-1 gap-10 my-8">
					<Link to="/Nasdaq" className="w-full h-full">
						<div className="bg-gray-100 rounded-xl cursor-pointer h-32 w-full flex-cc">
							<img src="/nasdaq.png" alt="nasdaq" className="object-cover scale-50" />
						</div>
					</Link>
					<Link to="/Nasdaq" className="w-full h-full">
						<div className="bg-gray-100 rounded-xl cursor-pointer h-32 w-full flex-cc">
							<img src="/idx.png" alt="nasdaq" className="object-cover max-h-24" />
						</div>
					</Link>
					<Link to="/Nasdaq" className="w-full h-full">
						<div className="bg-gray-100 rounded-xl cursor-pointer h-32 w-full flex-cc">
							{' '}
							<img src="/eth.png" alt="nasdaq" className="object-cover max-h-24" />
						</div>
					</Link>
				</div>
			</div>
		</section>
	);
};

export default Index;
