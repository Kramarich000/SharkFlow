import axios from 'axios';

console.log('API_VERSION:', import.meta.env.VITE_API_VERSION);
export const baseURL =
  process.env.NODE_ENV === 'production'
    ? `https://sharkflow-api.onrender.com${import.meta.env.VITE_API_VERSION}`
    : `http://localhost:8080${import.meta.env.VITE_API_VERSION}`;

export const api = axios.create({
  baseURL,
  withCredentials: true,
});

export const refreshClient = axios.create({
  baseURL,
  withCredentials: true,
  validateStatus: () => true,
});
