import { useQuery } from "@tanstack/react-query";
import { getDoctorsBySpecialization } from "../../services/apiDoctors";

export function useDoctorSpeciality(specialization) {
    const {
        isLoading,
        data: doctors,
        error,
    } = useQuery({
        queryKey: ["doctors", specialization],
        queryFn: () => getDoctorsBySpecialization(specialization),
        enabled: !!specialization,
    });

    return {
        isLoading,
        doctors,
        error,
    };
}
