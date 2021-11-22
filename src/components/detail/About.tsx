import React from 'react';
import { useParams } from 'react-router';

const About = () => {
	const { id } = useParams();
	return <div className="my-10">About {id}</div>;
};

export default About;
