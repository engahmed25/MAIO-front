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
} from "lucide-react";
// FileCard Component
export default function FileCard({ file, onDelete, onView }) {
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

      {/* Doctor Info */}
      <div className="flex items-center gap-2 mb-3 pb-3 border-b border-gray-100">
        <User className="w-4 h-4 text-gray-400 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-xs text-gray-500">Requested by</p>
          <p className="text-sm font-medium text-gray-900 truncate">
            {file.requestedBy}
          </p>
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
