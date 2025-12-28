// to get all doctors

import { useQuery } from "@tanstack/react-query";
import { getDoctorByID } from "../../services/apiDoctors";



export function useOneDoctor(id) {
    const { isLoading, data: doctor, error } = useQuery({
        queryKey: ["doctors", id],
        queryFn: () => getDoctorByID(id),
    })

    return {
        isLoading,
        doctor,
        error,
    };
}