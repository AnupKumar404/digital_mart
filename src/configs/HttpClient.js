import axios from 'axios';

export const httpClient = axios.create({
    baseURL: 'https://dailyveggies4u.com',
    headers: {
        'Content-Type': 'application/json',
    },

    withCredentials: axios.defaults.withCredentials = true
})

export default httpClient;
