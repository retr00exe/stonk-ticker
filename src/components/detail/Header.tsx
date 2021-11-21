import React from 'react';
import { useParams } from 'react-router';
import { AiOutlineStar } from 'react-icons/ai';

const Header = () => {
	const { id } = useParams();
	return (
		<div className="my-10 flex-bs">
			<div className="flex-cs col">
				<h1 className="text-4xl font-semibold">
					BBCA Price <span className="text-sm text-gray-600">(IDR)</span>
				</h1>
				<p className="mt-2 text-gray-400 font-light text-lg">Indonesia Stock Exchange (IDX)</p>
				<div className="flex-sc gap-4">
					<img src="./icons/bbca.png" alt="BBCA" className="w-20 h-20" />
					<p className="text-2xl font-medium">PT Bank Central Asia Tbk</p>
				</div>
			</div>
			<div className="flex-cc gap-2 border py-2 px-4 rounded-full bg-blue cursor-pointer hover:bg-darkBlue text-white transition duration-400">
				<span>Add to Watchlist</span>
				<AiOutlineStar size={18} />
			</div>
		</div>
	);
};

export default Header;
