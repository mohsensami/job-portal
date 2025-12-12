import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:8000";
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
      try {
        const parsedUserInfo = JSON.parse(userInfo);
        const token = parsedUserInfo?.token;
        if (token) {
          config.headers["Authorization"] = `${token}`;
          // Debug log (remove in production)
          console.log("Token added to request:", {
            url: config.url,
            hasToken: !!token,
            tokenLength: token?.length,
          });
        } else {
          console.warn("Token not found in userInfo", parsedUserInfo);
        }
      } catch (error) {
        console.error("Error parsing userInfo from localStorage:", error);
      }
    } else {
      console.warn("userInfo not found in localStorage");
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
    // Log 401 errors for debugging
    if (error.response?.status === 401) {
      console.error("401 Unauthorized:", {
        url: error.config?.url,
        message: error.response?.data?.error || error.message,
        hasToken: !!error.config?.headers?.Authorization,
      });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
