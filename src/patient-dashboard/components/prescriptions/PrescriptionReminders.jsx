import PrescriptionItem from "./PrescriptionItem.jsx";

function PrescriptionReminders({ prescriptions = [], statusStyles, onAction }) {
  return (
    <div className="bg-white/90 border border-[#dfe7ff] rounded-2xl shadow-lg shadow-[#0057ff1a] p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Prescription Reminders</h3>
        <button className="text-sm font-semibold text-[#0057FF] px-3 py-1.5 bg-[#E8F0FF] rounded-full">
          Manage
        </button>
      </div>
      <div className="space-y-3">
        {prescriptions.map((prescription) => (
          <PrescriptionItem
            key={prescription.name}
            prescription={prescription}
            statusStyles={statusStyles}
            onAction={onAction}
          />
        ))}
      </div>
    </div>
  );
}

export default PrescriptionReminders;
