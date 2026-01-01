const badgeStyles = {
  Diagnosis: "bg-rose-50 text-rose-700 border-rose-200",
  Medication: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Procedure: "bg-sky-50 text-sky-700 border-sky-200",
  Note: "bg-indigo-50 text-indigo-700 border-indigo-200",
};

function TypeBadge({ type }) {
  const style = badgeStyles[type] || "bg-gray-100 text-gray-700 border-gray-200";

  return (
    <span
      className={`inline-flex items-center text-xs font-semibold px-3 py-1 rounded-full border ${style}`}
    >
      {type}
    </span>
  );
}

export default TypeBadge;
