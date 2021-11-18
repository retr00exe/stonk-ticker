import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from '@pages/index';
import Login from '@pages/login';
import About from '@pages/about';
import './App.css';

const App = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Index />} />
				<Route path="/login" element={<Login />} />
				<Route path="/about" element={<About />} />
			</Routes>
		</Router>
	);
};

export default App;
