/* eslint-disable camelcase */
/* eslint-disable dot-notation */
import React from 'react';
import {Container, Grid, Divider, Chip, Typography} from '@mui/material';
import useFetch from '../hooks/useFetch';
import {ClickAwayListener} from '@mui/base';

interface bookComponentProps {
	book_id: number;
	setDrawer: React.Dispatch<React.SetStateAction<boolean>>;
	setGenresSelect: React.Dispatch<React.SetStateAction<number[]>>;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    handleSearchClick: () => void;

}

const BookComponentPsql = ({book_id, handleSearchClick, setGenresSelect, setDrawer, setSearch}: bookComponentProps) => {
	const {data, isPending, error} = useFetch(`http://165.106.10.170:32401/psql/books/${book_id}`);
	const genres: string[] = data ? data[0]['genres'] : [];
	return (
		<ClickAwayListener onClickAway={() => setDrawer(false)}>
			<Container maxWidth="md" sx={{margin: 2}}>

				{ !isPending && !error && data
					? <Grid container spacing={3}>
						<Grid item xs={4}>
							<img style={{width: '90%'}} src={data[0]['cover_image']} />
						</Grid>
						<Grid item xs={8}>
							<Typography variant="h5">{data[0]['title']}</Typography>
							<Typography variant="subtitle1">{}</Typography>
							<Typography variant="subtitle2">{new Date(data[0]['publish_date']).getFullYear()}</Typography>
							<Divider sx={{margin: 2}}><Chip label="Details" /></Divider>
							<Typography variant="subtitle2"><b>Title:</b> {data[0]['title']}</Typography>
							<Typography variant="subtitle2"><b>Contributors:</b> {}</Typography>
							<Typography variant="subtitle2"><b>Series:</b> {data[0]['series']}</Typography>
							<Typography variant="subtitle2"><b>isbn:</b> {data[0]['isbn']}</Typography>
							<Typography variant="subtitle2"><b>Pages:</b> {data[0]['pages']}</Typography>
							<Typography variant="subtitle2"><b>Publisher:</b> {data[0]['publisher_name']}</Typography>
							<Typography variant="subtitle2"><b>Published:</b> {new Date(data[0]['publish_date']).getFullYear()}</Typography>
							<Typography variant="subtitle2"><b>Language:</b> {data[0]['language']}</Typography>
							<Typography variant="subtitle2"><b>Rating:</b> {data[0]['rating']}</Typography>
							<Typography variant="subtitle2"><b>Number of Ratings:</b> {data[0]['number_ratings']}</Typography>

						</Grid>
						<Grid item xs={12}>
							<Divider sx={{margin: 2}}><Chip label="Synopsis" /></Divider>
							<Typography paragraph variant="body1">{data[0]['description']}</Typography>
							<Divider sx={{margin: 2}}><Chip label="Tagged Genres" /></Divider>
							<h4>Tagged Genres</h4>
							{genres.map((genres, i) =>
								<Chip onClick={() => {
									const result = genres.split(':');
									setGenresSelect([parseInt(result[1], 10)]);
									handleSearchClick();
									setDrawer(false);
									setSearch('');
								}} sx={{margin: 0.5}}label={genres.split(':')[0]} key={i} variant="outlined" ></Chip>,
							)}
						</Grid>
					</Grid>
					: <p>loading... </p>}
			</Container>
		</ClickAwayListener>
	);
};

export default BookComponentPsql;
