import { useDropzone } from "react-dropzone";
import { useState, useEffect } from "react";

function UploadFilesInput({
  onFileAccepted,
  label = "Upload your file",
  borderClass = "border-[var(--main-color)]",
  borderStyle = "border-dashed",
  helperText = "",
  allowedTypes = [], // new prop
  error, // new prop from react-hook-form
  //  Dynamic Messages
  dropActiveText = "Drop the files here ...",
  dropInactiveText = "Drag 'n' drop files here, or click to select",

  //  Multi-file Support
  multiple = true,

  // Accept Any File Types (user provides)
  accept = {
    "image/*": [],
    "application/pdf": [],
    "application/msword": [],
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      [],
  },
}) {
  const [previews, setPreviews] = useState([]);
  const [localError, setLocalError] = useState(""); // For rejected files

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple,
    onDrop: (acceptedFiles, fileRejections) => {
      // Handle rejected files
      if (fileRejections.length > 0) {
        setLocalError(fileRejections[0].errors[0].message);
        return;
      }

      setLocalError(""); // Clear previous error

      const newPreviews = acceptedFiles.map((file) => ({
        file,
        url: URL.createObjectURL(file),
      }));

      setPreviews((prev) => [...prev, ...newPreviews]);
      onFileAccepted(acceptedFiles); // Return files to parent
    },
    accept: allowedTypes.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
  });

  // Cleanup the preview URL after unmount
  useEffect(() => {
    return () => {
      if (previews) {
        previews.forEach((preview) => URL.revokeObjectURL(preview.url));
      }
    };
  }, [previews]);
  // 🆕 Function to remove the selected image
  const handleRemove = (index) => {
    URL.revokeObjectURL(previews[index].url);
    const updated = previews.filter((_, i) => i !== index);
    setPreviews(updated);

    // return updated file list to parent
    onFileAccepted(updated.map((p) => p.file));
  };

  return (
    <div className="flex flex-col items-start gap-2 w-full">
      {/* Label */}
      <label className="font-medium">{label}</label>
      {helperText && <p className="text-sm text-gray-500 mb-2">{helperText}</p>}

      <div
        {...getRootProps()}
        className={`border-2 h-40 flex items-center justify-center 
          ${borderStyle} ${borderClass} rounded-md p-6 text-center cursor-pointer 
          hover:bg-gray-100 transition w-full`}
      >
        <input {...getInputProps()} />

        {isDragActive ? <p>{dropActiveText}</p> : <p>{dropInactiveText}</p>}
      </div>
      {/* Show errors */}
      {(error || localError) && (
        <p className="text-sm text-red-500 mt-1">
          {error?.message || localError}
        </p>
      )}
      {/* Preview List */}
      {previews.length > 0 && (
        <div className="mt-4 w-full space-y-4">
          {previews.map((fileData, idx) => (
            <div key={idx} className="relative flex items-center gap-4">
              {/* Image Preview only if image */}
              {fileData.file.type.startsWith("image/") ? (
                <img
                  src={fileData.url}
                  alt="Preview"
                  className="h-20 w-20 object-cover rounded-md shadow-md"
                />
              ) : (
                <div className="h-20 w-20 bg-gray-200 rounded-md flex items-center justify-center">
                  <span className="text-sm">FILE</span>
                </div>
              )}

              <div className="flex-1">
                <p className="font-medium">{fileData.file.name}</p>
                <p className="text-sm text-gray-600">
                  {(fileData.file.size / 1024).toFixed(1)} KB
                </p>
              </div>

              <button
                onClick={() => handleRemove(idx)}
                className="bg-red-500 text-white p-1 rounded-md hover:bg-red-600 transition"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UploadFilesInput;
