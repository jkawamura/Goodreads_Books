/* eslint-disable camelcase */

import React from 'react';
import {useState} from 'react';
import TextField from '@mui/material/TextField';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import useFetch from '../hooks/useFetch';

const Home = () => {
	const [search, setSearch] = useState('');
	console.log(search);
	const handleSearch = (e: any) => {
		setSearch(e.target.value);
	};

	const {data, isPending, error} = useFetch('http://165.106.10.170:32401/psql/books');

	const columns: GridColDef[] = [
		{field: 'book_id', headerName: 'ID', width: 70},
		{field: 'cover_image', headerName: 'Image', width: 100, renderCell: params => <img style={{height: '100%'}} src={params.value} />},
		{field: 'title', headerName: 'Title', width: 300, renderCell: params => <a href={`http://165.106.10.170:32401/psql/books/${params.row.book_id}`}>{params.row.title}</a>},
		{field: 'full_name', headerName: 'Author', width: 300, renderCell: params => params.value[0]},
		{field: 'publish_date', headerName: 'Published', type: 'datetime', width: 100, valueGetter: params => new Date(params.value), valueFormatter: params => params.value.getFullYear()},
		{field: 'language', headerName: 'Language', width: 130},
		{field: 'series', headerName: 'Series', width: 200},
		{field: 'book_format', headerName: 'Format', width: 200},
	];

	return (
		<div style={{height: '100%'}}>
			<TextField id="outlined-basic" label="Search" variant="outlined" onChange={() => handleSearch} />
			<div style={{display: 'flex', height: '40em'}}>
				<DataGrid
					rowHeight={100}
					disableColumnMenu
					getRowId={row => row.book_id}
					rows={data && !isPending && !error ? data : []}
					columns={columns}
					pageSize={5}
					rowsPerPageOptions={[5]}
					columnVisibilityModel={{
						// Hide columns status and traderName, the other columns will remain visible
						book_id: false,
					}}
				/>
			</div>
		</div>
	);
};

export default Home;
