import React from 'react';
import './App.css';
import Mongodb from './pages/Mongodb';
import Home from './pages/Home';
import {Routes, Route} from 'react-router-dom';
import Psql from './pages/Psql';
import MongodbBooks from './pages/MongodbBooks';

function App() {
	return (
		<Routes>
			<Route path="/" element={<Home />}/>
			<Route path="mongodb" element={<Mongodb />}/>
			<Route path="mongodb/books/:id" element={<MongodbBooks/>}></Route>
			<Route path="mongodb/authors/:id"></Route>
			<Route path="psql" element={<Psql />} />
			<Route path="psql/books/:id"></Route>
			<Route path="psql/authors/:id"></Route>
		</Routes>
	);
}

export default App;
