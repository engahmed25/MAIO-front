// Hook to get patients under care of the current doctor

import { useQuery } from "@tanstack/react-query";
import { getPatientsByDoctor } from "../../services/apiDoctors";

export function usePatientsByDoctor() {
    const { isLoading, data, error } = useQuery({
        queryKey: ["patientsByDoctor"],
        queryFn: getPatientsByDoctor,
    });

    return {
        isLoading,
        patients: data?.patients || [],
        totalPatients: data?.totalPatients || 0,
        pagination: data?.pagination || null,
        error,
    };
}
