import React from 'react';
import Stock from '@components/home/Stock';
import { idxData } from '@core/data/idx';

const Main = () => {
	return (
		<div className="my-10">
			<h1 className="text-2xl font-semibold mb-4">IDX Market</h1>
			<div>
				{idxData.map((item) => (
					<div key={item.id} className="mb-2">
						<Stock ticker={item.id} name={item.name} logo={item.logo} market="idx" />
					</div>
				))}
			</div>
		</div>
	);
};

export default Main;
