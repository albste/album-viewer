import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import AppBar from './components/general/appBar';
import axios from "axios";
import { useState } from "react";
import { useEffect } from 'react';
import { useAllAlbums } from './hooks/useAllAlbums';
import { useAllUsers } from './hooks/useAllUsers';
import {API_URL_ALBUMSFILTERED} from './utils/module';
import Main from './components/view/main';


function App() {

  //State vars
  const [albums, setAlbums] = useState([]);
  const allAlbums = useAllAlbums();

  const [users, setUsers] = useState([]);
  const allUsers = useAllUsers();

  const [searchText, setSearchText] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
 
  //Handle Changes
  const handleChangeSearchText = (event) => {
    setSearchText(event.target.value);
  };

  const handleChangeSelectedUser = (event) => {
    setSelectedUser(event.target.value);
    axios
      .get(API_URL_ALBUMSFILTERED, { params: { userid: event.target.value } })
      .then(function (response) {
        setAlbums(response.data.message);
      })
      .catch(function (error) {
        console.log(error);
      });;
  };


  //Runs once
  useEffect(() => {
    setAlbums(allAlbums);
    setUsers(allUsers);
  }, [allAlbums, allUsers]);

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar />
      <Toolbar />
      <Container>
        <Box sx={{ my: 2 }}>
          <Main albums={albums} users={users} searchText={searchText} selectedUser={selectedUser}
            handleChangeSearchText={handleChangeSearchText} handleChangeSelectedUser={handleChangeSelectedUser}/>
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default App;