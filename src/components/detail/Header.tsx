import React from 'react';
import { useParams } from 'react-router';
import { AiOutlineStar } from 'react-icons/ai';
import { sliceId } from '@core/utils/string';
import { idxData } from '@core/data/idx';
import { nasdaqData } from '@core/data/nasdaq';
import { comparisonData } from '@core/data/comparison';

const Header = () => {
	const { id, market } = useParams();

	const rawData = market === 'IDX' ? idxData : market === 'Nasdaq' ? nasdaqData : comparisonData;
	const filterData = rawData.filter((stock) => id === stock.id)[0];
	const data =
		market === 'IDX'
			? { ...filterData, market: 'Indonesia Stock Exchange (IDX)' }
			: { ...filterData, market: 'Nasdaq Stock Exchange (Nasdaq)' };

	return (
		<div className="my-10 flex-bs">
			<div className="flex-cs col">
				<h1 className="text-4xl font-semibold">
					{data.name} <span className="text-sm text-gray-600">({sliceId(id)})</span>
				</h1>
				<p className="mt-2 text-gray-400 font-light text-lg">{data.market}</p>
				<div className="flex-sc gap-4 mt-5">
					<img src={data.logo} alt="BBCA" className="w-32 h-32" />
				</div>
			</div>
			<div className="flex-cc gap-2 border py-2 px-4 rounded-full font-semibold border-gray-500 cursor-pointer hover:border-darkBlue text-gray-500 hover:text-darkBlue transition duration-400">
				<span>Add to Watchlist</span>
				<AiOutlineStar size={18} />
			</div>
		</div>
	);
};

export default Header;
