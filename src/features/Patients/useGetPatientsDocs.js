import { useQuery } from "@tanstack/react-query";
import { getMedicalRecords, getPatientFilesByDoctorView } from "../../services/apiPatientFiles";
import { useIsAuthenticated } from "react-auth-kit";

export function useGetPatientsDocs(patientId = null) {
    const isAuthenticated = useIsAuthenticated();

    // If patientId is provided, use doctor view endpoint, otherwise use patient's own records
    const queryFn = patientId
        ? () => getPatientFilesByDoctorView(patientId)
        : getMedicalRecords;

    const query = useQuery({
        queryKey: patientId ? ["patientMedicalDocuments", patientId] : ["patientMedicalRecords"],
        queryFn: queryFn,
        enabled: isAuthenticated() && (patientId ? !!patientId : true), // Only run if user is authenticated
        retry: 1,
        retryDelay: 1000,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });

    // Debug: Log API response
    console.log("==============================================");
    console.log("🔍 HOOK - useGetPatientsDocs - Raw API Response:");
    console.log("patientId:", patientId);
    console.log("query.data (full response):", query.data);
    console.log("query.data?.data:", query.data?.data);
    console.log("query.data?.data?.medicalDocuments:", query.data?.data?.medicalDocuments);
    console.log("Extracted medicalDocuments:", query.data?.data?.medicalDocuments || query.data?.data || []);
    console.log("isLoading:", query.isLoading);
    console.log("error:", query.error);
    console.log("==============================================");

    // Handle both response formats: 
    // - Patient's own records: { data: { medicalDocuments: [...], name, profilePicture } }
    // - Doctor viewing patient: { data: [...] }
    const medicalDocuments = patientId
        ? (query.data?.data || [])
        : (query.data?.data?.medicalDocuments || []);

    return {
        medicalDocuments: medicalDocuments,
        medicalHistory: query.data?.data?.medicalHistory || null,
        patientName: query.data?.data?.name || "",
        profilePicture: query.data?.data?.profilePicture || "",
        isLoading: query.isLoading,
        error: query.error,
        refetch: query.refetch,
    };
}
