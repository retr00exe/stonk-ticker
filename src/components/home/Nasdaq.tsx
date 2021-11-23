import React from 'react';
import StockRealtime from '@components/home/Stock.main';
import StockStatic from '@components/home/Stock.closed';
import { nasdaqData } from '@core/data/nasdaq';
import { isWeekend, isMarketOpen } from '@core/utils/date';

const Nasdaq = () => {
	const today = new Date();
	const market = 'Nasdaq';
	const isOpen = !isWeekend(today) && isMarketOpen(today, market);

	return (
		<div className="my-10">
			<h1 className="text-2xl font-semibold mb-6">
				Nasdaq Market{' '}
				<span className="text-sm text-red-500">{!isOpen && '(Market is closed right now)'}</span>
			</h1>
			<table className="w-full text-left border border-gray-100">
				<thead className="w-full border-b border-gray-100">
					<tr>
						<th className="py-5 px-8">Name</th>
						<th className="py-5">Price</th>
						<th className="py-5">Day Change</th>
						<th className="py-5">Day Volume</th>
					</tr>
				</thead>
				<tbody className="w-full">
					{nasdaqData.map((item, index) =>
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
								market="Nasdaq"
							/>
						) : (
							<StockStatic
								ticker={item.id}
								name={item.name}
								logo={item.logo}
								order={index + 1}
								key={item.id}
								market="Nasdaq"
							/>
						)
					)}
				</tbody>
			</table>
		</div>
	);
};

export default Nasdaq;
