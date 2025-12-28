import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";

function UploadPicture({
  onFileAccepted = () => {}, // Add default empty function
  label = "Upload your profile picture",
  borderClass = "border-[var(--main-color)]",
  borderStyle = "border-dashed",
  helperText = "",
  allowedTypes = ["image/*"],
  error,
  dropActiveText = "Drop the image here ...",
  dropInactiveText = "Upload Picture",
  setValue,
}) {
  const [preview, setPreview] = useState(null);
  const [localError, setLocalError] = useState("");

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: false,
    accept: allowedTypes.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    onDrop: (acceptedFiles, fileRejections) => {
      if (fileRejections.length > 0) {
        setLocalError(fileRejections[0].errors[0].message);
        return;
      }

      setLocalError("");

      const file = acceptedFiles[0];
      const url = URL.createObjectURL(file);
      setPreview({ file, url });

      onFileAccepted(file);
      if (setValue) setValue("profilePicture", file);
    },
  });

  // Clean up the preview URL on unmount or change
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview.url);
    };
  }, [preview]);

  const handleRemove = () => {
    if (preview) URL.revokeObjectURL(preview.url);
    setPreview(null);
    onFileAccepted(null);
    if (setValue) setValue("profilePicture", null);
  };

  return (
    <div className="flex flex-col items-start gap-2 w-full mb-4">
      {/* Label */}
      <label className="font-medium">{label}</label>
      {helperText && <p className="text-sm text-gray-500 mb-2">{helperText}</p>}

      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={`h-[150px] w-full bg-gray-100 flex items-center justify-center 
          ${borderStyle} ${borderClass} transition-all duration-300 rounded-md p-6 text-center cursor-pointer 
          hover:bg-gray-400  relative`}
      >
        <input {...getInputProps()} />

        {/* Show preview if exists */}
        {preview ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <img
              src={preview.url}
              alt="Preview"
              className="h-full w-full object-cover rounded-md"
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleRemove();
              }}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition"
            >
              &times;
            </button>
          </div>
        ) : isDragActive ? (
          <p>{dropActiveText}</p>
        ) : (
          <p>{dropInactiveText}</p>
        )}
      </div>

      {/* Show error */}
      {(error || localError) && (
        <p className="text-sm text-red-500 mt-1">
          {error?.message || localError}
        </p>
      )}
    </div>
  );
}

export default UploadPicture;
