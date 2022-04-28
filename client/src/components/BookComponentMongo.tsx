
/* eslint-disable dot-notation */
import React from 'react';
import {Container, Grid, Divider, Chip, Typography} from '@mui/material';
import useFetch from '../hooks/useFetch';
import {ClickAwayListener} from '@mui/base';

interface bookComponentProps {
	bookId: number;
	setDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}

const cleanAuthor = (authorarr: {firstName: string, lastName: string, role: string}[]):string => {
	for (const author of authorarr) {
		if (author.role.toLowerCase().includes('author') || author.role.toLowerCase().includes('contributor')) {
			return author.firstName + ' ' + author.lastName;
		}
	}

	return 'None';
};

const generateContributors = (authorarr: {firstName: string, lastName: string, role: string}[]):string => {
	let output = '';
	authorarr.forEach((author, i) => {
		if (i === 0) {
			output += author.firstName + ' ' + author.lastName + ' (' + author.role + ')';
		} else {
			output += ', ' + author.firstName + ' ' + author.lastName + ' (' + author.role + ')';
		}
	});
	return output;
};

const BookComponentMongo = ({bookId, setDrawer}: bookComponentProps) => {
	const {data, isPending, error} = useFetch(`http://165.106.10.170:32401/mongodb/books/${bookId}`);
	const genres = data ? data['genres'] : [];
	// Const {data: relatedData, isPending: relatedPending, error: relatedError} = useFetch(`http://165.106.10.170:32401/mongodb/genres/contains=${genres ? genres.join() : ''}`);
	// const relatedBooks = relatedData ? relatedData
	// Const generateAuthors = (authors: {firstName: string, lastName: string, role: string}) => {
	// 	authors.map(())
	// };

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
							<Typography variant="subtitle1">{cleanAuthor(data['authors'])}</Typography>
							<Typography variant="subtitle2">{new Date(data['publishDate']).getFullYear()}</Typography>
							<Divider sx={{margin: 2}}><Chip label="Details" /></Divider>
							<Typography variant="subtitle2"><b>Title:</b> {data['bookTitle']}</Typography>
							<Typography variant="subtitle2"><b>Contributors:</b> {generateContributors(data['authors'])}</Typography>
							<Typography variant="subtitle2"><b>Series:</b> {data['series']}</Typography>
							<Typography variant="subtitle2"><b>isbn:</b> {data['isbn']}</Typography>
							<Typography variant="subtitle2"><b>Pages:</b> {data['pages']}</Typography>
							<Typography variant="subtitle2"><b>Publisher:</b> {data['publisher']}</Typography>
							<Typography variant="subtitle2"><b>Published:</b> {new Date(data['publishDate']).getFullYear()}</Typography>
							<Typography variant="subtitle2"><b>Language:</b> {data['language']}</Typography>
							<Typography variant="subtitle2"><b>Rating:</b> {data['rating']}</Typography>
							<Typography variant="subtitle2"><b>Number of Ratings:</b> {data['numberRatings']}</Typography>

						</Grid>
						<Grid item xs={12}>
							<Divider sx={{margin: 2}}><Chip label="Synopsis" /></Divider>
							<Typography paragraph variant="body1">{data ? data['description'] : ''}</Typography>
							<Divider sx={{margin: 2}}><Chip label="Tagged Genres" /></Divider>
							{genres.map((genres, i) =>
								<Chip onClick={() => {
									console.log();
								}} sx={{margin: 0.5}}label={genres} key={i} variant="outlined" ></Chip>,
							)}
						</Grid>
						{/* { !relatedPending && !relatedError && relatedData ?
						<Grid item xs={12}>
							<Divider sx={{margin: 2}}><Chip label="Books Like This One" /></Divider>
							<Grid container spacing={3}>
								{relatedData.forEach((book, i) =>
									<Grid item xs={3}>

									</Grid>,
								)}
								<Grid item xs={3}>

								</Grid>
								<Grid item xs={3}>

								</Grid>
								<Grid item xs={3}>

								</Grid>
								<Grid item xs={3}>

								</Grid>
							</Grid>
						</Grid> : loading...} */}
					</Grid>
					: <p>loading... </p>}
			</Container>
		</ClickAwayListener>
	);
};

export default BookComponentMongo;
