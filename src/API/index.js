import axios from 'axios';

console.log(localStorage.getItem('Login_token'));

export const request = axios.create({
    baseURL: process.env.REACT_APP_DB_HOST,
    headers: { Authorization: localStorage.getItem('Login_token') },
});
