import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePrescription } from "../../services/apiDoctors";
import toast from "react-hot-toast";

export function useUpdatePrescription() {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: ({ patientId, prescriptionId, prescriptionData }) =>
            updatePrescription(patientId, prescriptionId, prescriptionData),

        onSuccess: (data) => {
            toast.success("Prescription updated successfully!");

            // Invalidate prescriptions query to refetch
            queryClient.invalidateQueries(["prescriptions"]);

            console.log("Prescription updated:", data);
        },

        onError: (error) => {
            toast.error(
                error.response?.data?.message ||
                error.message ||
                "Failed to update prescription. Please try again."
            );
            console.error("Prescription update error:", error);
        },
    });

    return {
        updatePrescription: mutation.mutate,
        isUpdating: mutation.isPending,
        error: mutation.error,
    };
}
