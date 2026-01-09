import {
  File,
  FileText,
  FileImage,
  Download,
  Eye,
  Calendar,
  Stethoscope,
  FileType,
} from "lucide-react";

// DoctorFileCard Component - Read-only version for doctors viewing patient files
export default function DoctorFileCard({ file, onView }) {
  const getFileIcon = (type) => {
    if (type.startsWith("image/")) {
      return <FileImage className="w-8 h-8 text-blue-500" />;
    } else if (type === "application/pdf") {
      return <FileText className="w-8 h-8 text-red-500" />;
    } else {
      return <File className="w-8 h-8 text-gray-500" />;
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes || bytes === 0) return "N/A";
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow relative group">
      {/* File Icon */}
      <div className="flex items-center justify-center w-16 h-16 bg-gray-50 rounded-lg mb-4 mx-auto">
        {getFileIcon(file.type)}
      </div>

      {/* File Name */}
      <h3 className="font-semibold text-gray-900 text-center mb-2 truncate px-2">
        {file.name}
      </h3>

      {/* File Size */}
      <p className="text-xs text-gray-500 text-center mb-4">
        {formatFileSize(file.size)}
      </p>

      {/* Doctor Name - Read Only */}
      <div className="mb-3">
        <label className="flex items-center gap-2 text-xs text-gray-600 mb-1.5">
          <Stethoscope className="w-3.5 h-3.5" />
          Doctor Name
        </label>
        <div className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-700">
          {file.doctorName || "N/A"}
        </div>
      </div>

      {/* Document Type - Read Only */}
      <div className="mb-3 pb-3 border-b border-gray-100">
        <label className="flex items-center gap-2 text-xs text-gray-600 mb-1.5">
          <FileType className="w-3.5 h-3.5" />
          Document Type
        </label>
        <div className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50">
          <span
            className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
              file.documentType === "Lab Results"
                ? "bg-blue-100 text-blue-800"
                : file.documentType === "MRI"
                ? "bg-purple-100 text-purple-800"
                : file.documentType === "X-Ray"
                ? "bg-green-100 text-green-800"
                : file.documentType === "CT Scan"
                ? "bg-yellow-100 text-yellow-800"
                : file.documentType === "Medical Report"
                ? "bg-red-100 text-red-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {file.documentType || "N/A"}
          </span>
        </div>
      </div>

      {/* Upload Date */}
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-xs text-gray-500">Upload Date</p>
          <p className="text-sm font-medium text-gray-900">{file.uploadDate}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => onView(file)}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
        >
          <Eye className="w-4 h-4" />
          View
        </button>
        <button
          onClick={() => {
            const link = document.createElement("a");
            link.href = file.url;
            link.download = file.name;
            link.target = "_blank";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium"
        >
          <Download className="w-4 h-4" />
          Download
        </button>
      </div>
    </div>
  );
}
