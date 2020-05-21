import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 1000,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.access_token;
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});
