import axios from "axios";
import { toast } from "sonner";

export const API_URL = 'https://chatribe-chat-application-backend.onrender.com/api';
// export const API_URL = 'http://localhost:8000/api';

export const WS_URL = 'wss://chatribe-chat-application-backend.onrender.com/ws';
// export const WS_URL = 'ws://localhost:8000/ws';


const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


const refreshToken = async () => {
  try {
    const refresh = localStorage.getItem('refresh_token');
    const response = await axios.post(`${API_URL}/user/token/refresh/`, {
      refresh: refresh,
    });
    console.log('newww token', response.data)
    const newAccessToken = response.data.access;
    const newRefreshToken = response.data.refresh;
    localStorage.setItem('access_token', newAccessToken);

    if (newRefreshToken) {
      localStorage.setItem('refresh_token', newRefreshToken);
    }
    return newAccessToken;
  } catch (error) {
    console.error('Refresh token expired or invalid');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('userId');
    toast.error('Session expired. Please login again.');
    window.location.href = '/login';
    return null;
  }
};


// Request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);



// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      error.response.data?.code === 'token_not_valid'
    ) {
      originalRequest._retry = true;

      const newAccessToken = await refreshToken();
      if (newAccessToken) {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;  
