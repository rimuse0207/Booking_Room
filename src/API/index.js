import axios from 'axios';

export const request = axios.create({
    baseURL: process.env.REACT_APP_DB_HOST,
    headers: { Authorization: localStorage.getItem('Login_token') },
});
