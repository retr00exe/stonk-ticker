import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { useParams } from 'react-router';
import moment from 'moment';
import { sliceId } from '@core/utils/string';

const proxyUrl = process.env.REACT_APP_CORS_PROXY_URL;
const stonksUrl = process.env.REACT_APP_REDACTED_REST_ENDPOINT;

const getStonks = async (ticker: string) => {
	const response = await fetch(
		`${proxyUrl}${stonksUrl}/v8/finance/chart/${ticker}?range=1y&interval=1d`
	);
	return response.json();
};

const chart = {
	options: {
		chart: {
			height: 350,
		},
		tooltip: {
			enabled: true,
		},
		dataLabels: {
			enabled: false,
		},
		xaxis: {
			tickAmount: 4,
			labels: {
				rotate: -45,
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
			type: 'area',
			name: 'price',
			data: [],
		},
	]);

	const { id, market } = useParams();

	const [price, setPrice] = useState(null);
	const [priceTime, setPriceTime] = useState(null);

	useEffect(() => {
		async function getLatestPrice() {
			try {
				const data = await getStonks(id);
				console.log(data);
				const gme = data.chart.result[0];
				setPrice(gme.meta.regularMarketPrice.toFixed(2));
				setPriceTime(new Date(gme.meta.regularMarketTime * 1000));
				const quote = gme.indicators.quote[0];
				const prices = gme.timestamp.map((timestamp, index) => ({
					x: moment(new Date(timestamp * 1000)).format('MM/DD/YYYY'),
					y: [quote.open[index], quote.high[index], quote.low[index], quote.close[index]].map(
						round
					),
				}));
				setSeries([
					{
						type: 'area',
						name: 'price',
						data: prices,
					},
				]);
			} catch (error) {
				console.log(error);
			}
		}
		getLatestPrice();

		return () => {};
	}, []);

	return (
		<div>
			<div className="text-3xl font-semibold">{sliceId(id)}</div>
			<div className="text-lg font-semibold mb-2">
				{market !== 'IDX' ? '$' : 'Rp.'}
				{price}
			</div>
			<div className="price-time">Last update {priceTime && priceTime.toLocaleTimeString()}</div>
			<Chart type="area" options={chart.options} series={series} width="100%" height={400} />
		</div>
	);
};

export default ChartData;
