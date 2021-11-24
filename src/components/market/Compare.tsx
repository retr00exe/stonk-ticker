import React from 'react';
import Stock from '@components/market/Stock.main';
import { comparisonData } from '@core/data/comparison';

const Compare = () => {
	return (
		<div className="my-10">
			<h1 className="text-2xl font-semibold mb-6">Compare (Crypto, Gold, Silver, etc. )</h1>
			<table className="w-full text-left border border-gray-100">
				<thead className="w-full border-b border-gray-100">
					<tr>
						<th className="py-5 px-8 -sm:text-xs">Name</th>
						<th className="py-5 -sm:text-xs">Price</th>
						<th className="py-5 -sm:text-xs">Change</th>
					</tr>
				</thead>
				<tbody className="w-full">
					{comparisonData.map((item, index) => (
						<Stock
							ticker={item.id}
							name={item.name}
							logo={item.logo}
							order={index + 1}
							key={item.id}
						/>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Compare;
