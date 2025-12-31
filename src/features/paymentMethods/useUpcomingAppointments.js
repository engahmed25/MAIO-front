import { useQuery } from "@tanstack/react-query";
import { getUpcomingAppointments } from "../../services/apiPayment";

export function useUpcomingAppointments(enabled = true) {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["upcomingAppointments"],
        queryFn: () => getUpcomingAppointments(),
        enabled,
    });

    return {
        appointments: data,
        isLoading,
        error,
        refetch,
    };
}
