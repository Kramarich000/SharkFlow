import axios from 'axios';

export const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://taskflow-api-gavu.onrender.com'
    : 'http://localhost:8080';

export const api = axios.create({
  baseURL,
  withCredentials: true,
});

export const refreshClient = axios.create({
  baseURL,
  withCredentials: true,
  validateStatus: () => true,
});
