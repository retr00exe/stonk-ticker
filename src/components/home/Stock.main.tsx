import React, { useState, useEffect } from 'react';
import protobuf from 'protobufjs';
import { isWeekend } from '@core/utils/date';

const { Buffer } = require('buffer/');

/**
 * @name Stock.main.tsx
 * @return Fetch data using WebSocket API
 *
 */

interface MessageBuffer extends protobuf.Message {
	id?: string;
	price?: string;
}

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
	const [stonks, setStonks] = useState<any[]>([]);
	const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);
	const [isWebsocketConnected, setIsWebsocketConnected] = useState<boolean>(false);
	const [isDisconnected, setIsDisconnected] = useState<boolean>(false);
	const [isRedirect, setIsRedirect] = useState<boolean>(false);

	const emojis = {
		'': '',
		up: '🚀',
		down: '💩',
	};

	const formatPrice = (price: number) => {
		return market === 'IDX' ? `Rp. ${price.toFixed(2)}` : `$${price.toFixed(2)}`;
	};

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const ws = new WebSocket(process.env.REACT_APP_REDACTED_WEBSOCKET_ENDPOINT);

		/**
		 * Load gRPC protobuf file on public folder
		 */
		protobuf.load('./YPricingData.proto', async (error, root) => {
			if (error) {
				return console.log(error);
			}
			const Yaticker = root.lookupType('yaticker');

			ws.onopen = function open() {
				console.log(`${ticker} connected`);
				setIsWebsocketConnected(true);

				/**
				 * Stock market close weekends! Fetching data to REST API endpoint instead of listening to WebSocket API
				 */
				if (
					isWeekend(new Date()) &&
					(market === 'IDX' || market === 'Nasdaq' || market === 'NYSE')
				) {
					setIsDisconnected(true);
					ws.close();
					setIsRedirect(true);
				} else {
					/**
					 * Subscribe to ticker
					 */
					ws.send(
						JSON.stringify({
							subscribe: (params.get('symbols') || ticker)
								.split(',')
								.map((symbol) => symbol.toUpperCase()),
						})
					);
				}
			};

			ws.onclose = function close() {
				console.log(`${ticker} disconnected`);
				setIsDisconnected(true);
			};

			ws.onmessage = function incoming(message) {
				/**
				 * Decode gRPC buffer response
				 */
				const next: MessageBuffer = Yaticker.decode(new Buffer(message.data, 'base64'));
				console.log(next);
				setStonks((current) => {
					let stonk = current.find((stonk) => stonk.id === next.id);
					if (stonk) {
						return current.map((stonk) => {
							if (stonk.id === next.id) {
								return {
									...next,
									direction:
										stonk.price < next.price
											? 'up'
											: stonk.price > next.price
											? 'down'
											: stonk.direction,
								};
							}
							return stonk;
						});
					} else {
						return [
							...current,
							{
								...next,
								direction: '',
							},
						];
					}
				});
				setIsDataLoaded(true);
			};
		});
		return () => {
			ws.close();
		};
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
				) : isRedirect ? (
					<p className="text-sm text-gray-300">Redirecting to REST API server...</p>
				) : isDisconnected ? (
					<p className="text-sm text-gray-300">Disconnected from WebSocket server!</p>
				) : isWebsocketConnected ? (
					<p className="text-sm text-gray-300">Connected! Waiting for ticker response...</p>
				) : (
					<p className="text-sm text-gray-300">Connecting to WebSocket API...</p>
				)}
			</td>
		</tr>
	);
};

export default Stock;
