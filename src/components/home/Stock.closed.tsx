import React, { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * @name Stock.main.tsx
 * @return Fetch data using WebSocket API
 *
 */

type MarketType = 'IDX' | 'Nasdaq' | 'NYSE' | 'Compare';

interface Props {
	ticker: string;
	name: string;
	logo: string;
	order?: number;
	market?: MarketType;
}

/**
 * "Mau recode ngaca dulu bosss 😁🤙"
 * ~bocil termux
 *
 */

const Stock = ({ ticker, name, logo, market }: Props): JSX.Element => {
	const [stonks, setStonks] = useState([]);
	const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);

	const emojis = {
		'': '',
		up: '🚀',
		down: '💩',
	};

	const formatPrice = (price: number) => {
		return market === 'IDX' ? `Rp.${price.toFixed(2)}` : `$${price.toFixed(2)}`;
	};

	useEffect(() => {
		const getStockData = async () => {
			await axios
				.get(`${process.env.REACT_APP_REDACTED_REST_ENDPOINT}/v8/finance/chart/${ticker}`, {
					params: {
						range: '1d',
						interval: '1d',
						lang: 'en',
					},
					headers: {
						'X-API-KEY': process.env.REACT_APP_REST_API_KEY,
					},
				})
				.then((res) => {
					const stockResult = res.data.chart.result[0];
					const price = stockResult.meta.regularMarketPrice;
					const fromcurrency = stockResult.meta.symbol.replace('.JK', '');

					setStonks((current) => {
						return [
							...current,
							{
								price,
								fromcurrency,
								direction: 'up',
							},
						];
					});
					setIsDataLoaded(true);
				})
				.catch((err) => {
					console.log(err);
				});
		};
		getStockData();
	}, []);

	return (
		<tr className="text-xl border-b border-gray-100 cursor-pointer hover:bg-gray-50 transform transition duration-200 ease-in-out">
			<td className="flex-sc py-3 px-5 w-2/3">
				<img
					src={logo}
					alt={name}
					className={`${market === 'IDX' ? 'w-12 h-12 mr-2 scale-75' : 'w-12 h-12 mr-2 scale-75'}`}
				/>
				<h1 className="font-semibold mr-2">{name}</h1>
			</td>
			<td className="w-1/3">
				{isDataLoaded ? (
					<div className={`${stonks[0].direction} flex gap-2`}>
						<h2>{stonks[0].fromcurrency}</h2>
						<p>
							{formatPrice(stonks[0].price)} {emojis[stonks[0].direction]}
						</p>
					</div>
				) : (
					<p className="text-sm text-gray-300">Fetching data to REST API...</p>
				)}
			</td>
		</tr>
	);
};

export default Stock;
