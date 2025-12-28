import MedicalHistoryItem from "./MedicalHistoryItem.jsx";

function MedicalHistoryTimeline({ records = [], isLoading, error }) {
  if (isLoading) {
    return (
      <div className="space-y-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="relative pl-10">
            {index < 2 && (
              <span className="absolute left-[11px] top-6 bottom-0 w-px bg-slate-200" />
            )}
            <span className="absolute left-[5px] top-6 w-3 h-3 rounded-full bg-slate-200" />
            <div className="bg-white border border-slate-100 rounded-2xl p-5 animate-pulse">
              <div className="h-4 w-48 bg-slate-200 rounded mb-3" />
              <div className="h-3 w-32 bg-slate-100 rounded mb-4" />
              <div className="h-3 w-full bg-slate-100 rounded mb-2" />
              <div className="h-3 w-3/4 bg-slate-100 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-rose-100 bg-rose-50 px-4 py-3 text-rose-700">
        Unable to load medical history. Please try again.
      </div>
    );
  }

  if (!records.length) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white px-4 py-6 text-center text-slate-600">
        No medical history records yet.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {records.map((record, index) => (
        <MedicalHistoryItem
          key={record.id}
          record={record}
          isLast={index === records.length - 1}
        />
      ))}
    </div>
  );
}

export default MedicalHistoryTimeline;
