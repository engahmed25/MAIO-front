// For all payment and reservation data
import axiosClient from "./axiosClient";
const backendURL = import.meta.env.VITE_BACKEND_URL;
// Create a reservation (locks slot for 10 minutes)
export async function createReservation({
    doctorId,
    date,
    startTime,
    endTime,
    reasonForVisit,
}) {
    const res = await axiosClient.post(`${backendURL}/api/reservations`, {
        doctorId,
        date,
        startTime,
        endTime,
        reasonForVisit,
    });
    return res.data;
}

// Get reservation/appointment details by ID
export async function getReservationDetails(reservationId) {
    const res = await axiosClient.get(`${backendURL}/api/reservations/${reservationId}`);
    return res.data;
}

// Create Stripe PaymentIntent for a reservation
export async function createPaymentIntent(reservationId) {
  const res = await axiosClient.post(`${backendURL}/api/payments/intent`, {
    reservationId,
  });
  return res.data?.data;
}

// Confirm a successful PaymentIntent and finalize booking
export async function confirmPaymentIntent({ reservationId, paymentIntentId }) {
    const res = await axiosClient.post(`${backendURL}/api/payments/confirm`, {
        reservationId,
        paymentIntentId,
    });
    return res.data?.data;
}

// Fetch authenticated patient's upcoming appointments
export async function getUpcomingAppointments() {
    const res = await axiosClient.get(`${backendURL}/api/patients/me/appointments/upcoming`);
    return res.data?.data;
}

// Create payment intent
// // Create payment intent
// export async function createPaymentIntent({ price, reservationId }) {
//     try {
//         const res = await axiosClient.post(`${backendURL}/api/payments/intent`, {
//             price,
//             reservationId
//         });
//         return res.data;
//     } catch (error) {
//         throw error;
//     }
// }
