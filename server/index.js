const path = require('path');
const express = require('express');
const PORT = process.env.PORT || 3001;
const axios = require('axios');
const app = express();
var cors = require('cors')
app.use(cors())

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Handle GET requests to /api route
app.get("/albums", (req, res) => {
 
    let albums = [];
    let photos = [];

    axios
        .get("https://jsonplaceholder.typicode.com/albums")
        .then(resp => resp.data)
        .then(data => {
            albums = data;

            // res.json({ message: albums });
            // console.log(albums);
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

                    // console.log(albums);
                })
        ); 
});

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
            // console.log(usersId);
        });
});

app.get("/selectuser", (req, res) => {
 
    let sortedalbums = [];
    let albums = [];
    let photos = [];

    axios
        .get("https://jsonplaceholder.typicode.com/albums")
        .then(resp => resp.data)
        .then(data => {
            albums = data;

            // res.json({ message: albums });
            // console.log(albums);
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

                    // console.log(albums);
                })
        ); 
           // console.log(req.query.userid.toString());
 
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});