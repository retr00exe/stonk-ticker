import React from 'react';
import { useParams } from 'react-router';

const Chart = () => {
	const { id } = useParams();
	return <div>Chart {id}</div>;
};

export default Chart;
