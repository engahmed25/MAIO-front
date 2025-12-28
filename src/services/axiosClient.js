import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const axiosClient = axios.create({
    baseURL: backendURL,
    headers: {
        'Content-Type': 'application/json',
    }

});

//! we need to attach the token (from react auth kit) to each request if available
axiosClient.interceptors.request.use(config => {
    const token = localStorage.getItem("accessToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
})

export default axiosClient;