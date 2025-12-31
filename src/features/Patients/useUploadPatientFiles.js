// import { useState } from "react";
// import { uploadPatientFiles } from "../../services/apiPatientFiles";

// export function useUploadPatientFiles() {
//     const [isUploading, setIsUploading] = useState(false);
//     const [uploadError, setUploadError] = useState(null);
//     const [uploadSuccess, setUploadSuccess] = useState(false);

//     const uploadFiles = async (patientId, files) => {
//         setIsUploading(true);
//         setUploadError(null);
//         setUploadSuccess(false);

//         try {
//             const response = await uploadPatientFiles(patientId, files);
//             setUploadSuccess(true);
//             setIsUploading(false);
//             return response;
//         } catch (error) {
//             setUploadError(
//                 error.response?.data?.message ||
//                 error.message ||
//                 "Failed to upload files"
//             );
//             setIsUploading(false);
//             throw error;
//         }
//     };

//     return {
//         uploadFiles,
//         isUploading,
//         uploadError,
//         uploadSuccess,
//     };
// }




import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { uploadPatientFiles } from "../../services/apiPatientFiles";

export function useUploadPatientFiles() {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: uploadPatientFiles, // ✅ Token handled by interceptor

        onSuccess: (data) => {
            toast.success("Files uploaded successfully!");

            // Invalidate and refetch patient files query
            queryClient.invalidateQueries(["patientFiles"]);

            console.log("Upload successful:", data);
        },

        onError: (error) => {
            toast.error(
                error.response?.data?.message ||
                error.message ||
                "Failed to upload files. Please try again."
            );
            console.error("Upload error:", error);
        },
    });

    return {
        uploadFiles: mutation.mutateAsync,
        isUploading: mutation.isPending,
        uploadError: mutation.error,
        uploadSuccess: mutation.isSuccess,
    };
}