import axios from 'axios'

const conn = axios.create({
    baseURL: "http://localhost:8000"
});

export {conn};