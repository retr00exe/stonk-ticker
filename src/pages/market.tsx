import React from 'react';
import IDX from '@components/market/IDX';
import Nasdaq from '@components/market/Nasdaq';
import Compare from '@components/market/Compare';

interface Props {
	market: string;
}

const Index = ({ market }: Props): JSX.Element => {
	return (
		<section className="w-full max-w-6xl mx-auto">
			<div className="container">
				{market === 'IDX' ? <IDX /> : market === 'Nasdaq' ? <Nasdaq /> : <Compare />}
			</div>
		</section>
	);
};

export default Index;
