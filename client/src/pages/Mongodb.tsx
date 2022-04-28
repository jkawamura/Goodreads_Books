
/* eslint-disable camelcase */

import React, {useEffect} from 'react';
import {useState} from 'react';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {Drawer, Grid, Rating, AppBar, Toolbar, Button} from '@mui/material';
import useFetch from '../hooks/useFetch';
import BookComponent from '../components/BookComponent';
import QueryComponent from '../components/QueryComponent';

const cleanAuthor = (authorarr: {firstName: string, lastName: string, role: string}[]):string => {
	for (const author of authorarr) {
		if (author.role.toLowerCase().includes('author')) {
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
	const [genreSelect, setGenresSelect] = useState([0]);
	const [languageSelect, setLanguageSelect] = useState([' ']);
	const newQueryURL = `http://165.106.10.170:32401/mongodb/books?field=${fieldSelect}&contains=${search}&genres=${genreSelect.join()}&languages=${languageSelect.join()}`;

	useEffect(() => {
		console.log(newQueryURL);
	}, [search]);
	const handleTitleClick = (book_id: number) => {
		setBookId(book_id);
		setDrawer(true);
	};

	const handleSearchClick = () => {
		setFetchURL(newQueryURL);
	};

	const {data, error, isPending} = useFetch(fetchURL);

	const columns: GridColDef[] = [
		{field: 'bookId', headerName: 'ID', width: 70},
		{field: 'coverImage', headerName: 'Cover', width: 100, renderCell: params => <img style={{height: '90%'}} src={params.value} />},
		{field: 'bookTitle', headerName: 'Title', width: 300, renderCell: params => <a href="#/mongodb" onClick={() => handleTitleClick(params.row.bookId)}>{params.row.bookTitle}</a>},
		{field: 'authors', headerName: 'Author', width: 200, renderCell: params => cleanAuthor(params.value)},
		{field: 'publishDate', headerName: 'Published', type: 'datetime', width: 100, valueGetter: params => new Date(params.value), valueFormatter: params => params.value.getFullYear()},
		{field: 'language', headerName: 'Language', width: 130},
		{field: 'series', headerName: 'Series', width: 200},
		{field: 'rating', headerName: 'Rating', width: 140, renderCell: params => <Rating readOnly defaultValue={params.value} precision={0.5} />},
		{field: 'numberRatings', headerName: 'Reviews', width: 100},
		{field: 'bookFormat', headerName: 'Format', width: 150},
		{field: 'publisher', headerName: 'Publisher', width: 200},
		{field: 'edition', headerName: 'Edition', width: 200},
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
					<QueryComponent handleSearchClick={handleSearchClick} setGenresSelect={setGenresSelect} database={'mongodb'} setSearch={setSearch} setLanguageSelect={setLanguageSelect} setFieldSelect={setFieldSelect} fieldSelect={fieldSelect}></QueryComponent>
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
							book_id: false,
						}}
						disableSelectionOnClick
					/>
					<Drawer
						anchor="right"
						open={drawer}
					>
						<BookComponent database={'mongodb'} book_id={bookId} setState={setDrawer}/>
					</Drawer>
				</Grid>
			</Grid>
		</div>
	);
};

export default Mongodb;
