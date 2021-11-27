import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { useParams } from 'react-router';
import moment from 'moment';
import { sliceId } from '@core/utils/string';

const proxyUrl = process.env.REACT_APP_CORS_PROXY_URL;
const stonksUrl = process.env.REACT_APP_REDACTED_REST_ENDPOINT;

const getStonks = async (ticker: string, selectedTimeRange: string) => {
	const response = await fetch(
		`${proxyUrl}${stonksUrl}/v8/finance/chart/${ticker}?range=${selectedTimeRange}&interval=1d`
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
	const [selectedTimeRange, setSelectedTimeRange] = useState<string>('1mo');

	useEffect(() => {
		async function getLatestPrice() {
			try {
				const data = await getStonks(id, selectedTimeRange);
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
	}, [selectedTimeRange]);

	return (
		<div className="-sm:text-sm">
			<div className="text-3xl font-semibold">{sliceId(id)}</div>
			<div className="text-lg font-semibold mb-2">
				{market !== 'IDX' ? '$' : 'Rp.'}
				{price}
			</div>
			<div className="mb-10">
				Last update today at {priceTime && priceTime.toLocaleTimeString()}
			</div>
			<Chart type="area" options={chart.options} series={series} width="100%" height={400} />
			<div className="flex-bc mb-3 -sm:col">
				<h3 className="text-2xl font-bold">Share Price Chart</h3>
				<div className="flex overflow-x-auto p-2 bg-gray scroll-bar-hidden">
					<button
						onClick={() => setSelectedTimeRange('5d')}
						className={`flex-shrink-0 transition-colors w-max font-bold py-2 px-3 text-sm ${
							selectedTimeRange === '5d' ? 'bg-white text-blue' : 'text-gray-500'
						} `}
					>
						Week
					</button>
					<button
						onClick={() => setSelectedTimeRange('1mo')}
						className={`flex-shrink-0 transition-colors w-max font-bold py-2 px-3 text-sm ${
							selectedTimeRange === '1mo' ? 'bg-white text-blue' : 'text-gray-500'
						} `}
					>
						Month
					</button>
					<button
						onClick={() => setSelectedTimeRange('1y')}
						className={`flex-shrink-0 transition-colors w-max font-bold py-2 px-3 text-sm ${
							selectedTimeRange === '1y' ? 'bg-white text-blue' : 'text-gray-500'
						} `}
					>
						Year
					</button>
					<button
						onClick={() => setSelectedTimeRange('max')}
						className={`flex-shrink-0 transition-colors w-max font-bold py-2 px-3 text-sm ${
							selectedTimeRange === 'max' ? 'bg-white text-blue' : 'text-gray-500'
						} `}
					>
						Max
					</button>
				</div>
			</div>
		</div>
	);
};

export default ChartData;
