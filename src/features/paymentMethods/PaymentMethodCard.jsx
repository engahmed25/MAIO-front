import { FaCheck } from "react-icons/fa6";

function PaymentMethodCard({
  icon: Icon,
  title,
  subtitle,
  badge,
  isSelected,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full p-4 sm:p-5 rounded-xl border-2  text-left 
        transition-transform  duration-300 transform hover:scale-105 ${
          isSelected
            ? "border-blue-500 bg-blue-50"
            : "border-gray-200 bg-white hover:border-gray-300"
        }`}
    >
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Icon */}
        <div
          className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center shrink-0 ${
            isSelected ? "bg-blue-600" : "bg-blue-100"
          }`}
        >
          <Icon
            className={`text-xl sm:text-2xl ${
              isSelected ? "text-white" : "text-blue-600"
            }`}
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
              {title}
            </h3>
            {badge && (
              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
                {badge}
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">{subtitle}</p>
        </div>

        {/* Selection Indicator */}
        <div
          className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
            isSelected
              ? "border-blue-600 bg-blue-600"
              : "border-gray-300 bg-white"
          }`}
        >
          {isSelected && <FaCheck className="text-white text-xs" />}
        </div>
      </div>
    </button>
  );
}

export default PaymentMethodCard;
