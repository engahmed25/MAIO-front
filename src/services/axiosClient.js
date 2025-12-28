import axios from "axios";


const axiosClient = axios.create({
    baseURL: 'https://api.freeapi.app/api/v1',
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