import React, { useState, useEffect } from "react";
import { X, File } from "lucide-react";

function ChatImagePreview({ file, onRemove }) {
  const [preview, setPreview] = useState(null);
  const isImage = file.type.startsWith("image/");

  useEffect(() => {
    if (isImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }

    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [file, isImage]);

  return (
    <div className="relative group">
      {isImage ? (
        <div className="w-20 h-20 rounded-lg overflow-hidden border border-gray-200">
          {preview && (
            <img
              src={preview}
              alt={file.name}
              className="w-full h-full object-cover"
            />
          )}
        </div>
      ) : (
        <div className="w-20 h-20 rounded-lg border border-gray-200 bg-gray-50 flex flex-col items-center justify-center">
          <File className="w-6 h-6 text-gray-400 mb-1" />
          <span className="text-xs text-gray-500 truncate w-full px-1 text-center">
            {file.name.slice(0, 8)}...
          </span>
        </div>
      )}

      {/* Remove Button */}
      <button
        onClick={onRemove}
        className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
      >
        <X className="w-3 h-3" />
      </button>

      {/* File Size */}
      <span className="absolute bottom-1 left-1 right-1 text-xs text-white bg-black bg-opacity-50 rounded px-1 text-center">
        {(file.size / 1024).toFixed(0)}KB
      </span>
    </div>
  );
}

export default ChatImagePreview;
