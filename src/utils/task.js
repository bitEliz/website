import axios from 'axios';

const service = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'https://api.akii.me' : 'http://127.0.0.1:8181',
  timeout: 5000, // request timeout
});

export default async (url = '', method = 'get', data = {}, headers = {}) => {
  try {
    const response = await service.request({
      url, method, data, headers,
    });

    return new Promise((resolver) => resolver(response.data));
  } catch (error) {
    throw new Error(error);
  }
};
