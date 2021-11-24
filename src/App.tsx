import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from '@components/_layouts/MainLayout';
import Market from '@pages/market';
import Detail from '@pages/detail';
import About from '@pages/about';
import Feature from '@pages/feature';
import Index from '@pages/index';
import './App.css';

const App = () => {
	return (
		<Router>
			<MainLayout className="w-full py-0">
				<Routes>
					<Route path="/" element={<Index />} />
					<Route path="/about" element={<About />} />
					<Route path="/:market/:id" element={<Detail />} />
					<Route path="/feature" element={<Feature />} />
					<Route path="/IDX" element={<Market market="IDX" />} />
					<Route path="/Nasdaq" element={<Market market="Nasdaq" />} />
					<Route path="/Crypto" element={<Market market="Crypto" />} />
				</Routes>
			</MainLayout>
		</Router>
	);
};

export default App;
