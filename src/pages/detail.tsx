import React from 'react';
import Header from '@components/detail/Header';
import Chart from '@components/detail/Chart';
import About from '@components/detail/About';

const Detail = (): JSX.Element => {
	return (
		<section className="w-full max-w-6xl mx-auto">
			<div className="container">
				<Header />
				<Chart />
				<About />
			</div>
		</section>
	);
};

export default Detail;
