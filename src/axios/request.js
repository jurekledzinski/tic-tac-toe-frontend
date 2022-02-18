import axios from 'axios';

const request = axios.create({
  validateStatus: false,
  withCredentials: true,
  baseURL: process.env.API_KEY,
});

export default request;
