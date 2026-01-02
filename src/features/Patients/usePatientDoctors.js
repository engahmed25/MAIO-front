import { useQuery } from "@tanstack/react-query";
import { getPatientDoctors } from "../../services/apiPatients";

export function usePatientDoctors(patientId) {
    const query = useQuery({
        queryKey: ["patientDoctors", patientId],
        queryFn: () => getPatientDoctors(patientId),
        enabled: !!patientId, // Only run if patientId exists
    });

    return {
        doctors: query.data?.data || [],
        isLoading: query.isLoading,
        error: query.error,
        refetch: query.refetch,
    };
}
