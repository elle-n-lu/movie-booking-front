import axios from 'axios';

export const api_url = axios.create({
    baseURL: 'http://127.0.0.1:5000'
  })
