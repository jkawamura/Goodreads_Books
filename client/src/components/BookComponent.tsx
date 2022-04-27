/* eslint-disable camelcase */
/* eslint-disable dot-notation */
import React from 'react';
import {Container, Grid, Divider, Chip} from '@mui/material';
import useFetch from '../hooks/useFetch';
import {ClickAwayListener} from '@mui/base';

interface bookComponentProps {
	book_id: number;
	database: string;
	setState: React.Dispatch<React.SetStateAction<boolean>>;
}// <a href={`http://165.106.10.170:32401/psql/books/${params.row.book_id}`}>

const BookComponent = ({book_id, database, setState}: bookComponentProps) => {
	const {data, isPending, error} = useFetch(`http://165.106.10.170:32401/${database}/books/${book_id}`);
	const genres = data ? data[0]['genres'] : [];
	return (
		<ClickAwayListener onClickAway={() => setState(false)}>
			<Container maxWidth="md" sx={{margin: 2}}>

				{ !isPending && !error
					? <Grid container spacing={3}>
						<Grid item xs={4}>
							<img style={{width: '90%'}} src={data ? data[0]['cover_image'] : 'https://islandpress.org/sites/default/files/default_book_cover_2015.jpg'} />
						</Grid>
						<Grid item xs={8}>
							<h1>{data ? data[0]['title'] : ''}</h1>
							<h4>{data ? data[0]['title'] : ''}</h4>
							<h6>{data ? data[0]['publish_date'] : ''}</h6>
							{/* <CustomImg style={{height: '100%', width: '100%'}} src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1586722975l/2767052.jpg" /> */}

						</Grid>
						<Grid item xs={12}>
							<Divider />
							<p>{data ? data[0]['description'] : ''}</p>
							<Divider />
							<h4>Tagged Genres</h4>
							{genres.map((genres, i) =>
								<Chip onClick={() => {
									console.log();
								}} sx={{margin: 0.5}}label={genres} key={i} variant="outlined" ></Chip>,
							)}
						</Grid>
					</Grid>
					: <p>loading... </p>}
			</Container>
		</ClickAwayListener>
	);
};

export default BookComponent;
