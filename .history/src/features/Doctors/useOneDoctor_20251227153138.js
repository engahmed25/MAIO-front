// to get all doctors

import { useQuery } from "@tanstack/react-query";
import { getDoctorByID } from "../../services/apiDoctors";



export function useOneDoctors() {
    const { isLoading, data: doctors, error } = useQuery({
        queryKey: ["doctors"],
        queryFn: getDoctors,
    })

    return {
        isLoading,
        doctors,
        error,
    };
}