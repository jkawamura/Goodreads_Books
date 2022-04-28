
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
		if (split[3].toLowerCase().trim().includes('author')) {
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
	const [languageSelect, setLanguageSelect] = useState([' ']);
	const newQueryURL = `http://165.106.10.170:32401/psql/books?field=${fieldSelect}&contains=${search}&genres=${genreSelect.join()}&languages=${languageSelect.join()}`;

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
	const {data, error, isPending} = useFetch(fetchURL);

	const columns: GridColDef[] = [
		{field: 'book_id', headerName: 'ID', width: 70},
		{field: 'cover_image', headerName: 'Cover', width: 100, renderCell: params => <img style={{height: '90%'}} src={params.value} />},
		{field: 'title', headerName: 'Title', width: 350, renderCell: params => <a href="#/psql" onClick={() => handleTitleClick(params.row.book_id)}>{params.row.title}</a>},
		{field: 'author', headerName: 'Author', width: 250, renderCell: params => cleanAuthor(params.value)},
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
					<QueryComponentPsql handleSearchClick={handleSearchClick} setGenresSelect={setGenresSelect} setSearch={setSearch} setLanguageSelect={setLanguageSelect} setFieldSelect={setFieldSelect} fieldSelect={fieldSelect} />
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
						<BookComponentPsql handleSearchClick={handleSearchClick} book_id={bookId} setDrawer={setDrawer} setGenresSelect={setGenresSelect} setSearch={setSearch} />
					</Drawer>
				</Grid>
			</Grid>
		</div>
	);
};

export default Psql;
