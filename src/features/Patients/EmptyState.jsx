// EmptyState Component
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
export default function EmptyState() {
  return (
    <div className="text-center py-16">
      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Upload className="w-10 h-10 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        No files uploaded yet
      </h3>
      <p className="text-gray-600 mb-6">
        Upload your medical documents, images, or reports to get started
      </p>
    </div>
  );
}
