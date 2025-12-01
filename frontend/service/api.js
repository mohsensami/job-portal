import axios from "axios";

const apiURL =
  import.meta.env.VITE_BASE_URL ||
  "http://localhost:8000" ||
  "https://job-portal-backend.vercel.app";

const axiosInstance = axios.create({
  baseURL: apiURL,
  // timeout: 5000, // Optional timeout value in milliseconds
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    console.log(token);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  async (response) => {
    return response;
  },
  (error) => {
    // toast.error(error.message);

    return Promise.reject(error);
  }
);

export default axiosInstance;
