import React from 'react';
import useClearance from '@core/hooks/useClearance';
import { useLayout } from '@core/contexts';
import Navbar from '@components/Navbar';
import Footer from '@components/Footer';
import AlertHandler from '@components/_shared/AlertHandler';

interface Props {
	children: React.ReactNode;
	title?: string;
	className?: string;
	style?: React.CSSProperties;
}

const MainLayout = ({ children, title, className, style }: Props): JSX.Element => {
	const { alert_value } = useLayout();
	const [clearance, upperRef, lowerRef] = useClearance();

	return (
		<>
			<header ref={upperRef}>
				<Navbar />
			</header>
			<main style={{ minHeight: clearance, ...style }} className={className}>
				{children}
			</main>
			<footer ref={lowerRef}>
				<Footer />
			</footer>
			{alert_value && <AlertHandler />}
		</>
	);
};

export default MainLayout;
