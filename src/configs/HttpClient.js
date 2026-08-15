import axios from 'axios';

// const baseURL = 'http://localhost:8080';
const baseURL = 'http://dailyveggies4u.com';

export const httpClient = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
    },

    withCredentials: axios.defaults.withCredentials = true
})

export default httpClient;
