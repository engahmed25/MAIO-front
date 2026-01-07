import { useQuery } from "@tanstack/react-query";
import { getDoctorSettings } from "../../services/apiDoctors";
import { useIsAuthenticated } from "react-auth-kit";

export function useDoctorSettings() {
    const isAuthenticated = useIsAuthenticated();

    const query = useQuery({
        queryKey: ["doctorSettings"],
        queryFn: getDoctorSettings,
        enabled: isAuthenticated(), // Only run if user is authenticated
    });

    return {
        doctorData: query.data?.data || null,
        isLoading: query.isLoading,
        error: query.error,
        refetch: query.refetch,
    };
}
