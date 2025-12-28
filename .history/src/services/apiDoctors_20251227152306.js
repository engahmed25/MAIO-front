// // For all doctor data 

// import axios from "axios";

// const API_URL = "http://localhost:5000/api/doctors";


// For all doctor data 

import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const doctorsAPI = "/api/doctors/search";
export async function getDoctors() {
    try {
        const res = await axios.get(`${backendURL}${doctorsAPI}`,);
        return res.data;
    } catch (error) {
        throw error;
    }
}

// Get doctors by specialization
export async function getDoctorsBySpecialization(specialization) {
    try {
        const res = await axios.get(`${backendURL}${doctorsAPI}?specialization=${specialization}`, {
        });
        return res.data;
    } catch (error) {
        throw error;
    }
}