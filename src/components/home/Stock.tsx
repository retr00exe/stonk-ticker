import React, { useState, useEffect } from 'react';
import protobuf from 'protobufjs';

const { Buffer } = require('buffer/');
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

const Stock = ({ ticker, name, logo, order, market }: Props): JSX.Element => {
	const [stonks, setStonks] = useState([]);
	const [isDataLoaded, setIsDataLoaded] = useState(false);
	const [isWebsocketConnected, setIsWebsocketConnected] = useState(false);

	const emojis = {
		'': '',
		up: '',
		down: '',
	};

	const formatPrice = (price) => {
		return `$${price.toFixed(2)}`;
	};

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const ws = new WebSocket(process.env.REACT_APP_REDACTED_ENDPOINT);
		protobuf.load('./YPricingData.proto', (error, root) => {
			if (error) {
				return console.log(error);
			}
			const Yaticker = root.lookupType('yaticker');

			ws.onopen = function open() {
				console.log(`${ticker} connected`);
				setIsWebsocketConnected(true);
				/**
				 * Market close weekends! Redirect to REST API endpoint instead of WebSocket
				 */

				ws.send(
					JSON.stringify({
						subscribe: (params.get('symbols') || ticker)
							.split(',')
							.map((symbol) => symbol.toUpperCase()),
					})
				);
			};

			ws.onclose = function close() {
				console.log(`${ticker} disconnected`);
			};

			ws.onmessage = function incoming(message) {
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
	}, [ticker]);

	return (
		<tr className="text-xl border-b border-gray-100 cursor-pointer hover:bg-gray-50 transform transition duration-200 ease-in-out">
			<td className="flex-sc py-3 px-5">
				<img
					src={logo}
					alt={name}
					className={`${market === 'IDX' ? 'w-12 h-12 mr-2 scale-75' : 'w-12 h-12 mr-2 scale-75'}`}
				/>
				<h1 className="font-semibold mr-2">{name}</h1>
			</td>
			<td>
				{isDataLoaded ? (
					<div className={`${stonks[0].direction} flex gap-2`}>
						<h2>{stonks[0].fromcurrency}</h2>
						<p>
							{formatPrice(stonks[0].price)} {emojis[stonks[0].direction]}
						</p>
					</div>
				) : isWebsocketConnected ? (
					<p className="text-sm text-gray-300">Connected! Waiting for ticker response...</p>
				) : (
					<p className="text-sm text-gray-300">Connecting to API...</p>
				)}
			</td>
		</tr>
	);
};

export default Stock;
