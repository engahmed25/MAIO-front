import { useQuery } from "@tanstack/react-query";
import { getPatientFilesByDoctorView } from "../../services/apiPatientFiles";

export function useGetPatientDocByDoctor(patientId) {
    const query = useQuery({
        queryKey: ["patientDocuments", patientId],
        queryFn: () => getPatientFilesByDoctorView(patientId),
        enabled: !!patientId, // Only run if patientId is provided
    });

    // Debug: Log API response
    console.log("==============================================");
    console.log("🔍 HOOK - useGetPatientDocByDoctor - Raw API Response:");
    console.log("patientId:", patientId);
    console.log("query.data (full response):", query.data);
    console.log("query.data?.data:", query.data?.data);
    console.log("query.data?.data?.medicalDocuments:", query.data?.data?.medicalDocuments);
    console.log("Extracted documents:", query.data?.data?.medicalDocuments || []);
    console.log("isLoading:", query.isLoading);
    console.log("error:", query.error);
    console.log("==============================================");

    return {
        documents: query.data?.data?.medicalDocuments || [],
        medicalDocuments: query.data?.data?.medicalDocuments || [],
        patientName: query.data?.data?.name || "",
        profilePicture: query.data?.data?.profilePicture || "",
        gender: query.data?.data?.gender || "",
        age: query.data?.data?.age || null,
        emergencyContactNumber: query.data?.data?.emergencyContactNumber || "",
        reasonForSeeingDoctor: query.data?.data?.reasonForSeeingDoctor || "",
        drugAllergies: query.data?.data?.drugAllergies || "",
        illnesses: query.data?.data?.illnesses || [],
        otherIllness: query.data?.data?.otherIllness || "",
        operations: query.data?.data?.operations || "",
        currentMedications: query.data?.data?.currentMedications || "",
        smoking: query.data?.data?.smoking || "",
        medicalHistory: query.data?.data?.medicalHistory || null,
        assignedDoctors: query.data?.data?.assignedDoctors || [],
        isLoading: query.isLoading,
        error: query.error,
        refetch: query.refetch,
    };
}
