// 


import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const axiosClient = axios.create({
    baseURL: backendURL,
    timeout: 10000, // 10 seconds timeout
    headers: {
        'Content-Type': 'application/json',
    }
});

// ✅ Helper function to get cookie value
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

// ✅ Add request interceptor to attach token from react-auth-kit
axiosClient.interceptors.request.use(
    (config) => {
        // Get token from react-auth-kit cookie
        const token = getCookie("_auth");

        if (token) {
            // Add Bearer token to Authorization header
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosClient;