import * as React from 'react';
import { useState } from "react";
import { useEffect } from 'react';
import * as Costants from './constants.js';
import Grid from '@mui/material/Grid';
import axios from "axios";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Tooltip from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export default function Content() {

    //State vars
    const [albums, setAlbums] = useState([]);
    const [users, setUsers] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [selectedUser, setSelectedUser] = React.useState('');


    //Handle Changes
    const handleChangeSearchText = (event) => {
        setSearchText(event.target.value);
    };

    const handleChangeSelectedUser = (event) => {
        setSelectedUser(event.target.value);
        axios
            // .get('/albumsfiltered', { params: { userid: event.target.value } }) //FOR HEROKU PUBLISH ONLY
            .get('http://localhost:3001/albumsfiltered', { params: { userid: event.target.value } })
            .then(function (response) { setAlbums(response.data.message); })
            .catch(function (error) { console.log(error); });;
    };


    //Runs once
    useEffect(() => {

        var configGetAlbums = {
            method: 'get',
            // url: '/albums'  //FOR HEROKU PUBLISH ONLY
            url: 'http://localhost:3001/albums'
        };

        var configGetUsers = {
            method: 'get',
            // url: '/users'  //FOR HEROKU PUBLISH ONLY
            url: 'http://localhost:3001/users'
        };

        axios(configGetAlbums)
            .then(function (response) { setAlbums(response.data.message); })
            .catch(function (error) { console.log(error); });

        axios(configGetUsers)
            .then(function (response) { setUsers(response.data.message); })
            .catch(function (error) { console.log(error); });

    }, []);


    return (
        <div className="contentContainer">

            {/* Search bar and select user controls */}
            <Grid container spacing={2}>
                <Grid item xs={9.5}>
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
                </Grid>
                <Grid item xs={2.5} >
                    <Box sx={{
                        my: 1, display: 'flex', alignItems: 'center', width: '100%',
                        borderRadius: 1, bgcolor: 'background.paper'
                    }} >
                        <FormControl fullWidth >
                            <InputLabel id="user-to-show-label">User to show</InputLabel>
                            <Select
                                labelId="user-to-show-label"
                                id="user-to-show"
                                value={selectedUser}
                                label="User to show"
                                onChange={handleChangeSelectedUser}>
                                {users.map((user) => (
                                    <MenuItem
                                        key={user}
                                        value={user} >
                                        {user}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </Grid>
            </Grid>


            {/* Album accordion list */}
            {albums.map(album => {
                if (searchText === "" || album.id.toString().includes(searchText) || album.title.toString().includes(searchText))
                    return (
                        <Costants.Accordion TransitionProps={{ unmountOnExit: true }} >

                            <Costants.AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                                <Grid container spacing={2}>
                                    <Grid item xs={10.5}>
                                        <Chip avatar={<Avatar>{album.id}</Avatar>} label={album.title} color="primary" variant="outlined" />
                                    </Grid>
                                    <Grid item xs={1.5}>
                                        <Chip avatar={<Avatar>{album.userId}</Avatar>} edge="end" label="USER ID" color="secondary" variant="outlined" />
                                    </Grid>
                                </Grid>
                            </Costants.AccordionSummary>

                            {/* Photo list */}
                            <Costants.AccordionDetails>
                                <ImageList sx={{ width: '100%' }} cols={6} rowHeight={180}>
                                    {album.photos.map(photo => {
                                        return (
                                            <div className="card">
                                                <Tooltip title={photo.title}>
                                                    <ImageListItem key={photo.url} >
                                                        <img
                                                            src={`${photo.thumbnailUrl}?w=150&h=150`}
                                                            srcSet={`${photo.thumbnailUrl}?w=150&h=150`}
                                                            alt={photo.title}
                                                            loading="eager"
                                                        />
                                                        <ImageListItemBar
                                                            title={photo.id}
                                                            subtitle={photo.title}
                                                        />
                                                    </ImageListItem>
                                                </Tooltip>
                                            </div>
                                        );
                                    })}
                                </ImageList>
                            </Costants.AccordionDetails>
                        </Costants.Accordion>
                    );
            })}
        </div>
    );
}