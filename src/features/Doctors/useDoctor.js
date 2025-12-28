// to get all doctors

import { useQuery } from "@tanstack/react-query";
import { getDoctorById } from "../../services/apiDoctors";



export function useDoctor(id) {
    const { isLoading, data: doctor, error } = useQuery({
        queryKey: ["doctor", id],
        queryFn: () => getDoctorById(id),
    })

    return {
        isLoading,
        doctor,
        error,
    };
}
