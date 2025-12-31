// For all patient data 

import axiosClient from "./axiosClient";
const backendURL = import.meta.env.VITE_BACKEND_URL;

// Get upcoming appointments with doctors for the current patient
export async function getDoctorsByPatient() {
    const response = await axiosClient.get(`${backendURL}/api/patients/me/appointments/upcoming`);
    return response.data;
}

