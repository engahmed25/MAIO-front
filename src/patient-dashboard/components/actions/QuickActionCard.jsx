function QuickActionCard({ icon: Icon, label, gradient, onClick }) {
  return (
    <button
      type="button"
      className={`relative overflow-hidden rounded-xl text-left text-white font-semibold p-4 shadow-md shadow-[#0057ff1f] bg-gradient-to-br ${gradient}`}
      onClick={onClick}
    >
      <Icon className="text-xl mb-3 opacity-90" />
      <p className="leading-tight">{label}</p>
    </button>
  );
}

export default QuickActionCard;
