import {Button, Card, CardActions, CardContent, CardMedia, Grid, Typography} from '@mui/material';
import React from 'react';
import {} from 'react-router-dom';

const Home = () => {
	console.log('ff');
	return (
		<Grid
			container
			spacing={0}
			alignItems="center"
			style={{minHeight: '100vh', justifyContent: 'center'}}
		>

			<Grid item xs={3}>
				<Card sx={{maxWidth: 345, borderRadius: '5px'}}>
					<CardMedia
						component="img"
						height="140"
						image="/books.jpg"
						alt="green iguana"
					/>
					<CardContent>
						<Typography gutterBottom variant="h5">
							Goodreads Database
						</Typography>
						<Typography variant="body2" paragraph={true} color="text.secondary">
								This site contains data for over 50,000 books found in the Goodreads Best Books Ever list. Data was obtained from <a href="https://zenodo.org/record/4265096#.YmnKpdrMKUk">here</a>
						</Typography>
						<Typography variant="body2" color="text.secondary">
								The data resides within both a PostgreSQL database and a MongoDB database. The interfaces for both are identical and can be accessed below:
						</Typography>
					</CardContent>
					<CardActions>
						<Button href="#/psql" size="small">PostgreSQL</Button>
						<Button href="#/mongodb" size="small">MongoDB</Button>
					</CardActions>
				</Card>
			</Grid>
		</Grid>
	);
};

export default Home;
