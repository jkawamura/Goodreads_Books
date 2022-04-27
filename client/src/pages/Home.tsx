import {AppBar, Button, IconButton, Toolbar, Typography} from '@mui/material';
import React from 'react';
import {Outlet} from 'react-router-dom';

const Home = () => {
	console.log('ff');
	return (
		<div>
			<AppBar position="static">
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{mr: 2}}
					>
					</IconButton>
					<Typography variant="h6" component="div" sx={{flexGrow: 1}}>
            News
					</Typography>
					<Button color="inherit">Login</Button>
				</Toolbar>
			</AppBar>
			<Outlet />
		</div>
	);
};

export default Home;
