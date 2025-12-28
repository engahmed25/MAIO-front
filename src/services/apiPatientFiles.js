import axiosClient from "./axiosClient";

const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

/**
 * Upload patient files to the backend
 * @param {string} patientId - The ID of the patient
 * @param {Array} files - Array of file objects with metadata
 * @returns {Promise} - Response from the backend
 */
export async function uploadPatientFiles(patientId, files) {
    try {
        // ✅ CREATE FORMDATA
        const payload = new FormData();

        // Add patient ID
        payload.append("patientId", patientId);

        // ✅ ADD FILES
        // Each file in the array should have the actual File object
        files.forEach((fileData, index) => {
            if (fileData.file) {
                // Append the actual file
                payload.append("files", fileData.file);

                // Optionally append metadata for each file
                payload.append(`fileMetadata[${index}][name]`, fileData.name);
                payload.append(`fileMetadata[${index}][type]`, fileData.type);
                payload.append(`fileMetadata[${index}][uploadDate]`, fileData.uploadDate);

                if (fileData.requestedBy) {
                    payload.append(`fileMetadata[${index}][requestedBy]`, fileData.requestedBy);
                }
            }
        });

        // Debug: Log FormData contents
        console.log("=== FormData Contents (Patient Files) ===");
        for (let [key, value] of payload.entries()) {
            console.log(key, value);
        }

        const res = await axiosClient.post(
            `${backendURL}/api/patients/${patientId}/files`,
            payload,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return res.data;
    } catch (error) {
        console.error("Error uploading patient files:", error);
        throw error;
    }
}

/**
 * Get all files for a patient
 * @param {string} patientId - The ID of the patient
 * @returns {Promise} - Response with files array
 */
export async function getPatientFiles(patientId) {
    try {
        const res = await axiosClient.get(
            `${backendURL}/api/patients/${patientId}/files`
        );
        return res.data;
    } catch (error) {
        console.error("Error fetching patient files:", error);
        throw error;
    }
}

/**
 * Delete a patient file
 * @param {string} patientId - The ID of the patient
 * @param {string} fileId - The ID of the file to delete
 * @returns {Promise} - Response from the backend
 */
export async function deletePatientFile(patientId, fileId) {
    try {
        const res = await axiosClient.delete(
            `${backendURL}/api/patients/${patientId}/files/${fileId}`
        );
        return res.data;
    } catch (error) {
        console.error("Error deleting patient file:", error);
        throw error;
    }
}
