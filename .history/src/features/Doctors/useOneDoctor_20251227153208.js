// to get all doctors

import { useQuery } from "@tanstack/react-query";
import { getDoctorByID } from "../../services/apiDoctors";



export function useOneDoctors() {
    const { isLoading, data: oneDoctor, error } = useQuery({
        queryKey: ["oneDoctor"],
        queryFn: getDoctorByID,
    })

    return {
        isLoading,
        doctors,
        error,
    };
}