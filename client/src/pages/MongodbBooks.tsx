import React from 'react';
import {useParams} from 'react-router-dom';

const MongodbBooks = () => {
	const {id} = useParams();

	console.log(id);
	return (
		<div>
			<h1>mongodb books</h1>
		</div>
	);
};

export default MongodbBooks;
