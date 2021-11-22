import React, { useState, useEffect, useMemo } from 'react';
import Chart from 'react-apexcharts';
import { useParams } from 'react-router';

const proxyUrl = process.env.REACT_APP_CORS_PROXY_URL;
const stonksUrl = process.env.REACT_APP_REDACTED_REST_ENDPOINT;

const getStonks = async (ticker: string) => {
	const response = await fetch(`${proxyUrl}${stonksUrl}/v8/finance/chart/${ticker}`);
	return response.json();
};

const directionEmojis = {
	up: '🚀',
	down: '💩',
	'': '',
};

const chart = {
	options: {
		chart: {
			height: 350,
		},
		yaxis: {
			tooltip: {
				enabled: true,
			},
		},
	},
};

const round = (number) => {
	return number ? +number.toFixed(2) : null;
};

const ChartData = () => {
	const [series, setSeries] = useState([
		{
			data: [],
		},
	]);

	const { id, market } = useParams();

	const [price, setPrice] = useState(-1);
	const [prevPrice, setPrevPrice] = useState(-1);
	const [priceTime, setPriceTime] = useState(null);

	useEffect(() => {
		let timeoutId;
		async function getLatestPrice() {
			try {
				const data = await getStonks(id);
				console.log(data);
				const gme = data.chart.result[0];
				setPrevPrice(price);
				setPrice(gme.meta.regularMarketPrice.toFixed(2));
				setPriceTime(new Date(gme.meta.regularMarketTime * 1000));
				const quote = gme.indicators.quote[0];
				const prices = gme.timestamp.map((timestamp, index) => ({
					x: new Date(timestamp * 1000),
					y: [quote.open[index], quote.high[index], quote.low[index], quote.close[index]].map(
						round
					),
				}));
				setSeries([
					{
						data: prices,
					},
				]);
			} catch (error) {
				console.log(error);
			}
			timeoutId = setTimeout(getLatestPrice, 5000 * 2);
		}

		getLatestPrice();

		return () => {
			clearTimeout(timeoutId);
		};
	}, []);

	const direction = useMemo(
		() => (prevPrice < price ? 'up' : prevPrice > price ? 'down' : ''),
		[prevPrice, price]
	);

	return (
		<div>
			<div className="ticker">{id}</div>
			<div className={['price', direction].join(' ')}>
				${price} {directionEmojis[direction]}
			</div>
			<div className="price-time">{priceTime && priceTime.toLocaleTimeString()}</div>
			<Chart type="candlestick" options={chart.options} series={series} width="100%" height={320} />
		</div>
	);
};

export default ChartData;
