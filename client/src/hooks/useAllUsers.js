import { useState } from "react";
import { useEffect } from 'react';
import {API_URL_USERS} from '../utils/module';
import axios from "axios";


export function useAllUsers() {

    //State vars
    const [allUsers, setAllUsers] = useState([]);
    
    //Runs once
    useEffect(() => {

        var configGetUsers = {
            method: 'get', 
            url: API_URL_USERS
        };
 
        axios(configGetUsers)
            .then(function (response) {
                setAllUsers(response.data.message);
            })
            .catch(function (error) {
                console.log(error);
            });

    }, []);

    return allUsers;
} 