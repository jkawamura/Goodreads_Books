import React from 'react';
import './App.css';
import Mongodb from './pages/Mongodb';
import {Routes, Route} from 'react-router-dom';
import Psql from './pages/Psql';
import Home from './pages/Home';

function App() {
	return (
		<Routes>
			<Route path="/" element={<Home />}/>
			<Route path="mongodb" element={<Mongodb />}/>
			<Route path="psql" element={<Psql />} />
		</Routes>
	);
}

export default App;
