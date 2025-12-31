import { useQuery } from "@tanstack/react-query";
import { getDoctorsByPatient } from "../../services/apiPatients";
import { useIsAuthenticated } from "react-auth-kit";

export function useDoctorsByPatient() {
    const isAuthenticated = useIsAuthenticated();

    const query = useQuery({
        queryKey: ["patientAppointments"],
        queryFn: getDoctorsByPatient,
        enabled: isAuthenticated(), // Only run if user is authenticated
    });

    return {
        appointments: query.data?.data || [],
        isLoading: query.isLoading,
        error: query.error,
    };
}
