import { useQuery } from "@tanstack/react-query";
import { getPatientPrescriptions } from "../../services/apiPatients";

export function usePatientPrescriptions() {
    const { data, isLoading, error } = useQuery({
        queryKey: ["patient-prescriptions"],
        queryFn: getPatientPrescriptions,
        retry: 1, // Only retry once
        retryDelay: 1000, // Wait 1 second before retry
        staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
        gcTime: 10 * 60 * 1000, // Keep in cache for 10 minutes
    });

    return {
        prescriptions: data?.data?.prescriptions || [],
        statistics: data?.data?.statistics || null,
        patientInfo: data?.data?.patientInfo || null,
        isLoading,
        error,
    };
}
