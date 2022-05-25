const path = require('path');
const express = require('express');
const PORT = process.env.PORT || 3001;
const axios = require('axios');
const app = express();
const mysql = require('mysql2');
var cors = require('cors')

const logger = require('./logger.js');
logger.info('Server logger started');

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const db = mysql.createPool({
    host: 'mysql_db', // the host name MYSQL_DATABASE: node_mysql
    user: 'MYSQL_USER', // database user MYSQL_USER: MYSQL_USER
    password: 'MYSQL_PASSWORD', // database user password MYSQL_PASSWORD: MYSQL_PASSWORD
    database: 'books' // database name MYSQL_HOST_IP: mysql_db
})


// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Return all full albums (with their photos)
app.get("/albums", (req, res) => {
 
    logger.info('GET request received: /albums');

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

                    { albums.map(album => { album.photos = []; }) }

                    {
                        photos.map(photo => {
                            {
                                albums.map(album => {
                                    if (album.id === photo.albumId)
                                        album.photos.push(photo);
                                })
                            }
                        })
                    }

                    res.json({ message: albums });
                })
        );
});

// Return the full album of a selected user (with their photos)
app.get("/albumsfiltered", (req, res) => {

    logger.info('GET request received: /albumsfiltered , params { userid: ' + req.query.userid + ' }');

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

                    { albums.map(album => { album.photos = []; }) }

                    {
                        photos.map(photo => {
                            {
                                albums.map(album => {
                                    if (album.id === photo.albumId)
                                        album.photos.push(photo);
                                })
                            }
                        })
                    }

                    {
                        albums.map(album => {
                            if (req.query.userid.toString() === "All" || album.userId.toString() === req.query.userid.toString())
                                if (sortedalbums.indexOf(album) === -1)
                                    sortedalbums.push(album);
                        })
                    }
                    res.json({ message: sortedalbums });
                })
        );
});

// Return all users id and an 'All' option
app.get("/users", (req, res) => {
 
    logger.info('GET request received: /users');

    let usersId = [];

    axios
        .get("https://jsonplaceholder.typicode.com/albums")
        .then(resp => resp.data)
        .then(data => {
            usersId.push("All");

            {
                data.map(album => {
                    if (usersId.indexOf(album.userId.toString()) === -1)
                        usersId.push(album.userId.toString());
                })
            }

            res.json({ message: usersId });
        });
});

// All other GET requests not handled before will return the React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});