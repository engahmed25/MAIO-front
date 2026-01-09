// import axiosClient from "./axiosClient";

// const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

// /**
//  * Upload patient files to the backend
//  * @param {string} patientId - The ID of the patient
//  * @param {Array} files - Array of file objects with metadata
//  * @returns {Promise} - Response from the backend
//  */
// export async function uploadPatientFiles(patientId, files) {
//     try {
//         // ✅ CREATE FORMDATA
//         const payload = new FormData();

//         // Add patient ID
//         payload.append("patientId", patientId);

//         // ✅ ADD FILES
//         // Each file in the array should have the actual File object
//         files.forEach((fileData, index) => {
//             if (fileData.file) {
//                 // Append the actual file
//                 payload.append("files", fileData.file);

//                 // Optionally append metadata for each file
//                 payload.append(`fileMetadata[${index}][name]`, fileData.name);
//                 payload.append(`fileMetadata[${index}][type]`, fileData.type);
//                 payload.append(`fileMetadata[${index}][uploadDate]`, fileData.uploadDate);

//                 if (fileData.requestedBy) {
//                     payload.append(`fileMetadata[${index}][requestedBy]`, fileData.requestedBy);
//                 }
//             }
//         });

//         // Debug: Log FormData contents
//         console.log("=== FormData Contents (Patient Files) ===");
//         for (let [key, value] of payload.entries()) {
//             console.log(key, value);
//         }

//         const res = await axiosClient.post(
//             `${backendURL}/api/patients/${patientId}/files`,
//             payload,
//             {
//                 headers: {
//                     "Content-Type": "multipart/form-data",
//                 },
//             }
//         );

//         return res.data;
//     } catch (error) {
//         console.error("Error uploading patient files:", error);
//         throw error;
//     }
// }

// /**
//  * Get all files for a patient
//  * @param {string} patientId - The ID of the patient
//  * @returns {Promise} - Response with files array
//  */
// export async function getPatientFiles(patientId) {
//     try {
//         const res = await axiosClient.get(
//             `${backendURL}/api/patients/${patientId}/files`
//         );
//         return res.data;
//     } catch (error) {
//         console.error("Error fetching patient files:", error);
//         throw error;
//     }
// }

// /**
//  * Delete a patient file
//  * @param {string} patientId - The ID of the patient
//  * @param {string} fileId - The ID of the file to delete
//  * @returns {Promise} - Response from the backend
//  */
// export async function deletePatientFile(patientId, fileId) {
//     try {
//         const res = await axiosClient.delete(
//             `${backendURL}/api/patients/${patientId}/files/${fileId}`
//         );
//         return res.data;
//     } catch (error) {
//         console.error("Error deleting patient file:", error);
//         throw error;
//     }
// }


import axiosClient from "./axiosClient";

const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

// Helper function to get cookie value
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        const cookieValue = parts.pop().split(';').shift();
        return decodeURIComponent(cookieValue);
    }
    return null;
}

/**
 * Upload patient files to the backend
 * @param {Array} files - Array of file objects with metadata
 * @returns {Promise} - Response from the backend
 */
export async function uploadPatientFiles(files) {
    // ✅ Ensure files is an array
    if (!Array.isArray(files)) {
        throw new Error("Files parameter must be an array");
    }

    console.log("=== Files to upload ===", files);

    // ✅ Upload each file individually (backend accepts one file at a time)
    const results = [];
    const errors = [];

    for (let i = 0; i < files.length; i++) {
        const fileData = files[i];

        console.log(`\n--- Uploading file ${i + 1}/${files.length} ---`);
        console.log("File metadata:", {
            name: fileData.name,
            doctorName: fileData.doctorName,
            documentType: fileData.documentType
        });

        if (fileData.file) {
            try {
                // Create FormData for this single file
                const payload = new FormData();
                payload.append("medicalDocument", fileData.file);
                payload.append("title", fileData.name || fileData.file.name);
                payload.append("doctorName", fileData.doctorName || "");
                payload.append("documentType", fileData.documentType || "");

                console.log("✅ Sending to backend:", {
                    medicalDocument: fileData.file.name,
                    title: fileData.name || fileData.file.name,
                    doctorName: fileData.doctorName,
                    documentType: fileData.documentType
                });

                // Debug: Log actual FormData contents
                console.log("\n=== FormData Being Sent ===");
                for (let [key, value] of payload.entries()) {
                    if (value instanceof File) {
                        console.log(`  ${key}:`, value.name);
                    } else {
                        console.log(`  ${key}:`, value);
                    }
                }

                // Upload this file
                const res = await axiosClient.post(
                    `${backendURL}/api/patients/me/medical-documents`,
                    payload,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        }
                    }
                );

                console.log(`✅ File ${i + 1} uploaded successfully`);
                results.push(res.data);

            } catch (error) {
                console.error(`❌ Failed to upload file ${i + 1}:`, error);
                errors.push({
                    file: fileData.name,
                    error: error.response?.data?.message || error.message
                });
            }
        }
    }

    // If any files failed, throw error with details
    if (errors.length > 0) {
        const errorMessage = errors.map(e => `${e.file}: ${e.error}`).join(', ');
        throw new Error(`Failed to upload ${errors.length} file(s): ${errorMessage}`);
    }

    console.log(`\n✅ All ${files.length} files uploaded successfully`);
    return { success: true, results };
}

/**
 * Get all files for logged-in patient
 * @returns {Promise} - Response with files array
 */
export async function getPatientFiles() {
    // Token is automatically added by interceptor
    const res = await axiosClient.get(
        `${backendURL}/api/patients/me/medical-documents`
    );
    return res.data;
}

/**
 * Delete a patient file
 * @param {string} fileId - The ID of the file to delete
 * @returns {Promise} - Response from the backend
 */
export async function deletePatientFile(fileId) {
    // Token is automatically added by interceptor
    const res = await axiosClient.delete(
        `${backendURL}/api/patients/me/medical-documents/${fileId}`
    );
    return res.data;
}

/**
 * Upload medical document for logged-in patient
 * @param {File} file - The medical document file to upload
 * @param {string} title - The title/description of the document
 * @returns {Promise} - Response from the backend
 */
export async function uploadMedicalDocument(file, title) {
    // ✅ CREATE FORMDATA
    const formData = new FormData();

    // Add the file and title as shown in Postman
    formData.append("medicalDocument", file);
    formData.append("title", title);

    // Debug: Log FormData contents
    console.log("=== Uploading Medical Document ===");
    for (let [key, value] of formData.entries()) {
        console.log(key, value);
    }

    // Token is automatically added by axiosClient interceptor from localStorage
    const res = await axiosClient.post(
        `${backendURL}/api/patients/me/medical-documents`,
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }
    );

    return res.data;
}

/**
 * Get medical records for logged-in patient
 * @returns {Promise} - Response with medical documents, history, profile info
 */
export async function getMedicalRecords() {
    // Token is automatically added by interceptor
    const res = await axiosClient.get(
        `${backendURL}/api/patients/me/medical-records`
    );
    return res.data;
}

/**
 * Get patient files by patient ID (for doctors)
 * @param {string} patientId - The ID of the patient
 * @returns {Promise} - Response with patient's medical documents
 */
export async function getPatientFilesByDoctorView(patientId) {
    // Token is automatically added by interceptor
    // Doctors access patient medical documents through this endpoint with doctor token
    const res = await axiosClient.get(
        `${backendURL}/api/patients/medical-documents/${patientId}`
    );
    return res.data;
}