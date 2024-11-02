import axios from 'axios';

const API_BASE_URL = 'https://final-back-end-yevq.vercel.app';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Include this to allow cookies in requests
});

export default api;