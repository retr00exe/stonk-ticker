import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { sliceId } from '@core/utils/string';

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

const Stock = ({ ticker, name, logo, market }: Props): JSX.Element => {
	const [stonks, setStonks] = useState([]);
	const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);
	const [isFailed, setIsFailed] = useState<boolean>(false);

	const emojis = {
		'': '',
		up: '🚀',
		down: '💩',
	};

	const formatPrice = (price: number) => {
		return market === 'IDX' ? `Rp.${price.toFixed(2)}` : `$${price.toFixed(2)}`;
	};

	/**
	 * Set up CORS reverse proxy server to prevent CORS same origin policy
	 */
	const proxyUrl = process.env.REACT_APP_CORS_PROXY_URL;
	const stonksUrl = process.env.REACT_APP_REDACTED_REST_ENDPOINT;

	useEffect(() => {
		const getStockData = async () => {
			await axios
				.get(`${proxyUrl}${stonksUrl}/v8/finance/chart/${ticker}`, {
					params: {
						range: '1d',
						interval: '1d',
						lang: 'en',
					},
				})
				.then((res) => {
					const stockResult = res.data.chart.result[0];
					const price = stockResult.meta.regularMarketPrice;
					const fromcurrency = sliceId(stockResult.meta.symbol);

					setStonks((current) => {
						return [
							...current,
							{
								price,
								fromcurrency,
								direction: '',
							},
						];
					});
					setIsDataLoaded(true);
				})
				.catch((err) => {
					console.log(err);
					setIsFailed(true);
				});
		};
		getStockData();
	}, []);

	return (
		<tr className="text-xl border-b border-gray-100 hover:bg-gray-50 transform transition duration-200 ease-in-out cursor-pointer">
			<Link to={`/${market}/${ticker}`}>
				<td className="flex-sc py-3 px-5 w-full">
					<img
						src={logo}
						alt={name}
						className={`${
							market === 'IDX'
								? 'w-12 h-12 mr-2 scale-75 -sm:w-10 -sm:h-10'
								: 'w-12 h-12 mr-2 scale-75 -sm:w-8 -sm:h-8'
						}`}
					/>
					<div className="flex-cc -sm:col -sm:flex-ss">
						<h1 className="font-semibold mr-3 -sm:text-sm">{name}</h1>
						<h2 className="text-gray-400 font-light tracking-wider -sm:text-sm">
							({sliceId(ticker)})
						</h2>
					</div>
				</td>
			</Link>
			<td className="w-1/4">
				<Link to={`/${market}/${ticker}`}>
					{isDataLoaded ? (
						<div className={`${stonks[0].direction} flex gap-2`}>
							<p className="-sm:text-sm">
								{formatPrice(stonks[0].price)} {emojis[stonks[0].direction]}
							</p>
						</div>
					) : isFailed ? (
						<p className="text-sm text-gray-300 -sm:text-xs">Failed to fetch data.</p>
					) : (
						<p className="text-sm text-gray-300 -sm:text-xs">Fetching data to REST API...</p>
					)}
				</Link>
			</td>
		</tr>
	);
};

export default Stock;
