import axios from 'axios';

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

httpClient.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    // Envoi du token partout sauf sur le login
    if (config.url != "/auth/login") {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  }
);

httpClient.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    switch (error.response?.status) {
      case 401:
        return Promise.reject("Connexion failed, please refresh the page and retry. " + error);
      case 403:
        return Promise.reject("You don't have the permission to do that action. " + error);
      default:
        return Promise.reject("Oops, something went wrong..." + error);
    }
  }
)