import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
// import lottie from 'lottie-web';
// import { GrHomeRounded } from 'react-icons/gr';
import { BsFillPersonFill, BsCurrencyBitcoin } from 'react-icons/bs';
import { AiOutlineStock, AiOutlineHome } from 'react-icons/ai';
import { RiStockLine } from 'react-icons/ri';

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
		<>
			<div className="-sm:hidden">
				<div className="w-full border-t border-gray-200">
					<div className="xl:px-40 pb-12 lg:px-20 md:px-10 sm:px-5 px-10">
						<div className="w-full pt-12 flex flex-col sm:flex-row space-y-2 justify-start">
							<div className="w-full sm:w-2/5 pr-6 flex flex-col space-y-4">
								<img
									src="/icons/logo.webp"
									alt="logo"
									className="w-56 h-56 object-cover mr-2 logo"
								/>
								{/* <div className="w-56 h-56" ref={container}></div> */}
								<p className="opacity-60">Real-time market ticker, baby!</p>
							</div>
							<div className="w-full sm:w-1/5 flex flex-col space-y-4">
								<Link to="/about" className="opacity-60">
									About Us
								</Link>
								<Link to="/feature" className="opacity-60">
									Feature
								</Link>
							</div>
							<div className="w-full sm:w-1/5 flex flex-col space-y-4">
								<Link to="/Nasdaq" className="opacity-60">
									Nasdaq
								</Link>
								<Link to="/IDX" className="opacity-60">
									IDX
								</Link>
								<Link to="/Crypto" className="opacity-60">
									Crypto
								</Link>
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
			</div>
			<div className="sm:hidden">
				<div className="w-full drop-shadow-2xl bg-gray-50 fixed bottom-0 z-50 flex-cc py-2 -sm:text-sm border-t border-gray-200">
					<div className="w-full sm:w-1/5 flex-cc gap-12">
						<Link to="/" className="opacity-60">
							<AiOutlineHome size={20} />
						</Link>
						<Link to="/Nasdaq" className="opacity-60">
							<AiOutlineStock size={20} />
						</Link>
						<Link to="/IDX" className="opacity-60">
							<RiStockLine size={20} />
						</Link>
						<Link to="/Crypto" className="opacity-60">
							<BsCurrencyBitcoin size={20} />
						</Link>
						<Link to="/about" className="opacity-60">
							<BsFillPersonFill size={20} />
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default Footer;
