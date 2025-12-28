function HealthMetricCard({
  label,
  value,
  statusText,
  badge,
  className = "",
  statusClassName = "text-xs text-emerald-600 font-semibold flex items-center gap-1",
  children,
}) {
  return (
    <div
      className={`p-4 rounded-xl border border-[#e5edff] bg-white ${className}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-slate-500">{label}</p>
          <p className="text-2xl font-bold text-[#0B1D4A]">{value}</p>
          {statusText && <p className={statusClassName}>{statusText}</p>}
        </div>
        {badge && (
          <span className="inline-flex items-center text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
            {badge}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

export default HealthMetricCard;
