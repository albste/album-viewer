const path = require('path');
const express = require('express');
const PORT = process.env.PORT || 3001;
const axios = require('axios');
const app = express();
var cors = require('cors')
app.use(cors())

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Return all full albums (with their photos)
app.get("/albums", (req, res) => {
 
    let albums = [];
    let photos = [];

    axios
        .get("https://jsonplaceholder.typicode.com/albums")
        .then(resp => resp.data)
        .then(data => {
            albums = data; 
        })
        .then(
            axios
                .get("https://jsonplaceholder.typicode.com/photos")
                .then(resp => resp.data)
                .then(data => {
                    photos = data;

                    {albums.map(album => { album.photos = []; })}

                    {photos.map(photo => {
                        {albums.map(album => {
                            if (album.id === photo.albumId)
                                album.photos.push(photo);
                        })}
                    })}

                    res.json({ message: albums });
                })
        ); 
});

// Return all users id and an 'All' option
app.get("/users", (req, res) => {
 
    let usersId = [];

    axios
        .get("https://jsonplaceholder.typicode.com/albums")
        .then(resp => resp.data)
        .then(data => {
            usersId.push("All");

            {data.map(album => {
                if (usersId.indexOf(album.userId.toString()) === -1)
                    usersId.push(album.userId.toString());
            })}

            res.json({ message: usersId });
        });
});

// Return the full album of a selected user (with their photos)
app.get("/selectuser", (req, res) => {
 
    let sortedalbums = [];
    let albums = [];
    let photos = [];

    axios
        .get("https://jsonplaceholder.typicode.com/albums")
        .then(resp => resp.data)
        .then(data => {
            albums = data; 
        })
        .then(
            axios
                .get("https://jsonplaceholder.typicode.com/photos")
                .then(resp => resp.data)
                .then(data => {
                    photos = data;

                    {albums.map(album => { album.photos = []; })}

                    {photos.map(photo => {
                        {albums.map(album => {
                            if (album.id === photo.albumId)
                                album.photos.push(photo);
                        })}
                    })}

                    {albums.map(album => {
                        if(req.query.userid.toString() === "All" || album.userId.toString()=== req.query.userid.toString())
                            if (sortedalbums.indexOf(album) === -1)
                                sortedalbums.push(album);
                    })}
                    res.json({ message: sortedalbums });
                })
        ); 
});

// All other GET requests not handled before will return the React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});