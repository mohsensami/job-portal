import axios from "axios";

const baseURL =
  import.meta.env.VITE_BASE_URL || "https://job-portal-j3fi.onrender.com";
const axiosInstance = axios.create({
  baseURL,
  // timeout: 5000, // Optional timeout value in milliseconds
  withCredentials: true, // برای ارسال کوکی‌ها
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      const parsedUserInfo = JSON.parse(userInfo);
      console.log(parsedUserInfo);
      const token = parsedUserInfo?.token;
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
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
