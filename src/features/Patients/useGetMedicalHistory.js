import { useQuery } from "@tanstack/react-query";
import { getMedicalRecords } from "../../services/apiPatientFiles";
import { useIsAuthenticated } from "react-auth-kit";

export function useGetMedicalHistory() {
    const isAuthenticated = useIsAuthenticated();

    const query = useQuery({
        queryKey: ["patientMedicalHistory"],
        queryFn: getMedicalRecords,
        enabled: isAuthenticated(), // Only run if user is authenticated
    });

    // Debug: Log API response for medical history
    console.log("==============================================");
    console.log("🔍 HOOK - useGetMedicalHistory - Raw API Response:");
    console.log("query.data (full response):", query.data);
    console.log("query.data?.data?.medicalHistory:", query.data?.data?.medicalHistory);
    console.log("isLoading:", query.isLoading);
    console.log("error:", query.error);
    console.log("==============================================");

    return {
        medicalHistory: query.data?.data?.medicalHistory || null,
        patientName: query.data?.data?.name || "",
        profilePicture: query.data?.data?.profilePicture || null,
        isLoading: query.isLoading,
        error: query.error,
        refetch: query.refetch,
    };
}
