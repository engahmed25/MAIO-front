import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPrescription } from "../../services/apiDoctors";
import toast from "react-hot-toast";

export function useCreatePrescription() {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: ({ patientId, prescriptionData }) =>
            createPrescription(patientId, prescriptionData),

        onSuccess: (data) => {
            toast.success("Prescription added successfully!");

            // Invalidate prescriptions query if you have one
            queryClient.invalidateQueries(["prescriptions"]);

            console.log("Prescription created:", data);
        },

        onError: (error) => {
            toast.error(
                error.response?.data?.message ||
                error.message ||
                "Failed to add prescription. Please try again."
            );
            console.error("Prescription creation error:", error);
        },
    });

    return {
        createPrescription: mutation.mutate,
        isCreating: mutation.isPending,
        error: mutation.error,
    };
}
