// For all patient data 

import axiosClient from "./axiosClient";
const backendURL = import.meta.env.VITE_BACKEND_URL;

// Get upcoming appointments with doctors for the current patient
export async function getDoctorsByPatient() {
    const response = await axiosClient.get(`${backendURL}/api/patients/me/appointments/upcoming`);
    return response.data;
}

// Get current patient profile/settings
export async function getPatientSettings() {
    const response = await axiosClient.get(`${backendURL}/api/patients/me`);
    return response.data;
}

// Update current patient profile/settings
export async function updatePatientSettings(data) {
    const response = await axiosClient.patch(`${backendURL}/api/patients/me`, data);
    return response.data;
}

// Update patient profile picture
export async function updatePatientProfilePicture(file) {
    const formData = new FormData();
    formData.append("profilePicture", file);

    const response = await axiosClient.patch(
        `${backendURL}/api/patients/me/profile-picture`,
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }
    );
    return response.data;
}

// Reschedule an existing appointment
export async function rescheduleAppointment({ appointmentId, newDate, newStartTime, newEndTime }) {
    const response = await axiosClient.put(
        `${backendURL}/api/appointments/${appointmentId}/reschedule`,
        {
            newDate,
            newStartTime,
            newEndTime
        }
    );
    return response.data;
}

// Get patient public profile by ID
export async function getPatientPublicProfile(patientId) {
    const response = await axiosClient.get(`${backendURL}/api/patients/${patientId}/public`);
    return response.data;
}

// Get all doctors associated with a patient
export async function getPatientDoctors(patientId) {
    const response = await axiosClient.get(`${backendURL}/api/doctors/patients/${patientId}/doctors`);
    return response.data;
}

// Get patient's prescriptions
export async function getPatientPrescriptions() {
    const response = await axiosClient.get(`${backendURL}/api/patients/me/prescriptions`);
    return response.data;
}
