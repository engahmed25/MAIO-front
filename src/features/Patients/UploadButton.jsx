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
// UploadButton Component
export default function UploadButton({ onFileSelect }) {
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      onFileSelect(file);
    });
    e.target.value = ""; // Reset input
  };

  return (
    <div className="text-center">
      <input
        type="file"
        id="file-upload"
        className="hidden"
        multiple
        accept="image/*,.pdf,.doc,.docx,.txt"
        onChange={handleFileChange}
      />
      <label
        htmlFor="file-upload"
        className="inline-flex items-center gap-3 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer font-medium"
      >
        <Upload className="w-5 h-5" />
        Upload New File
      </label>
      <p className="text-sm text-gray-500 mt-3">
        Supported formats: Images, PDF, DOC, DOCX, TXT
      </p>
    </div>
  );
}
