import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // send & receive cookies
  timeout: 10000,
});

// Global response handling
axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.message || error.message || "Something went wrong";

    // Optional auto-logout
    // if (error.response?.status === 401 && typeof window !== "undefined") {
    //   window.location.href = "/admin/login";
    // }

    return Promise.reject(new Error(message));
  }
);

export default axiosClient;
