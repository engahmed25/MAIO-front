import { FiAlertCircle, FiCheckCircle } from "react-icons/fi";

const defaultStatusStyles = {
  "due-soon": "bg-amber-50 text-amber-700 border-amber-100",
  "on-track": "bg-emerald-50 text-emerald-700 border-emerald-100",
  low: "bg-emerald-50 text-emerald-700 border-emerald-100",
};

function PrescriptionItem({ prescription, statusStyles = defaultStatusStyles, onAction }) {
  const { name, schedule, due, urgency } = prescription;
  const badgeClass =
    statusStyles[urgency] || "bg-slate-100 text-slate-700 border-slate-200";

  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-[#F7FAFF] border border-[#e5edff]">
      <div className="h-10 w-10 rounded-xl bg-[#E8F0FF] text-[#0057FF] flex items-center justify-center">
        {urgency === "due-soon" ? (
          <FiAlertCircle className="text-lg" />
        ) : (
          <FiCheckCircle className="text-lg" />
        )}
      </div>
      <div className="flex-1">
        <p className="font-semibold text-[#0B1D4A]">{name}</p>
        <p className="text-xs text-slate-500">{schedule}</p>
      </div>
      <button
        type="button"
        className={`text-xs font-semibold px-3 py-1 rounded-full border ${badgeClass}`}
        onClick={() => onAction?.(prescription)}
      >
        {due}
      </button>
    </div>
  );
}

export default PrescriptionItem;
