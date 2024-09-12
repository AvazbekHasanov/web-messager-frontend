import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://10.20.11.66:3000/api/',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

export default axiosInstance;
