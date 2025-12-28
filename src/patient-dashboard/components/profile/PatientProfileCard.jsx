import PatientInfoItem from "./PatientInfoItem.jsx";

function PatientProfileCard({ patient, infoItems = [] }) {
  const { name, patientId, status, initials } = patient;

  return (
    <div className="bg-white/90 border border-[#dfe7ff] rounded-2xl shadow-lg shadow-[#0057ff1a] p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-[#0057FF] to-[#7eb0ff] text-white text-2xl font-bold flex items-center justify-center shadow-md">
          {initials}
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-2xl font-semibold">{name}</h2>
              <p className="text-sm text-slate-500">Patient ID: {patientId}</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-[#E8F0FF] text-[#0057FF] text-xs font-semibold">
              {status}
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4 text-sm text-slate-600">
            {infoItems.map((item) => (
              <PatientInfoItem
                key={item.label}
                icon={item.icon}
                label={item.label}
                value={item.value}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientProfileCard;
