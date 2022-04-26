import React from 'react';

interface homeProps {

}
const Home = (props: homeProps) => {
	console.log(props);
	return (
		<div>
			<h1>This is a test</h1>
		</div>
	);
};

export default Home;
