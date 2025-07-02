import axios from 'axios';

const cloudinaryApi = axios.create({
  withCredentials: false,
});

export default cloudinaryApi;
