import { useState, useEffect } from "react";
import EmptyState from "../features/Patients/EmptyState";
import FileCard from "../features/Patients/FileCard";
import UploadButton from "../features/Patients/UploadButton";
import {
  Upload,
  File,
  FileText,
  FileImage,
  X,
  Download,
  Eye,
  Calendar,
  User,
  Check,
  AlertCircle,
} from "lucide-react";
import FileViewerModal from "../features/Patients/FileViewer";
import { useUploadPatientFiles } from "../features/Patients/useUploadPatientFiles";

// Main UploadPatientsFiles Component
export default function UploadPatientsFiles() {
  const [files, setFiles] = useState([]);
  const [pendingFiles, setPendingFiles] = useState([]); // Files waiting to be uploaded
  const { uploadFiles, isUploading, uploadError, uploadSuccess } =
    useUploadPatientFiles();

  const [viewingFile, setViewingFile] = useState(null);

  const doctors = [
    "Dr. Alex Johnson",
    "Dr. Sarah Chen",
    "Dr. Michael Ortiz",
    "Dr. Lisa Wong",
    "Dr. Evelyn Reed",
  ];

  const handleFileSelect = (file) => {
    // Create a preview URL for the file
    const reader = new FileReader();

    reader.onloadend = () => {
      const newFile = {
        id: Date.now(),
        name: file.name,
        type: file.type,
        size: file.size,
        requestedBy: doctors[Math.floor(Math.random() * doctors.length)],
        uploadDate: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        preview: reader.result,
        file: file, // Store the actual File object for upload
      };

      setFiles((prevFiles) => [newFile, ...prevFiles]);
      setPendingFiles((prev) => [...prev, newFile]); // Add to pending upload queue
    };

    reader.readAsDataURL(file);
  };

  const handleDeleteFile = (fileId) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.id !== fileId));
    setPendingFiles((prev) => prev.filter((file) => file.id !== fileId));
  };

  // ✅ HANDLE UPLOAD TO BACKEND
  const handleUploadToBackend = async () => {
    if (pendingFiles.length === 0) {
      alert("No files to upload!");
      return;
    }

    // Get patient ID from localStorage or context
    // Adjust this based on how you store the logged-in user's data
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    const patientId = userData.id || userData._id || "PAT-2024-001"; // Fallback for demo

    try {
      await uploadFiles(patientId, pendingFiles);
      // Clear pending files after successful upload
      setPendingFiles([]);
      alert("Files uploaded successfully!");
    } catch (error) {
      console.error("Upload failed:", error);
      alert(`Upload failed: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* File Viewer Modal */}
      {viewingFile && (
        <FileViewerModal
          file={viewingFile}
          onClose={() => setViewingFile(null)}
        />
      )}

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Patient Files
          </h1>
          <p className="text-gray-600">
            Upload and manage medical documents, test results, and imaging files
            for your patient
          </p>
        </div>

        {/* Patient Info Banner */}
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Patient: John Doe</p>
              <p className="text-sm text-gray-600">ID: #PAT-2024-001</p>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900 mb-1">
                {files.length}
              </p>
              <p className="text-sm text-gray-600">Total Files</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900 mb-1">
                {files.filter((f) => f.type.startsWith("image/")).length}
              </p>
              <p className="text-sm text-gray-600">Images</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900 mb-1">
                {files.filter((f) => f.type === "application/pdf").length}
              </p>
              <p className="text-sm text-gray-600">Documents</p>
            </div>
          </div>
        </div>

        {/* Upload Status Messages */}
        {uploadError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <div>
              <p className="font-medium text-red-900">Upload Failed</p>
              <p className="text-sm text-red-700">
                {uploadError?.response?.data?.message ||
                  uploadError?.message ||
                  "Failed to upload files"}
              </p>
            </div>
          </div>
        )}

        {uploadSuccess && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center gap-3">
            <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
            <div>
              <p className="font-medium text-green-900">Upload Successful</p>
              <p className="text-sm text-green-700">
                All files have been uploaded to the server
              </p>
            </div>
          </div>
        )}

        {/* Pending Upload Badge */}
        {pendingFiles.length > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Upload className="w-5 h-5 text-yellow-600" />
                <div>
                  <p className="font-medium text-yellow-900">
                    {pendingFiles.length} file(s) ready to upload
                  </p>
                  <p className="text-sm text-yellow-700">
                    Click "Upload Files to Server" to save them to the backend
                  </p>
                </div>
              </div>
              <button
                onClick={handleUploadToBackend}
                disabled={isUploading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                {isUploading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    Upload Files to Server
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Files Grid or Empty State */}
        {files.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Uploaded Files ({files.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {files.map((file) => (
                  <FileCard
                    key={file.id}
                    file={file}
                    onDelete={handleDeleteFile}
                    onView={setViewingFile}
                  />
                ))}
              </div>
            </div>
          </>
        )}

        {/* Upload Button - Always at Bottom */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <UploadButton onFileSelect={handleFileSelect} />
        </div>
      </div>
    </div>
  );
}
