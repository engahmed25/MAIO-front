

import axiosClient from "./axiosClient";
async function signup(userData) {
    try {
        const response = await axiosClient.post('/users/register', userData);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export { signup };