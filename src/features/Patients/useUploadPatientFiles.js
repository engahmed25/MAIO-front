import { useState } from "react";
import { uploadPatientFiles } from "../../services/apiPatientFiles";

export function useUploadPatientFiles() {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState(null);
    const [uploadSuccess, setUploadSuccess] = useState(false);

    const uploadFiles = async (patientId, files) => {
        setIsUploading(true);
        setUploadError(null);
        setUploadSuccess(false);

        try {
            const response = await uploadPatientFiles(patientId, files);
            setUploadSuccess(true);
            setIsUploading(false);
            return response;
        } catch (error) {
            setUploadError(
                error.response?.data?.message ||
                error.message ||
                "Failed to upload files"
            );
            setIsUploading(false);
            throw error;
        }
    };

    return {
        uploadFiles,
        isUploading,
        uploadError,
        uploadSuccess,
    };
}
