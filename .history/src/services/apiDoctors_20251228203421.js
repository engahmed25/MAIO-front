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
export async function createReservation(doctorId, date, startTime, endTime) {
    try {
        const res = await axiosClient.post(`${backendURL}/api/reservations`, {
            doctorId,
            date,
            startTime,
            endTime
        });
        return res.data;
    } catch (error) {
        throw error;
    }
}





/*
get all doctors
get doctor by id
get doctors by specialization
get doctors by name
*/
