import { useQuery } from "@tanstack/react-query";
import { getPatientPrescriptions } from "../../services/apiDoctors";

export function usePatientPrescriptions(patientId) {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["prescriptions", patientId],
        queryFn: () => getPatientPrescriptions(patientId),
        enabled: !!patientId, // Only run if patientId exists
    });

    return {
        prescriptions: data?.data?.prescriptions || [],
        statistics: data?.data?.statistics || null,
        patientInfo: data?.data?.patientInfo || null,
        isLoading,
        error,
        refetch,
    };
}
