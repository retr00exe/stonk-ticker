import React, { useState, useEffect } from 'react';
import protobuf from 'protobufjs';

const { Buffer } = require('buffer/');
interface MessageBuffer extends protobuf.Message {
	id?: string;
	price?: string;
}

interface Props {
	ticker: string;
	name?: string;
	logo?: string;
}

const Stock = ({ ticker }: Props): JSX.Element => {
	const [stonks, setStonks] = useState([]);

	const emojis = {
		'': '',
		up: '🚀',
		down: '💩',
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
			};
		});
	}, [ticker]);

	return (
		<div className="">
			{stonks.map((stonk) => (
				<div className="text-xl" key={stonk.id}>
					<h2 className={stonk.direction}>
						{stonk.fromcurrency} {formatPrice(stonk.price)} {emojis[stonk.direction]}
					</h2>
				</div>
			))}
		</div>
	);
};

export default Stock;
