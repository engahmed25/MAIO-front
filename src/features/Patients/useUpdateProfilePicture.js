import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePatientProfilePicture } from "../../services/apiPatients";
import toast from "react-hot-toast";

export function useUpdateProfilePicture() {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (file) => updatePatientProfilePicture(file),

        onSuccess: (data) => {
            toast.success("Profile picture updated successfully!");

            // Invalidate and refetch patient settings query
            queryClient.invalidateQueries(["patientSettings"]);

            console.log("Profile picture update successful:", data);
        },

        onError: (error) => {
            toast.error(
                error.response?.data?.message ||
                error.message ||
                "Failed to update profile picture. Please try again."
            );
            console.error("Profile picture update error:", error);
        },
    });

    return {
        updateProfilePicture: mutation.mutateAsync,
        isUpdatingPicture: mutation.isPending,
        updatePictureError: mutation.error,
        updatePictureSuccess: mutation.isSuccess,
    };
}
