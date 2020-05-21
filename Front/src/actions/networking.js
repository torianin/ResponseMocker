import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.BASE_URL,
  headers: { Authorization: `Bearer ${localStorage.access_token}` },
  timeout: 1000,
});
