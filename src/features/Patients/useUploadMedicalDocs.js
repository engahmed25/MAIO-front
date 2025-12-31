import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadMedicalDocument } from "../../services/patientFilesApi";
import toast from "react-hot-toast";

export function useUploadMedicalDocument() {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: ({ file, title }) => uploadMedicalDocument(file, title),

        onSuccess: (data) => {
            toast.success("Medical document uploaded successfully!");

            // Invalidate and refetch medical documents query
            queryClient.invalidateQueries(["medicalDocuments"]);

            console.log("Upload successful:", data);
        },

        onError: (error) => {
            toast.error(
                error.response?.data?.message ||
                error.message ||
                "Failed to upload medical document. Please try again."
            );
            console.error("Upload error:", error);
        },
    });

    return {
        uploadDocument: mutation.mutateAsync,
        isUploading: mutation.isPending,
        uploadError: mutation.error,
        uploadSuccess: mutation.isSuccess,
    };
}