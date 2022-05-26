import { useState } from "react";
import { useEffect } from 'react';
import {API_URL_ALBUMS} from '../utils/module';
import axios from "axios";


export function useAllAlbums() {

    //State vars
    const [allAlbums, setAllAlbums] = useState([]);
    
    //Runs once
    useEffect(() => {

        var configGetAlbums = {
            method: 'get',
            url: API_URL_ALBUMS
        };


        axios(configGetAlbums)
            .then(function (response) {
                setAllAlbums(response.data.message);
            })
            .catch(function (error) {
                console.log(error);
            });

    }, []);

    return allAlbums;
} 