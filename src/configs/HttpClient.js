import axios from 'axios';

const baseURL = 'http://localhost:8080';
// const baseURL = 'http://43.205.54.139:8080';

export const httpClient = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
    },

    withCredentials: axios.defaults.withCredentials = true
})

export default httpClient;
