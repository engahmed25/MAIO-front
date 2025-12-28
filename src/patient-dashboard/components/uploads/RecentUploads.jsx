import UploadItem from "./UploadItem.jsx";
import { FiUploadCloud } from "react-icons/fi";

function RecentUploads({ uploads = [], onView }) {
  return (
    <div className="bg-white/90 border border-[#dfe7ff] rounded-2xl shadow-lg shadow-[#0057ff1a] p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Recent Uploads</h3>
        <button className="text-sm font-semibold text-[#0057FF] px-3 py-1.5 bg-[#E8F0FF] rounded-full flex items-center gap-2">
          <FiUploadCloud />
          Add File
        </button>
      </div>
      <div className="space-y-3">
        {uploads.map((file) => (
          <UploadItem key={file.name} file={file} onView={onView} />
        ))}
      </div>
    </div>
  );
}

export default RecentUploads;
