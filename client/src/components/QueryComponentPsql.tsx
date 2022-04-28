/* eslint-disable no-unused-vars */
import {Autocomplete, Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField} from '@mui/material';
import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import useFetch from '../hooks/useFetch';

interface QueryComponentProps {
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    fieldSelect: string;
	handleSearchClick: () => void;
    setFieldSelect: React.Dispatch<React.SetStateAction<string>>;
	setGenresSelect: React.Dispatch<React.SetStateAction<number[]>>;
	setLanguageSelect: React.Dispatch<React.SetStateAction<string[]>>;
}

const QueryComponentPsql = ({handleSearchClick, setSearch, setFieldSelect, setLanguageSelect, setGenresSelect, fieldSelect}: QueryComponentProps) => {
	const {data: genreData, error: genreError, isPending: genrePending} = useFetch('http://165.106.10.170:32401/psql/genres');
	const {data: languageData, error: languageError, isPending: languagePending} = useFetch('http://165.106.10.170:32401/psql/books/languages');
	const handleSearch = (e: any) => {
		setSearch(e.target.value);
	};

	const handleFieldSelect = (event: SelectChangeEvent) => {
		setFieldSelect(event.target.value as string);
	};

	const handleGenreSelect = (event: object, value: any) => {
		setGenresSelect(value.map((genres: { genre_id: number; genre: string; }) => genres.genre_id));
	};

	const handleLanguageSelect = (event: object, value: any) => {
		setLanguageSelect(value.map((languages: {language: string; }) => languages.language));
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
					options={genreData ? genreData : [{genre: ''}]}
					getOptionLabel={option => option.genre}
					onChange={handleGenreSelect}
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
					options={languageData ? languageData : [{language: ''}]}
					getOptionLabel={option => option.language}
					onChange={handleLanguageSelect}
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

export default QueryComponentPsql;
