import {
  Activity,
  CalendarDays,
  FileText,
  MessageSquare,
  MoreVertical,
  Pill,
  Stethoscope,
  User,
} from "lucide-react";
import TypeBadge from "./TypeBadge.jsx";

const typeIconMap = {
  Diagnosis: Activity,
  Medication: Pill,
  Procedure: Stethoscope,
  Note: MessageSquare,
};

const formatDate = (dateString) =>
  new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(dateString));

function MedicalHistoryItem({ record, isLast }) {
  const Icon = typeIconMap[record.type] || FileText;

  return (
    <div className="relative pl-10">
      {!isLast && (
        <span className="absolute left-[11px] top-6 bottom-0 w-px bg-slate-200" />
      )}
      <span className="absolute left-[5px] top-6 w-3 h-3 rounded-full bg-sky-500 ring-4 ring-sky-100" />

      <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-sky-50 text-sky-600">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                {record.title}
              </h3>
              <p className="mt-1 text-sm text-slate-500 flex items-center gap-2">
                <CalendarDays className="w-4 h-4" />
                {formatDate(record.date)}
              </p>
            </div>
          </div>

          <button
            type="button"
            className="text-slate-400 hover:text-slate-600 transition-colors"
            aria-label="More actions"
          >
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-slate-600 mt-3 leading-relaxed">
          {record.description}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-500">
          <TypeBadge type={record.type} />
          <span className="inline-flex items-center gap-2">
            <User className="w-4 h-4" />
            Recorded by {record.recordedBy}
          </span>
        </div>
      </div>
    </div>
  );
}

export default MedicalHistoryItem;
