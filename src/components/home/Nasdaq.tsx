import React from 'react';
import Stock from '@components/home/Stock';
import { comparisonData } from '@core/data/comparison';

const Main = () => {
	return (
		<div className="my-10">
			<h1 className="text-2xl font-semibold mb-4">Nasdaq Market</h1>
			<div>
				{comparisonData.map((item) => (
					<div key={item.id} className="mb-2">
						<Stock ticker={item.id} name={item.name} logo={item.logo} />
					</div>
				))}
			</div>
		</div>
	);
};

export default Main;
