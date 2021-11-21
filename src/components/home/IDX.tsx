import React from 'react';
import StockRealtime from '@components/home/Stock.main';
import StockStatic from '@components/home/Stock.closed';
import { idxData } from '@core/data/idx';
import { isWeekend } from '@core/utils/date';

const IDX = () => {
	return (
		<div className="my-10">
			<h1 className="text-2xl font-semibold mb-6">IDX Market</h1>
			<table className="w-full text-left border border-gray-100 rounded-xl">
				<thead className="w-full border-b border-gray-100">
					<tr>
						<th className="py-5 px-8">Name</th>
						<th className="py-5">Price</th>
					</tr>
				</thead>
				<tbody className="w-full">
					{idxData.map((item, index) =>
						/**
						 * Stock market close weekends! Fetching data to REST API endpoint instead of listening to WebSocket API
						 */
						!isWeekend(new Date()) ? (
							<StockRealtime
								ticker={item.id}
								name={item.name}
								logo={item.logo}
								order={index + 1}
								key={item.id}
								market="IDX"
							/>
						) : (
							<StockStatic
								ticker={item.id}
								name={item.name}
								logo={item.logo}
								order={index + 1}
								key={item.id}
								market="IDX"
							/>
						)
					)}
				</tbody>
			</table>
		</div>
	);
};

export default IDX;
