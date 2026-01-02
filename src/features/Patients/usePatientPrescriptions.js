import { useQuery } from "@tanstack/react-query";
import { getPatientPrescriptions } from "../../services/apiPatients";

export function usePatientPrescriptions() {
    const { data, isLoading, error } = useQuery({
        queryKey: ["patient-prescriptions"],
        queryFn: getPatientPrescriptions,
    });

    return {
        prescriptions: data?.data?.prescriptions || [],
        statistics: data?.data?.statistics || null,
        patientInfo: data?.data?.patientInfo || null,
        isLoading,
        error,
    };
}
