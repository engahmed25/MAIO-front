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
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { useState } from "react";
export default function FileViewerModal({ file, onClose }) {
  const [zoom, setZoom] = useState(100);

  if (!file) return null;

  const isImage = file.type.startsWith("image/");
  const isPDF = file.type === "application/pdf";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 text-lg truncate">
              {file.name}
            </h3>
            <p className="text-sm text-gray-500">
              Requested by {file.requestedBy}
            </p>
          </div>

          {isImage && (
            <div className="flex items-center gap-2 mx-4">
              <button
                onClick={() => setZoom(Math.max(50, zoom - 25))}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ZoomOut className="w-5 h-5 text-gray-600" />
              </button>
              <span className="text-sm text-gray-600 min-w-[60px] text-center">
                {zoom}%
              </span>
              <button
                onClick={() => setZoom(Math.min(200, zoom + 25))}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ZoomIn className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          )}

          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-auto p-4 bg-gray-50">
          {isImage && file.preview ? (
            <div className="flex items-center justify-center min-h-full">
              <img
                src={file.preview}
                alt={file.name}
                style={{ width: `${zoom}%`, maxWidth: "none" }}
                className="object-contain"
              />
            </div>
          ) : isPDF && file.preview ? (
            <iframe
              src={file.preview}
              className="w-full h-full min-h-[600px] border-0"
              title={file.name}
            />
          ) : (
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <File className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">
                  Preview not available for this file type
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Use the download button to view the file
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-3 p-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium"
          >
            Close
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
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download
          </button>
        </div>
      </div>
    </div>
  );
}
