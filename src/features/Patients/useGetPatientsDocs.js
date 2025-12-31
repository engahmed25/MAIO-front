import { useQuery } from "@tanstack/react-query";
import { getMedicalRecords } from "../../services/apiPatientFiles";
import { useIsAuthenticated } from "react-auth-kit";

export function useGetPatientsDocs() {
    const isAuthenticated = useIsAuthenticated();

    const query = useQuery({
        queryKey: ["patientMedicalRecords"],
        queryFn: getMedicalRecords,
        enabled: isAuthenticated(), // Only run if user is authenticated
    });

    // Debug: Log API response
    console.log("==============================================");
    console.log("🔍 HOOK - useGetPatientsDocs - Raw API Response:");
    console.log("query.data (full response):", query.data);
    console.log("query.data?.data:", query.data?.data);
    console.log("query.data?.data?.medicalDocuments:", query.data?.data?.medicalDocuments);
    console.log("Extracted medicalDocuments:", query.data?.data?.medicalDocuments || []);
    console.log("isLoading:", query.isLoading);
    console.log("error:", query.error);
    console.log("==============================================");

    return {
        medicalDocuments: query.data?.data?.medicalDocuments || [],
        medicalHistory: query.data?.data?.medicalHistory || null,
        patientName: query.data?.data?.name || "",
        profilePicture: query.data?.data?.profilePicture || "",
        isLoading: query.isLoading,
        error: query.error,
        refetch: query.refetch,
    };
}
