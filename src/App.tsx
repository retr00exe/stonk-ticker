import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from '@components/_layouts/MainLayout';
import Index from '@pages/index';
import Detail from '@pages/detail';
import Login from '@pages/login';
import About from '@pages/about';
import Feature from '@pages/feature';
import News from '@pages/news';
import './App.css';

const App = () => {
	return (
		<Router>
			<MainLayout className="w-full py-0">
				<Routes>
					<Route path="/" element={<Index />} />
					<Route path="/login" element={<Login />} />
					<Route path="/about" element={<About />} />
					<Route path="/:market/:id" element={<Detail />} />
					<Route path="/feature" element={<Feature />} />
					<Route path="/news" element={<News />} />
				</Routes>
			</MainLayout>
		</Router>
	);
};

export default App;
