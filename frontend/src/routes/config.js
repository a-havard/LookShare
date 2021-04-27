import axios from 'axios'

const conn = axios.create({
    baseURL: `http://${window.location.hostname}:8000`
});

export {conn};