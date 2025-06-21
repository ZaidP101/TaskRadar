import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://server:3000',
  withCredentials: true, 
});

export default instance;
