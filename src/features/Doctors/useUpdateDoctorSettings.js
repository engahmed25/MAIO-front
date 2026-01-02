import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateDoctorSettings } from "../../services/apiDoctors";
import toast from "react-hot-toast";

export function useUpdateDoctorSettings() {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (data) => updateDoctorSettings(data),

        onSuccess: (data) => {
            toast.success("Profile updated successfully!");

            // Invalidate and refetch doctor settings query
            queryClient.invalidateQueries(["doctorSettings"]);

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
