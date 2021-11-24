import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Header = () => {
	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const getProfile = async () => {
			await axios
				.get('https://api.github.com/users/retr00exe')
				.then((res) => {
					setData(res.data);
					setIsLoading(false);
				})
				.catch((err) => console.log(err));
		};
		getProfile();
	}, []);

	return (
		<>
			{!isLoading && (
				<div className="flex-cc col">
					<img src={data.avatar_url} alt="pic" className="rounded-full h-32 w-32" />
					<h1 className="text-xl font-semibold mt-5">Erandri Mekel Ilyasa</h1>
					<p className="text-lg">21120119130108</p>{' '}
					<p className="text-lg text-gray-400">@{data.login}</p>{' '}
					<p className="text-lg font-semibold max-w-sm text-center">I code for fun ehehe</p>
					<p className="text-lg">
						<a href={data.html_url} rel="noreferrer" target="_blank">
							{data.html_url.replace(/^https?:\/\//, '')}
						</a>
					</p>{' '}
				</div>
			)}
		</>
	);
};

export default Header;
