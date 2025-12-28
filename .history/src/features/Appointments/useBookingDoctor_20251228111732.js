// to get doctor availability for booking appointments

import { useQuery } from "@tanstack/react-query";
import { getDoctorAvailability } from "../../services/apiDoctors";

export function useBookingDoctor(doctorId, date) {
    const { isLoading, data: availability, error } = useQuery({
        queryKey: ["doctorAvailability", doctorId, date],
        queryFn: () => getDoctorAvailability(doctorId, date),
        enabled: !!doctorId && !!date, // Only fetch if both doctorId and date are provided
    });

    return {
        isLoading,
        availability,
        error,
    };
}
