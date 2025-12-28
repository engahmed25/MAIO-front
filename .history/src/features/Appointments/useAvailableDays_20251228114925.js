// to get available days for a specific doctor

import { useQuery } from "@tanstack/react-query";
import { getDoctorAvailableDays } from "../../services/apiDoctors";

export function useAvailableDays(doctorId) {
    const { isLoading, data: availableDays, error } = useQuery({
        queryKey: ["availableDays", doctorId],
        queryFn: () => getDoctorAvailableDays(doctorId),
        enabled: !!doctorId, // Only fetch if doctorId is provided
    });

    return {
        isLoading,
        availableDays,
        error,
    };
}
