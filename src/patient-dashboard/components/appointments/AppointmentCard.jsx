import { FiCalendar, FiClock, FiVideo } from "react-icons/fi";

const defaultStatusStyles = {
  confirmed: "bg-emerald-50 text-emerald-700 border border-emerald-100",
  pending: "bg-amber-50 text-amber-700 border border-amber-100",
};

function AppointmentCard({ appointment, statusStyles = defaultStatusStyles, onAction }) {
  const { doctor, specialty, date, time, status, action } = appointment;
  const statusClass =
    statusStyles[status] || "bg-slate-100 text-slate-700 border border-slate-200";

  return (
    <div className="flex gap-4 p-4 rounded-xl bg-[#F7FAFF] border border-[#dfe7ff]">
      <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#5a8dff] to-[#99bfff] text-white flex items-center justify-center shadow-inner">
        <FiCalendar className="text-xl" />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="font-semibold text-[#0B1D4A]">{doctor}</p>
            <p className="text-sm text-slate-500">{specialty}</p>
          </div>
          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusClass}`}>
            {status === "confirmed" ? "Confirmed" : "Pending"}
          </span>
        </div>
        <div className="flex items-center justify-between mt-3 gap-4">
          <p className="text-sm text-slate-600 flex items-center gap-2">
            <FiClock className="text-[#0057FF]" />
            {date} · {time}
          </p>
          <button
            className={`inline-flex items-center gap-2 px-3 py-2 text-sm font-semibold rounded-lg transition
            ${
              action === "Join Video Call"
                ? "bg-[#0057FF] text-white shadow-md shadow-[#0057ff33]"
                : "bg-white text-[#0057FF] border border-[#c8d9ff]"
            }`}
            onClick={() => onAction?.(appointment)}
          >
            {action}
            {action === "Join Video Call" && <FiVideo />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AppointmentCard;
