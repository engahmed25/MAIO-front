import { useQuery } from "@tanstack/react-query";
import { getPatientSettings } from "../../services/apiPatients";
import { useIsAuthenticated } from "react-auth-kit";

export function usePatientSettings() {
    const isAuthenticated = useIsAuthenticated();

    const query = useQuery({
        queryKey: ["patientSettings"],
        queryFn: getPatientSettings,
        enabled: isAuthenticated(), // Only run if user is authenticated
    });

    return {
        patientData: query.data?.data || null,
        isLoading: query.isLoading,
        error: query.error,
        refetch: query.refetch,
    };
}
