import React, { useState, useEffect } from 'react';
import protobuf from 'protobufjs';

const { Buffer } = require('buffer/');
interface MessageBuffer extends protobuf.Message {
	id?: string;
	price?: string;
	direction?: string;
}

interface Response {
	id: string;
	price: string;
	direction: string;
}

interface Props {
	ticker: string;
}

const Stock = ({ ticker }: Props): JSX.Element => {
	const [stonk, setStonks] = useState<Response | null>(null);

	const emojis = {
		'': '',
		up: '🚀',
		down: '💩',
	};

	const formatPrice = (price) => {
		return `$${price.toFixed(2)}`;
	};

	useEffect(() => {
		const ws = new WebSocket('wss://streamer.finance.yahoo.com');
		protobuf.load('./YPricingData.proto', (error, root) => {
			if (error) {
				return console.log(error);
			}
			const Yaticker = root.lookupType('yaticker');

			ws.onopen = function open() {
				console.log('connected');
				ws.send(
					JSON.stringify({
						subscribe: ticker.toUpperCase(),
					})
				);
			};

			ws.onclose = function close() {
				console.log('disconnected');
			};

			ws.onmessage = function incoming(message) {
				const { id, price }: MessageBuffer = Yaticker.decode(new Buffer(message.data, 'base64'));
				console.log(id);
				console.log(price);
				setStonks((stonk) => {
					if (stonk) {
						return {
							id,
							price,
							direction:
								stonk.price < price ? 'up' : stonk.price > price ? 'down' : stonk.direction,
						};
					} else {
						return {
							id,
							price,
							direction: '',
						};
					}
				});
			};
		});
	}, [ticker]);

	return (
		<div className="stonks">
			{/* <div className="stonk" key={stonk.id}>
				<h2 className={stonk.direction}>
					{stonk.id} {formatPrice(stonk.price)} {emojis[stonk.direction]}
				</h2>
			</div> */}
			Hello
		</div>
	);
};

export default Stock;
