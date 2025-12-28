import { FiHeart } from "react-icons/fi";
import HealthMetricCard from "./HealthMetricCard.jsx";
import MedicationSummaryCard from "./MedicationSummaryCard.jsx";
import DoctorNotesCard from "./DoctorNotesCard.jsx";

function buildSparkPath(values, width, height) {
  if (!values || values.length === 0) return `M0,${height}`;

  const minValue = Math.min(...values) - 2;
  const maxValue = Math.max(...values) + 2;
  const range = maxValue - minValue || 1;

  return values
    .map((value, index) => {
      const x = (index / Math.max(values.length - 1, 1)) * width;
      const y = height - ((value - minValue) / range) * height;
      return `${index === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

function HealthAnalysis({
  heartRateValue,
  heartRateTrend = [],
  heartStatus,
  heartBadge,
  bmi,
  lastCheckup,
  medicationSummary,
  doctorNotes,
}) {
  const sparkWidth = 160;
  const sparkHeight = 42;
  const sparkPath = buildSparkPath(heartRateTrend, sparkWidth, sparkHeight);

  return (
    <div className="bg-white/90 border border-[#dfe7ff] rounded-2xl shadow-lg shadow-[#0057ff1a] p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Health Analysis</h3>
        <span className="text-xs text-slate-500">Updated 2h ago</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <HealthMetricCard
          label="Heart Rate"
          value={heartRateValue}
          statusText={
            heartStatus ? (
              <>
                <FiHeart /> {heartStatus}
              </>
            ) : null
          }
          statusClassName="text-xs text-emerald-600 font-semibold flex items-center gap-1"
          badge={heartBadge}
          className="bg-[#F7FAFF]"
        >
          <svg
            viewBox={`0 0 ${sparkWidth} ${sparkHeight}`}
            className="w-full h-16 mt-3"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="heartLine" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="#0057FF" />
                <stop offset="100%" stopColor="#7fb2ff" />
              </linearGradient>
              <linearGradient id="heartFill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#0057FF" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#0057FF" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d={sparkPath}
              fill="none"
              stroke="url(#heartLine)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d={`${sparkPath} L ${sparkWidth},${sparkHeight} L 0,${sparkHeight} Z`}
              fill="url(#heartFill)"
            />
          </svg>
        </HealthMetricCard>
        <div className="grid grid-cols-2 gap-3">
          <HealthMetricCard
            label="BMI"
            value={bmi?.value}
            statusText={bmi?.statusText}
          />
          <HealthMetricCard
            label="Last Checkup"
            value={lastCheckup?.date}
            statusText={lastCheckup?.doctor}
            statusClassName="text-xs text-slate-500"
          />
          <div className="p-3 rounded-xl border border-[#e5edff] bg-white col-span-2 space-y-3">
            <MedicationSummaryCard summary={medicationSummary} />
            <DoctorNotesCard notes={doctorNotes} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HealthAnalysis;
