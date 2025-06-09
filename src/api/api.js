import axios from 'axios';

const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://taskflow-api-gavu.onrender.com'
    : 'http://localhost:8080';

const api = axios.create({
  baseURL,
});

export default api;
