import React, { useState, useEffect } from 'react';
import protobuf from 'protobufjs';

const { Buffer } = require('buffer/');
interface MessageBuffer extends protobuf.Message {
	id?: string;
	price?: string;
}

interface Props {
	ticker: string;
	name: string;
	logo: string;
}

/**
 * "Mau recode ijin dulu bosss jgn asal comot 😁🤙"
 * -quote by bocil termux
 *
 */

const Stock = ({ ticker, name, logo }: Props): JSX.Element => {
	const [stonks, setStonks] = useState([]);
	const [isLoaded, setIsLoaded] = useState(false);

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
				setIsLoaded(true);
			};
		});
		return () => {
			ws.close();
		};
	}, [ticker]);

	return (
		<>
			<div className="text-xl flex-sc gap-2">
				<img src={logo} alt={name} className="w-12 h-12 mr-2 scale-75" />
				<h1 className="font-semibold mr-2">{name}</h1>
				{isLoaded ? (
					<div className={`${stonks[0].direction} flex gap-2`}>
						<h2>{stonks[0].fromcurrency}</h2>
						<p>
							{formatPrice(stonks[0].price)} {emojis[stonks[0].direction]}
						</p>
					</div>
				) : (
					<p className="text-sm text-gray-300">Connecting to API, please wait 👻</p>
				)}
			</div>
		</>
	);
};

export default Stock;
