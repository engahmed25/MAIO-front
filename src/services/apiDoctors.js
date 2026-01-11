// For all doctor data 
import axios from "axios";
import axiosClient from "./axiosClient";

const backendURL = import.meta.env.VITE_BACKEND_URL;
const doctorsAPI = `/api/doctors/search`;

// Get all doctors or search with filters
export async function getDoctors(searchParams = {}) {
    try {
        const params = new URLSearchParams();

        if (searchParams.q) params.append('q', searchParams.q);
        if (searchParams.specialization) params.append('specialization', searchParams.specialization);
        if (searchParams.minPrice) params.append('minPrice', searchParams.minPrice);
        if (searchParams.maxPrice) params.append('maxPrice', searchParams.maxPrice);
        if (searchParams.location) params.append('location', searchParams.location);

        const queryString = params.toString();
        const url = queryString ? `${backendURL}${doctorsAPI}?${queryString}` : `${backendURL}${doctorsAPI}`;

        const res = await axios.get(url);
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

// Get doctor by ID
export async function getDoctorById(id) {
    try {
        const res = await axiosClient.get(`${backendURL}/api/doctors/${id}`);
        return res.data;
    } catch (error) {
        throw error;
    }
}

// Get doctor availability for a specific date
export async function getDoctorAvailability(doctorId, date) {
    try {
        const res = await axiosClient.get(`${backendURL}/api/doctors/${doctorId}/availability?date=${date}`);
        return res.data;
    } catch (error) {
        throw error;
    }
}

// Get available days for a specific doctor
export async function getDoctorAvailableDays(doctorId) {
    try {
        const res = await axiosClient.get(`${backendURL}/api/doctors/${doctorId}/availableDays`);
        return res.data;
    } catch (error) {
        throw error;
    }
}

// Create a reservation/booking
export async function createReservation(doctorId, date, startTime, endTime, reasonForVisit) {
    try {
        const res = await axiosClient.post(`${backendURL}/api/reservations`, {
            doctorId,
            date,
            startTime,
            endTime,
            reasonForVisit
        });
        return res.data;
    } catch (error) {
        throw error;
    }
}

// Get doctor's appointments for a specific date
export async function getDoctorAppointmentsByDate(date) {
    try {
        const res = await axiosClient.get(`${backendURL}/api/doctors/me/appointments/date/${date}`);
        return res.data;
    } catch (error) {
        throw error;
    }
}

// Get current doctor's info
export async function getDoctorInfo() {
    try {
        const res = await axiosClient.get(`${backendURL}/api/doctors/me`);
        return res.data;
    } catch (error) {
        throw error;
    }
}

// Get patients under care of the current doctor
export async function getPatientsByDoctor() {
    try {
        // Fetch with a higher limit to ensure we get all patients
        const res = await axiosClient.get(`${backendURL}/api/doctors/me/patients?limit=100`);
        console.log("✅ getPatientsByDoctor response:", res.data);
        return res.data;
    } catch (error) {
        console.error("❌ Error in getPatientsByDoctor:", error);
        console.error("❌ Error response:", error.response?.data);
        console.error("❌ Error status:", error.response?.status);
        throw error;
    }
}

// Get current doctor profile/settings
export async function getDoctorSettings() {
    const response = await axiosClient.get(`${backendURL}/api/doctors/me`);
    return response.data;
}

// Update current doctor profile/settings
export async function updateDoctorSettings(data) {
    const response = await axiosClient.patch(`${backendURL}/api/doctors/me`, data);
    return response.data;
}

// Update doctor profile picture
export async function updateDoctorProfilePicture(file) {
    const formData = new FormData();
    formData.append("profilePicture", file);

    const response = await axiosClient.patch(
        `${backendURL}/api/doctors/me/profile-picture`,
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }
    );
    return response.data;
}

// Create prescription for a patient
export async function createPrescription(patientId, prescriptionData) {
    const response = await axiosClient.post(
        `${backendURL}/api/doctors/patients/${patientId}/prescriptions`,
        prescriptionData
    );
    return response.data;
}

// Update prescription for a patient
export async function updatePrescription(patientId, prescriptionId, prescriptionData) {
    const response = await axiosClient.patch(
        `${backendURL}/api/doctors/patients/${patientId}/prescriptions/${prescriptionId}`,
        prescriptionData
    );
    return response.data;
}

// Get prescriptions for a patient
export async function getPatientPrescriptions(patientId) {
    const response = await axiosClient.get(
        `${backendURL}/api/doctors/patients/${patientId}/prescriptions`
    );
    return response.data;
}

/*
get all doctors
get doctor by id
get doctors by specialization
get doctors by name
*/
