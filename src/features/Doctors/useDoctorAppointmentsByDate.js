import { useQuery } from "@tanstack/react-query";
import { getDoctorAppointmentsByDate } from "../../services/apiDoctors";

export function useDoctorAppointmentsByDate(date) {
    // Format date to YYYY-MM-DD
    const formattedDate = date
        ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
            2,
            "0"
        )}-${String(date.getDate()).padStart(2, "0")}`
        : null;

    const {
        data,
        isLoading,
        error,
        refetch,
    } = useQuery({
        queryKey: ["doctorAppointments", formattedDate],
        queryFn: () => getDoctorAppointmentsByDate(formattedDate),
        enabled: !!formattedDate,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    return {
        appointments: data?.appointments || [],
        totalAppointments: data?.totalAppointments || 0,
        date: data?.date,
        isLoading,
        error,
        refetch,
    };
}
