
/* eslint-disable camelcase */

import React, {useEffect} from 'react';
import {useState} from 'react';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {Drawer, Grid, Rating, AppBar, Toolbar, Button} from '@mui/material';
import useFetch from '../hooks/useFetch';
import BookComponentPsql from '../components/BookComponentPsql';
import QueryComponentPsql from '../components/QueryComponentPsql';

const cleanAuthor = (authorarr: string[]):string => {
	for (const author of authorarr) {
		const split = author.split(',');
		if (split[3].toLowerCase().trim().includes('author') || split[3].toLowerCase().trim().includes('contributor')) {
			return split[1] + ' ' + split[2];
		}
	}

	return 'None';
};

const Psql = () => {
	const [fetchURL, setFetchURL] = useState('http://165.106.10.170:32401/psql/books/top100');
	const [drawer, setDrawer] = useState(false);
	const [bookId, setBookId] = useState(0);
	const [fieldSelect, setFieldSelect] = useState('Title');
	const [search, setSearch] = useState('');
	const [genreSelect, setGenresSelect] = useState([0]);
	const [languageSelect, setLanguageSelect] = useState(['']);
	const [ratingSelect, setRatingSelect] = useState([0, 5]);
	const [reviewSelect, setReviewSelect] = useState([0, 8000]);
	const [yearSelect, setYearSelect] = useState([1000, 2022]);
	const newQueryURL = `http://165.106.10.170:32401/psql/books?field=${fieldSelect}&contains=${search}&genres=${genreSelect.join()}&languages=${languageSelect.join()}&rating=${ratingSelect.join()}&review=${reviewSelect.join()}&year=${yearSelect.join()}`;

	const handleTitleClick = (book_id: number) => {
		setBookId(book_id);
		setDrawer(true);
	};

	const handleSearchClick = () => {
		setFetchURL(newQueryURL);
	};

	useEffect(() => {
		console.log(newQueryURL);
	}, [genreSelect]);

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
		{field: 'book_id', headerName: 'ID', width: 70},
		{field: 'cover_image', headerName: 'Cover', width: 100, renderCell: params => <img style={{height: '90%'}} src={params.value} />},
		{field: 'title', headerName: 'Title', width: 300, renderCell: params => <a href="#/psql" onClick={() => handleTitleClick(params.row.book_id)}>{params.row.title}</a>},
		{field: 'author', headerName: 'Author', width: 200, renderCell: params => cleanAuthor(params.value)},
		{field: 'publish_date', headerName: 'Published', type: 'datetime', width: 150, valueGetter: params => new Date(params.value), valueFormatter: params => params.value.getFullYear()},
		{field: 'language', headerName: 'Language', width: 150},
		{field: 'series', headerName: 'Series', width: 200},
		{field: 'rating', headerName: 'Rating', width: 140, renderCell: params => <Rating readOnly defaultValue={params.value} precision={0.5} />},
		{field: 'number_ratings', headerName: 'Reviews', width: 100},
		{field: 'book_format', headerName: 'Format', width: 150},
		{field: 'publisher_name', headerName: 'Publisher', width: 200},
	];

	return (
		<div>
			<AppBar position="sticky" sx={{bgcolor: '#336791'}}>
				<Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
					<img src="/psql.png" alt="" style={{height: '50px'}} />
					<Button href="#/mongodb" variant="outlined" color="inherit">Switch to MongoDB</Button>
				</Toolbar>
			</AppBar>
			<Grid container spacing={3}>
				<Grid item xs={12} sx={{margin: 2}}>
					<QueryComponentPsql {...queryProps} />
				</Grid >
				<Grid item xs={12} sx={{margin: 2, display: 'flex', height: '80vh'}}>
					<DataGrid
						rowHeight={100}
						getRowId={row => row.book_id}
						rows={data && !isPending && !error ? data : []}
						columns={columns}
						pageSize={10}
						rowsPerPageOptions={[5]}
						columnVisibilityModel={{
							book_id: false,
						}}
						disableSelectionOnClick
					/>
					<Drawer
						anchor="right"
						open={drawer}
					>
						<BookComponentPsql book_id={bookId} setDrawer={setDrawer} />
					</Drawer>
				</Grid>
			</Grid>
		</div>
	);
};

export default Psql;
