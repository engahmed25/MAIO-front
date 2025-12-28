import { FiMessageSquare } from "react-icons/fi";

function DoctorNotesCard({ notes }) {
  return (
    <div className="flex items-start gap-3">
      <span className="h-9 w-9 rounded-xl bg-[#E8F0FF] text-[#0057FF] flex items-center justify-center">
        <FiMessageSquare />
      </span>
      <div>
        <p className="text-sm font-semibold text-[#0B1D4A]">Doctor Notes</p>
        <p className="text-xs text-slate-500">{notes}</p>
      </div>
    </div>
  );
}

export default DoctorNotesCard;
