import { useQuery } from "@tanstack/react-query";
import { getDoctorInfo } from "../../services/apiDoctors";

export function useDoctorInfo() {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["doctorInfo"],
        queryFn: getDoctorInfo,

        retry: 2,
    });

    console.log("🔍 useDoctorInfo - raw data:", data);
    console.log("🔍 useDoctorInfo - isLoading:", isLoading);
    console.log("🔍 useDoctorInfo - error:", error);

    return {
        doctorInfo: data?.data || null,
        isLoading,
        error,
        refetch,
    };
}
