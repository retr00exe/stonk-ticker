import React from 'react';
import Stock from '@components/home/Stock';
import { comparisonData } from '@core/data/comparison';

const Main = () => {
	return (
		<div className="my-10">
			<h1 className="text-2xl font-semibold mb-4">NYSE Market</h1>
			<div>
				{comparisonData.map((item) => (
					<div key={item.id} className="mb-2">
						<Stock ticker={item.id} />
					</div>
				))}
			</div>
		</div>
	);
};

export default Main;
