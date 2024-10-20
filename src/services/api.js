import axios from 'axios';

const api = axios.create({
  baseURL: 'https://game-backend-omega.vercel.app/api',
});

export default api;
