
/* eslint-disable camelcase */

import React from 'react';
import {useState} from 'react';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {Drawer, Grid, Rating, AppBar, Toolbar, Button} from '@mui/material';
import useFetch from '../hooks/useFetch';
import BookComponentMongo from '../components/BookComponentMongo';
import QueryComponentMongo from '../components/QueryComponentMongo';

const cleanAuthor = (authorarr: {firstName: string, lastName: string, role: string}[]):string => {
	for (const author of authorarr) {
		if (author.role.toLowerCase().includes('author') || author.role.toLowerCase().includes('contributor')) {
			return author.firstName + ' ' + author.lastName;
		}
	}

	return 'None';
};

const Mongodb = () => {
	const [fetchURL, setFetchURL] = useState('http://165.106.10.170:32401/mongodb/books/top100');
	const [drawer, setDrawer] = useState(false);
	const [bookId, setBookId] = useState(0);
	const [fieldSelect, setFieldSelect] = useState('Title');
	const [search, setSearch] = useState('');
	const [genreSelect, setGenresSelect] = useState(['']);
	const [languageSelect, setLanguageSelect] = useState(['']);
	const [ratingSelect, setRatingSelect] = useState([0, 5]);
	const [reviewSelect, setReviewSelect] = useState([0, 8000]);
	const [yearSelect, setYearSelect] = useState([1000, 2022]);
	const newQueryURL = `http://165.106.10.170:32401/mongodb/books?field=${fieldSelect}&contains=${search}&genres=${genreSelect.join()}&languages=${languageSelect.join()}&rating=${ratingSelect.join()}&review=${reviewSelect.join()}&year=${yearSelect.join()}`;

	const handleTitleClick = (book_id: number) => {
		setBookId(book_id);
		setDrawer(true);
	};

	const handleSearchClick = () => {
		setFetchURL(newQueryURL);
	};

	const queryProps = {
		handleSearchClick,
		setGenresSelect,
		setSearch,
		setLanguageSelect,
		setFieldSelect,
		fieldSelect,
		ratingSelect,
		reviewSelect,
		yearSelect,
		setRatingSelect,
		setReviewSelect,
		setYearSelect,
	};

	const {data, error, isPending} = useFetch(fetchURL);

	const columns: GridColDef[] = [
		{field: 'bookId', headerName: 'ID', width: 70},
		{field: 'coverImage', headerName: 'Cover', width: 100, renderCell: params => <img style={{height: '90%'}} src={params.value} />},
		{field: 'bookTitle', headerName: 'Title', width: 300, renderCell: params => <a href="#/mongodb" onClick={() => handleTitleClick(params.row.bookId)}>{params.row.bookTitle}</a>},
		{field: 'authors', headerName: 'Author', width: 200, renderCell: params => cleanAuthor(params.value)},
		{field: 'publishDate', headerName: 'Published', type: 'datetime', width: 150, valueGetter: params => new Date(params.value), valueFormatter: params => params.value.getFullYear()},
		{field: 'language', headerName: 'Language', width: 150},
		{field: 'series', headerName: 'Series', width: 200},
		{field: 'rating', headerName: 'Rating', width: 140, renderCell: params => <Rating readOnly defaultValue={params.value} precision={0.5} />},
		{field: 'numberRatings', headerName: 'Reviews', width: 100},
		{field: 'bookFormat', headerName: 'Format', width: 150},
		{field: 'publisher', headerName: 'Publisher', width: 200},
	];

	return (
		<div>
			<AppBar position="sticky" sx={{bgcolor: '#4DB33D'}}>
				<Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
					<img src="/mongodb.png" alt="" style={{height: '50px'}} />
					<Button href="#/psql" variant="outlined" color="inherit">Switch to PostgreSQL</Button>
				</Toolbar>
			</AppBar>
			<Grid container spacing={3}>
				<Grid item xs={12} sx={{margin: 2}}>
					<QueryComponentMongo {...queryProps}/>
				</Grid >
				<Grid item xs={12} sx={{margin: 2, display: 'flex', height: '80vh'}}>
					<DataGrid
						rowHeight={100}
						getRowId={row => row.bookId}
						rows={data && !isPending && !error ? data : []}
						columns={columns}
						pageSize={10}
						rowsPerPageOptions={[5]}
						columnVisibilityModel={{
							bookId: false,
						}}
						disableSelectionOnClick
					/>
					<Drawer
						anchor="right"
						open={drawer}
					>
						<BookComponentMongo setDrawer={setDrawer} bookId={bookId}/>
					</Drawer>
				</Grid>
			</Grid>
		</div>
	);
};

export default Mongodb;
