import { useQuery } from "@tanstack/react-query";
import { getPatientPublicProfile } from "../../services/apiPatients";

export function usePatientPublicProfile(patientId) {
    const query = useQuery({
        queryKey: ["patientPublicProfile", patientId],
        queryFn: () => getPatientPublicProfile(patientId),
        enabled: !!patientId, // Only run if patientId exists
    });

    return {
        patient: query.data?.data || null,
        isLoading: query.isLoading,
        error: query.error,
    };
}
