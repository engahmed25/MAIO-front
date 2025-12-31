import { useQuery } from "@tanstack/react-query";
import { getPatientFiles } from "../../services/patientFilesApi";
import { useIsAuthenticated } from "react-auth-kit";

export function useGetPatientFiles() {
    const isAuthenticated = useIsAuthenticated();

    const query = useQuery({
        queryKey: ["patientFiles"],
        queryFn: getPatientFiles, // ✅ Token handled by interceptor
        enabled: isAuthenticated(), // Only run if user is authenticated
    });

    return {
        files: query.data?.files || [],
        isLoading: query.isLoading,
        error: query.error,
    };
}