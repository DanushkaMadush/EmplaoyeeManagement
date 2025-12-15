import axios from 'axios';

const httpClient = axios.create({
  baseURL: 'https://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default httpClient;
