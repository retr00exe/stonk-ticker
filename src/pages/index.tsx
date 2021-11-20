import React from 'react';
import IDX from '@components/home/IDX';
import NYSE from '@components/home/NYSE';
import Nasdaq from '@components/home/Nasdaq';
import Compare from '@components/home/Compare';

const Index = (): JSX.Element => {
	return (
		<section className="w-full">
			<div className="container">
				<IDX />
				<NYSE />
				<Nasdaq />
				<Compare />
			</div>
		</section>
	);
};

export default Index;
