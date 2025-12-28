// to get all doctors

import { useQuery } from "@tanstack/react-query";
import { getDoctors } from "../../services/apiDoctors";



export function useDoctors() {
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