import axios from 'axios';

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

httpClient.interceptors.request.use(
  function (config) {
    console.log("PROUUUT !");
    return config;
  }
);