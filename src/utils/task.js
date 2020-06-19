import axios from 'axios';

const service = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'https://api.akii.me' : 'http://127.0.0.1:8181',
  timeout: 5000, // request timeout
});

export default service;
