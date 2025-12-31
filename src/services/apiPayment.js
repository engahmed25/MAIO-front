// For all payment and reservation data
import axiosClient from "./axiosClient";

const backendURL = import.meta.env.VITE_BACKEND_URL;

// Get reservation/appointment details by ID
export async function getReservationDetails(reservationId) {
    try {
        const res = await axiosClient.get(`${backendURL}/api/reservations/${reservationId}`);
        return res.data;
    } catch (error) {
        throw error;
    }
}
