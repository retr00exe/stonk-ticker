import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
// import lottie from 'lottie-web';

const Footer = (): JSX.Element => {
	// const container = useRef(null);

	// useEffect(() => {
	// 	lottie.loadAnimation({
	// 		container: container.current,
	// 		renderer: 'svg',
	// 		loop: true,
	// 		autoplay: true,
	// 		animationData: require('../core/data/mobile.lottie.json'),
	// 	});
	// }, []);

	return (
		<div className="w-full border-t border-gray-200">
			<div className="xl:px-40 pb-12 lg:px-20 md:px-10 sm:px-5 px-10">
				<div className="w-full pt-12 flex flex-col sm:flex-row space-y-2 justify-start">
					<div className="w-full sm:w-2/5 pr-6 flex flex-col space-y-4">
						<img src="/icons/logo.webp" alt="logo" className="w-56 h-56 object-cover mr-2 logo" />
						{/* <div className="w-56 h-56" ref={container}></div> */}
						<p className="opacity-60">Real-time market ticker, baby!</p>
					</div>
					<div className="w-full sm:w-1/5 flex flex-col space-y-4">
						<Link to="/about" className="opacity-60">
							About Us
						</Link>
						<Link to="/" className="opacity-60">
							Responsibilities
						</Link>
						<Link to="/" className="opacity-60">
							Out Services
						</Link>
						<Link to="/contact" className="opacity-60">
							Contact
						</Link>
					</div>
					<div className="w-full sm:w-1/5 flex flex-col space-y-4">
						<Link to="/" className="opacity-60">
							Disclaimer
						</Link>
						<Link to="/" className="opacity-60">
							Testimonials
						</Link>
						<Link to="/" className="opacity-60">
							Privacy Policy
						</Link>
						<Link to="/" className="opacity-60">
							Terms of Service
						</Link>
					</div>
					<div className="w-full sm:w-1/5 pt-6 flex items-end mb-1">
						<div className="flex flex-row space-x-4">
							<i className="fab fa-facebook-f"></i>
							<i className="fab fa-twitter"></i>
							<i className="fab fa-instagram"></i>
							<i className="fab fa-google"></i>
						</div>
					</div>
				</div>
				<div className="opacity-60 pt-2">
					<p>© 2021 Stonk Ticker</p>
				</div>
			</div>
			<style jsx>{`
				.logo {
				}
			`}</style>
		</div>
	);
};

export default Footer;
