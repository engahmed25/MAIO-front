import QuickActionCard from "./QuickActionCard.jsx";

function QuickActions({ actions = [] }) {
  return (
    <div className="bg-white/90 border border-[#dfe7ff] rounded-2xl shadow-lg shadow-[#0057ff1a] p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Quick Actions</h3>
        <span className="text-xs text-slate-500">
          Access your most-used tasks
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {actions.map((action) => (
          <QuickActionCard
            key={action.label}
            icon={action.icon}
            label={action.label}
            gradient={action.bg}
            onClick={action.onClick}
          />
        ))}
      </div>
    </div>
  );
}

export default QuickActions;
