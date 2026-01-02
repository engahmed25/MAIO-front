import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePatientSettings } from "../../services/apiPatients";
import toast from "react-hot-toast";

export function useUpdatePatientSettings() {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (data) => updatePatientSettings(data),

        onSuccess: (data) => {
            toast.success("Profile updated successfully!");

            // Invalidate and refetch patient settings query
            queryClient.invalidateQueries(["patientSettings"]);

            console.log("Update successful:", data);
        },

        onError: (error) => {
            toast.error(
                error.response?.data?.message ||
                error.message ||
                "Failed to update profile. Please try again."
            );
            console.error("Update error:", error);
        },
    });

    return {
        updateSettings: mutation.mutateAsync,
        isUpdating: mutation.isPending,
        updateError: mutation.error,
        updateSuccess: mutation.isSuccess,
    };
}
