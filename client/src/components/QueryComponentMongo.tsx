/* eslint-disable no-unused-vars */
import {Autocomplete, Button, createFilterOptions, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField} from '@mui/material';
import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import useFetch from '../hooks/useFetch';

interface QueryComponentProps {
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    fieldSelect: string;
	handleSearchClick: () => void;
    setFieldSelect: React.Dispatch<React.SetStateAction<string>>;
	setGenresSelect: React.Dispatch<React.SetStateAction<string[]>>;
	setLanguageSelect: React.Dispatch<React.SetStateAction<string[]>>;
}

const QueryComponentMongo = ({handleSearchClick, setSearch, setFieldSelect, setLanguageSelect, setGenresSelect, fieldSelect}: QueryComponentProps) => {
	const {data: genreData, error: genreError, isPending: genrePending} = useFetch('http://165.106.10.170:32401/mongodb/genres');
	const {data: languageData, error: languageError, isPending: languagePending} = useFetch('http://165.106.10.170:32401/mongodb/books/languages');
	const handleSearch = (e: any) => {
		setSearch(e.target.value);
	};

	const handleFieldSelect = (event: SelectChangeEvent) => {
		setFieldSelect(event.target.value as string);
	};

	const handleGenreSelect = (event: object, value: any) => {
		setGenresSelect(value);
	};

	const handleLanguageSelect = (event: object, value: any) => {
		setLanguageSelect(value);
	};

	return (
		<Grid container spacing={2}>
			<Grid item xs={12} display="flex">
				<TextField id="outlined-basic" label={`${fieldSelect} Contains`} variant="outlined" onChange={handleSearch} />
				<FormControl sx={{minWidth: 80}}>
					<InputLabel id="Field">Field</InputLabel>
					<Select
						labelId="Field"
						value={fieldSelect}
						label="Field"
						onChange={handleFieldSelect}
						autoWidth
					>
						<MenuItem value={'Title'}>Title</MenuItem>
						<MenuItem value={'Author'}>Author</MenuItem>
						<MenuItem value={'Description'}>Description</MenuItem>
					</Select>
				</FormControl>
			</Grid>
			<Grid item xs={6}>
				<Autocomplete
					multiple
					limitTags={3}
					id="multiple-limit-tags"
					options={genreData ? genreData : ['']}
					onChange={handleGenreSelect}
					filterOptions={createFilterOptions({matchFrom: 'start'})}
					renderInput={params => (
						<TextField {...params} label="Filter by Genre" placeholder="Genres" />
					)}

				/>
			</Grid>
			<Grid item xs={6}>
				<Autocomplete
					multiple
					limitTags={3}
					id="multiple-limit-tags"
					options={languageData ? languageData : ['']}
					onChange={handleLanguageSelect}
					filterOptions={createFilterOptions({matchFrom: 'start'})}
					renderInput={params => (
						<TextField {...params} label="Filter by Language" placeholder="Languages" />
					)}

				/>
			</Grid>
			<Grid item xs={12}>
				<Button onClick={handleSearchClick} variant="contained" endIcon={<SearchIcon />}>Search
				</Button>
			</Grid>

		</Grid>
	);
};

export default QueryComponentMongo;
