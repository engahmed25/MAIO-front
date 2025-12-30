// to get appointment summary from reservation details

import { useQuery } from "@tanstack/react-query";
import { getReservationDetails } from "../../services/apiPayment";

export function useAppointmentsSummary(reservationId) {
    const { isLoading, data: appointmentData, error } = useQuery({
        queryKey: ["appointmentSummary", reservationId],
        queryFn: async () => {
            const response = await getReservationDetails(reservationId);
            
            // Transform the API response to match appointmentInfo structure
            if (response?.reservation) {
                const res = response.reservation;
                return {
                    drName: `${res.doctorId.firstName} ${res.doctorId.lastName}`,
                    speciality: res.doctorId.specialization,
                    date: new Date(res.appointmentDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    }),
                    time: `${res.startTime} - ${res.endTime}`,
                    clinicName: "Clinic",
                    clinicLocation: res.doctorId.clinicAddress,
                    price: res.amount,
                    appointmentCode: res.appointmentCode,
                    reservationId: res._id,
                };
            }
            return null;
        },
        enabled: !!reservationId,
    });

    return {
        isLoading,
        appointmentInfo: appointmentData,
        error,
    };
}
