import { useQuery } from "@tanstack/react-query";
import { getDoctorsByPatient } from "../../services/apiPatients";
import { useIsAuthenticated } from "react-auth-kit";

export function useDoctorsByPatient() {
    const isAuthenticated = useIsAuthenticated();

    const query = useQuery({
        queryKey: ["patientAppointments"],
        queryFn: getDoctorsByPatient,
        enabled: isAuthenticated(), // Only run if user is authenticated
        retry: 1,
        retryDelay: 1000,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });

    console.log("🔴 useDoctorsByPatient HOOK - Raw query.data:", query.data);
    console.log("🔴 query.data?.data:", query.data?.data);
    if (query.data?.data?.[0]) {
        console.log("🔴 First appointment from API:", query.data.data[0]);
        console.log("🔴 First appointment keys:", Object.keys(query.data.data[0]));
    }

    return {
        appointments: query.data?.data || [],
        isLoading: query.isLoading,
        error: query.error,
    };
}
