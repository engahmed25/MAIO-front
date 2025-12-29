import { FileText } from "lucide-react";

export default function ViewRecordButton() {
  return (
    <>
      {/* View Records Button */}
      <button className="flex items-center justify-center sm:justify-start gap-2 px-3 sm:px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm font-medium whitespace-nowrap">
        <FileText size={18} />
        <span className="hidden sm:inline">View Records</span>
        <span className="sm:hidden">Records</span>
      </button>
    </>
  );
}
