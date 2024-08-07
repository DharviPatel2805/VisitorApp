import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL_COFFEE,
  withCredentials: true // Ensure cookies are sent with requests
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Attach the access token to the headers
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      // Token might have expired, attempt to refresh it
      originalRequest._retry = true;
      try {
        await axiosInstance.post(`${process.env.REACT_APP_API_URL_COFFEE}/api/auth/refresh-token`); 
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token error:", refreshError);
        localStorage.removeItem("token");
        localStorage.removeItem("visitor");
        window.location.href = '/';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
