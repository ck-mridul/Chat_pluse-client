import axios from 'axios';

const baseURL = 'http://127.0.0.1:8000'

export const axiosInstance = axios.create({
  baseURL: `${baseURL}/api`
});

const axiosAuth = axios.create({
    baseURL: `${baseURL}/api`
})

axiosAuth.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken'); 

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; 
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosAuth;
