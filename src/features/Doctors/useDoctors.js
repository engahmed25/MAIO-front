// to get all doctors

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getDoctors } from "../../services/apiDoctors";



export function useDoctors(searchParams = {}) {
    const { isLoading, data: doctors, error } = useQuery({
        queryKey: ["doctors", searchParams],
        queryFn: () => getDoctors(searchParams),
    })

    return {
        isLoading,
        doctors,
        error,
    };
}