function PatientInfoItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-2">
      <span className="h-8 w-8 rounded-xl bg-[#E8F0FF] text-[#0057FF] flex items-center justify-center">
        <Icon />
      </span>
      <div>
        <p className="text-xs text-slate-500">{label}</p>
        <p className="font-semibold text-[#0B1D4A]">{value}</p>
      </div>
    </div>
  );
}

export default PatientInfoItem;
