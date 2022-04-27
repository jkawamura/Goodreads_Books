import {Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField} from '@mui/material';
import React from 'react';

interface QueryComponentProps {
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    fieldSelect: string;
    setFieldSelect: React.Dispatch<React.SetStateAction<string>>;
}

const QueryComponent = ({setSearch, setFieldSelect, fieldSelect}: QueryComponentProps) => {
	const handleSearch = (e: any) => {
		setSearch(e.target.value);
	};

	const handleFieldSelect = (event: SelectChangeEvent) => {
		setFieldSelect(event.target.value as string);
	};

	return (
		<Box sx={{margin: 3, boxshadow: 3}}>
			<TextField id="outlined-basic" label="Search" variant="outlined" onChange={handleSearch} />
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
					<MenuItem value={'title'}>Title</MenuItem>
					<MenuItem value={'description'}>Description</MenuItem>
				</Select>
			</FormControl>

		</Box>
	);
};

export default QueryComponent;
