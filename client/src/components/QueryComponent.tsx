/* eslint-disable no-unused-vars */
import {Autocomplete, Button, FormControl, Grid, Input, InputLabel, MenuItem, Select, SelectChangeEvent, Slider, TextField, Typography} from '@mui/material';
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
	ratingSelect: number[];
	reviewSelect: number[];
	yearSelect: number[];
	setRatingSelect: React.Dispatch<React.SetStateAction<number[]>>,
	setReviewSelect: React.Dispatch<React.SetStateAction<number[]>>,
	setYearSelect: React.Dispatch<React.SetStateAction<number[]>>,
}

const QueryComponentPsql = ({...props}: QueryComponentProps) => {
	const {data: genreData, error: genreError, isPending: genrePending} = useFetch('http://165.106.10.170:32401/psql/genres');
	const {data: languageData, error: languageError, isPending: languagePending} = useFetch('http://165.106.10.170:32401/psql/books/languages');
	const handleSearch = (e: any) => {
		props.setSearch(e.target.value);
	};

	const handleFieldSelect = (event: SelectChangeEvent) => {
		props.setFieldSelect(event.target.value as string);
	};

	const handleGenreSelect = (event: object, value: any) => {
		props.setGenresSelect(value.map((genres: { genre_id: number; genre: string; }) => genres.genre_id));
	};

	const handleLanguageSelect = (event: object, value: any) => {
		props.setLanguageSelect(value.map((languages: {language: string; }) => languages.language));
	};

	const handleReviewChange = (event: Event, newValue: number | number[]) => {
		props.setReviewSelect(newValue as number[]);
	};

	const handleRatingChange = (event: Event, newValue: number | number[]) => {
		props.setRatingSelect(newValue as number[]);
	};

	const handleYearChange = (event: Event, newValue: number | number[]) => {
		props.setYearSelect(newValue as number[]);
	};

	const handleYearMaxInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		props.setYearSelect([props.yearSelect[0], Number(event.target.value)]);
	};

	const handleYearMinInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		props.setYearSelect([Number(event.target.value), props.yearSelect[1]]);
	};

	return (
		<Grid container spacing={2}>
			<Grid item xs={3} display="flex">
				<TextField id="outlined-basic" label={`${props.fieldSelect} Contains`} variant="outlined" onChange={handleSearch} />
				<FormControl sx={{minWidth: 80}}>
					<InputLabel id="Field">Field</InputLabel>
					<Select
						labelId="Field"
						value={props.fieldSelect}
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
			<Grid item xs={3} display="flex">
				<Grid container>
					<Grid item xs={1} display="flex">
					</Grid>
					<Grid item xs={10}>
						<Typography id="reviews" gutterBottom>Number of Reviews (thousands)
						</Typography>
					</Grid>
					<Grid item xs={1} display="flex">
					</Grid>
					<Grid item xs={12}>
						<Slider
							value={props.reviewSelect}
							onChange={handleReviewChange}
							valueLabelDisplay="auto"
							max={8000}
							disableSwap
							aria-labelledby="reviews"
						/>
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={1} display="flex">
			</Grid>
			<Grid item xs={4}>
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
			<Grid item xs={1} display="flex">
			</Grid>
			<Grid item xs={3} display="flex">
				<Grid container>
					<Grid item xs={1} display="flex">
					</Grid>
					<Grid item xs={8}>
						<Typography id="rating" gutterBottom>Rating
						</Typography>
					</Grid>
					<Grid item xs={3} display="flex">
					</Grid>
					<Grid item xs={1} display="flex">
					</Grid>
					<Grid item xs={8}>
						<Slider
							value={props.ratingSelect}
							onChange={handleRatingChange}
							valueLabelDisplay="auto"
							max={5}
							disableSwap
							aria-labelledby="rating"
						/>
					</Grid>
					<Grid item xs={3} display="flex">
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={3} display="flex">
				<Grid container>

					<Grid item xs={12}>
						<Typography id="year" gutterBottom>Year
						</Typography>
					</Grid>

					<Grid item xs={2} display="flex">
						<Input
							value={props.yearSelect[0]}
							size="small"
							onChange={handleYearMinInputChange}
							inputProps={{
								step: 10,
								min: 1000,
								max: 2022,
								type: 'number',
								'aria-labelledby': 'input-slider',
							}}
						/>
					</Grid>
					<Grid item xs={1} display="flex">
					</Grid>
					<Grid item xs={6}>
						<Slider
							value={props.yearSelect}
							onChange={handleYearChange}
							valueLabelDisplay="auto"
							min={1000}
							max={2020}
							disableSwap
							aria-labelledby="year"
						/>
					</Grid>
					<Grid item xs={1} display="flex">
					</Grid>
					<Grid item xs={2} display="flex">
						<Input
							value={props.yearSelect[1]}
							size="small"
							onChange={handleYearMaxInputChange}
							inputProps={{
								step: 10,
								min: 1000,
								max: 2020,
								type: 'number',
								'aria-labelledby': 'input-slider',
							}}
						/>
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={1} display="flex">
			</Grid>
			<Grid item xs={4}>
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
				<Button onClick={props.handleSearchClick} variant="contained" endIcon={<SearchIcon />}>Search
				</Button>
			</Grid>

		</Grid>
	);
};

export default QueryComponentPsql;
