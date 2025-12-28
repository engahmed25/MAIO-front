import { FiClipboard } from "react-icons/fi";

function MedicationSummaryCard({ summary }) {
  return (
    <div className="flex items-start gap-3">
      <span className="h-9 w-9 rounded-xl bg-[#E8F0FF] text-[#0057FF] flex items-center justify-center">
        <FiClipboard />
      </span>
      <div>
        <p className="text-sm font-semibold text-[#0B1D4A]">Medications</p>
        <p className="text-xs text-slate-500">{summary}</p>
      </div>
    </div>
  );
}

export default MedicationSummaryCard;
