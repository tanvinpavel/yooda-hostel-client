import axios from "axios";

const serverUrl = 'http://localhost:5050';

export default axios.create({ 
    baseURL: serverUrl
});

export const axiosPrivate = axios.create({
    baseURL: serverUrl,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});