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

	const formatPercentage = (price: number) => {
		return price.toFixed(2) + '%';
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
					const dayVolume = stockResult.indicators.quote[0].volume[0];

					setStonks((current) => {
						return [
							...current,
							{
								price,
								dayVolume,
								direction: '',
								changePercent: 0,
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
		<tr className="text-xl border-b border-gray-100 cursor-pointer hover:bg-gray-50 transform transition duration-200 ease-in-out">
			<Link to={`/${market}/${ticker}`}>
				<td className="flex-sc py-3 px-5 w-full">
					<img
						src={logo}
						alt={name}
						className={`${
							market === 'IDX'
								? 'w-12 h-12 mr-2 scale-75 -sm:w-6 -sm:h-6'
								: 'w-12 h-12 mr-2 scale-75 -sm:w-4 -sm:h-4'
						}`}
					/>
					<div className="flex-cc -sm:col -sm:flex-ss">
						<h1 className="font-semibold mr-3 -sm:text-xs">
							{name}
							<span className="text-gray-400 font-light tracking-wider -sm:text-xs ml-2 -sm:ml-1">
								({sliceId(ticker)})
							</span>
						</h1>
					</div>
				</td>
			</Link>
			<td className="w-1/5">
				<Link to={`/${market}/${ticker}`}>
					{isDataLoaded ? (
						<div className={`${stonks[0].direction} flex gap-2`}>
							<p className="-sm:text-xs">
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
			<td className="w-1/5">
				<Link to={`/${market}/${ticker}`}>
					{isDataLoaded && (
						<div className={`flex gap-2`}>
							<p className="-sm:text-xs">{formatPercentage(stonks[0].changePercent)}</p>
						</div>
					)}
				</Link>
			</td>
		</tr>
	);
};

export default Stock;
