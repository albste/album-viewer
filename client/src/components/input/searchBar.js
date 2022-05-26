import * as React from 'react';
import * as Costants from '../../utils/constants.js';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';

export default function SearchBar({ searchText, handleChangeSearchText }) {

    return (
        <Box sx={{
            my: 1, display: 'flex', alignItems: 'center', width: '100%',
            border: (theme) => `1px solid rgba(0, 0, 0, 0.3)`,
            borderRadius: 1, bgcolor: 'background.paper'
        }} >
            <Costants.Search >
                <Costants.SearchIconWrapper>
                    <SearchIcon />
                </Costants.SearchIconWrapper>
                <Costants.StyledInputBase
                    value={searchText}
                    onChange={handleChangeSearchText}
                    placeholder="Search album" position="right"
                    inputProps={{ 'aria-label': 'search' }} />
            </Costants.Search>
        </Box>
    );
}