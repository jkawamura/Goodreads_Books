
/* eslint-disable dot-notation */
import React from 'react';
import {Container, Grid, Divider, Chip, Typography} from '@mui/material';
import useFetch from '../hooks/useFetch';
import {ClickAwayListener} from '@mui/base';

interface bookComponentProps {
	bookId: number;
	setDrawer: React.Dispatch<React.SetStateAction<boolean>>;
	setGenresSelect: React.Dispatch<React.SetStateAction<string[]>>;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    handleSearchClick: () => void;
}

const BookComponentMongo = ({bookId, handleSearchClick, setGenresSelect, setDrawer, setSearch}: bookComponentProps) => {
	const {data, isPending, error} = useFetch(`http://165.106.10.170:32401/mongodb/books/${bookId}`);
	const genres = data ? data['genres'] : [];
	return (
		<ClickAwayListener onClickAway={() => setDrawer(false)}>
			<Container maxWidth="md" sx={{margin: 2}}>

				{ !isPending && !error && data
					? <Grid container spacing={3}>
						<Grid item xs={4}>
							<img style={{width: '90%'}} src={data['coverImage']} />
						</Grid>
						<Grid item xs={8}>
							<Typography variant="h5">{data['bookTitle']}</Typography>
							<Typography variant="subtitle1">{data['authors'][0]['firstName'] + ' ' + data['authors'][0]['lastName']}</Typography>
							<Typography variant="subtitle2">{new Date(data['publishDate']).getFullYear()}</Typography>
							<Divider sx={{margin: 2}}><Chip label="Details" /></Divider>
							<Typography variant="subtitle2"><b>Title:</b> {data['bookTitle']}</Typography>
							<Typography variant="subtitle2"><b>Contributors:</b> {data['authors'][0]['firstName'] + ' ' + data['authors'][0]['lastName']}</Typography>
							<Typography variant="subtitle2"><b>Series:</b> {data['series']}</Typography>
							<Typography variant="subtitle2"><b>isbn:</b> {data['isbn']}</Typography>
							<Typography variant="subtitle2"><b>Pages:</b> {data['pages']}</Typography>
							<Typography variant="subtitle2"><b>Publisher:</b> {data['publisher']}</Typography>
							<Typography variant="subtitle2"><b>Published:</b> {new Date(data['publishDate']).getFullYear()}</Typography>
							<Typography variant="subtitle2"><b>Language:</b> {data['language']}</Typography>
							<Typography variant="subtitle2"><b>Rating:</b> {data['Rating']}</Typography>
							<Typography variant="subtitle2"><b>Number of Ratings:</b> {data['numberRatings']}</Typography>

						</Grid>
						<Grid item xs={12}>
							<Divider sx={{margin: 2}}><Chip label="Synopsis" /></Divider>
							<Typography paragraph variant="body1">{data ? data['description'] : ''}</Typography>
							<Divider sx={{margin: 2}}><Chip label="Tagged Genres" /></Divider>
							{genres.map((genres, i) =>
								<Chip onClick={() => {
									setGenresSelect([genres]);
									handleSearchClick();
									setDrawer(false);
									setSearch('');
								}} sx={{margin: 0.5}}label={genres} key={i} variant="outlined" ></Chip>,
							)}
						</Grid>
					</Grid>
					: <p>loading... </p>}
			</Container>
		</ClickAwayListener>
	);
};

export default BookComponentMongo;
