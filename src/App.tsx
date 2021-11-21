import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from '@components/_layouts/MainLayout';
import Index from '@pages/index';
import Detail from '@pages/detail';
import Login from '@pages/login';
import About from '@pages/about';
import './App.css';

const App = () => {
	return (
		<Router>
			<MainLayout className="max-w-6xl mx-auto my-10">
				<Routes>
					<Route path="/" element={<Index />} />
					<Route path="/login" element={<Login />} />
					<Route path="/about" element={<About />} />
					<Route path="/:market/:id" element={<Detail />} />
				</Routes>
			</MainLayout>
		</Router>
	);
};

export default App;
