
/* eslint-disable camelcase */

import React from 'react';
import {useState} from 'react';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {Drawer, TextField, Grid, Select, MenuItem, SelectChangeEvent, InputLabel, FormControl, Rating} from '@mui/material';
import {Box} from '@mui/system';
import useFetch from '../hooks/useFetch';
import BookComponent from '../components/BookComponent';

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
	const [drawer, setDrawer] = useState(false);
	const [bookId, setBookId] = useState(1);

	const [fieldSelect, setFieldSelect] = useState('');

	const [search, setSearch] = useState('');
	console.log(search);
	const handleSearch = (e: any) => {
		setSearch(e.target.value);
	};

	const handleTitleClick = (book_id: number) => {
		setBookId(book_id);
		setDrawer(true);
	};

	const handleFieldSelect = (event: SelectChangeEvent) => {
		setFieldSelect(event.target.value as string);
	};

	// Const newQueryURL = `http://165.106.10.170:32401/psql/books?${fieldSelect}=${search}&`;
	const initialBooks = useFetch('http://165.106.10.170:32401/psql/books');

	const columns: GridColDef[] = [
		{field: 'book_id', headerName: 'ID', width: 70},
		{field: 'cover_image', headerName: 'Cover', width: 100, renderCell: params => <img style={{height: '90%'}} src={params.value} />},
		{field: 'title', headerName: 'Title', width: 300, renderCell: params => <a href="#/psql" onClick={() => handleTitleClick(params.row.book_id)}>{params.row.title}</a>},
		{field: 'author', headerName: 'Author', width: 200, renderCell: params => cleanAuthor(params.value)},
		{field: 'publish_date', headerName: 'Published', type: 'datetime', width: 100, valueGetter: params => new Date(params.value), valueFormatter: params => params.value.getFullYear()},
		{field: 'language', headerName: 'Language', width: 130},
		{field: 'series', headerName: 'Series', width: 200},
		{field: 'rating', headerName: 'Rating', width: 140, renderCell: params => <Rating readOnly defaultValue={params.value} precision={0.5} />},
		{field: 'number_ratings', headerName: 'Reviews', width: 100},
		{field: 'book_format', headerName: 'Format', width: 150},
		{field: 'publisher_name', headerName: 'Publisher', width: 200},
		{field: 'edition', headerName: 'Edition', width: 200},
	];

	return (
		<Grid container spacing={3}>
			<Grid item xs={12}>

				<Box sx={{margin: 3, boxshadow: 3}}>
					<TextField id="outlined-basic" label="Search" variant="outlined" onChange={() => handleSearch} />
					<FormControl sx={{minWidth: 80}}>
						<InputLabel id="Field">Field</InputLabel>

						<Select
							labelId="Field"
							value={fieldSelect}
							label="Field"
							onChange={handleFieldSelect}
							autoWidth
						>
							<MenuItem value={'author'}>Author</MenuItem>
							<MenuItem value={'book'}>Title</MenuItem>
							<MenuItem value={'description'}>Description</MenuItem>
						</Select>
					</FormControl>

				</Box>
			</Grid >
			<Grid item xs={12} sx={{margin: 2}}>
				<div style={{display: 'flex', height: '80vh'}}>
					<DataGrid
						rowHeight={100}
						getRowId={row => row.book_id}
						rows={initialBooks.data && !initialBooks.isPending && !initialBooks.error ? initialBooks.data : []}
						columns={columns}
						pageSize={10}
						rowsPerPageOptions={[5]}
						columnVisibilityModel={{
							book_id: false,
						}}
						disableSelectionOnClick
					/>
				</div>
				<Drawer
					anchor="right"
					open={drawer}
				>
					<BookComponent database={'psql'} book_id={bookId} setState={setDrawer}/>
				</Drawer>
			</Grid>
		</Grid>
	);
};

export default Psql;
