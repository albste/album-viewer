import * as React from 'react';
import AlbumList from '../album/albumList.js';
import SearchBar from '../input/searchBar.js';
import UserCombobox from '../input/userCombobox.js';
import Grid from '@mui/material/Grid';
 
export default function Main({ albums, users, searchText, handleChangeSearchText, selectedUser, handleChangeSelectedUser }) {

    return (
        <div className="mainViewContainer">

            {/* Search bar and select user controls */}
            <Grid container spacing={2}>
                <Grid item xs={9.5}>
                    <SearchBar searchText={searchText} handleChangeSearchText={handleChangeSearchText}/>
                </Grid>
                <Grid item xs={2.5} >
                    <UserCombobox selectedUser={selectedUser} handleChangeSelectedUser={handleChangeSelectedUser} users={users}/> 
                </Grid>
            </Grid>


            {/* Album list */}
            <AlbumList albums={albums} searchText={searchText}/>  
        
        </div>
    );
}