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
  Stethoscope,
  FileType,
} from "lucide-react";
// FileCard Component
export default function FileCard({ file, onDelete, onView, onUpdateMetadata }) {
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
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow relative group">
      {/* Delete Button */}
      <button
        onClick={() => onDelete(file.id)}
        className="absolute top-3 right-3 p-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors opacity-0 group-hover:opacity-100"
      >
        <X className="w-4 h-4" />
      </button>

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

      {/* Doctor Name Input */}
      <div className="mb-3">
        <label className="flex items-center gap-2 text-xs text-gray-600 mb-1.5">
          <Stethoscope className="w-3.5 h-3.5" />
          Doctor Name
        </label>
        <input
          type="text"
          value={file.doctorName || ""}
          onChange={(e) =>
            onUpdateMetadata(file.id, "doctorName", e.target.value)
          }
          placeholder="Enter doctor name"
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Document Type Select */}
      <div className="mb-3 pb-3 border-b border-gray-100">
        <label className="flex items-center gap-2 text-xs text-gray-600 mb-1.5">
          <FileType className="w-3.5 h-3.5" />
          Document Type
        </label>
        <select
          value={file.documentType || ""}
          onChange={(e) =>
            onUpdateMetadata(file.id, "documentType", e.target.value)
          }
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
        >
          <option value="">Select type</option>
          <option value="Lab Results">Lab Results</option>
          <option value="MRI">MRI</option>
          <option value="X-Ray">X-Ray</option>
          <option value="CT Scan">CT Scan</option>
          <option value="Ultrasound">Ultrasound</option>
          <option value="Prescription">Prescription</option>
          <option value="Medical Report">Medical Report</option>
          <option value="Vaccination Record">Vaccination Record</option>
        </select>
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
            link.href = file.preview;
            link.download = file.name;
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
