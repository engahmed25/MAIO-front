import { Calendar, Eye } from "lucide-react";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";

function PatientCard({ patient }) {
  const navigate = useNavigate();
  const getStatusConfig = (status) => {
    const configs = {
      observation: {
        bg: "bg-yellow-50",
        text: "text-yellow-700",
        border: "border-yellow-200",
        label: "Under Observation",
      },
      critical: {
        bg: "bg-red-50",
        text: "text-red-700",
        border: "border-red-200",
        label: "Critical",
      },
      stable: {
        bg: "bg-green-50",
        text: "text-green-700",
        border: "border-green-200",
        label: "Stable",
      },
      referred: {
        bg: "bg-blue-50",
        text: "text-blue-700",
        border: "border-blue-200",
        label: "Referred",
      },
    };
    return configs[status] || configs.stable;
  };

  const statusConfig = getStatusConfig(patient.status);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      {/* Header with Avatar and Name */}
      <div className="flex flex-col md:flex-row items-start gap-4 mb-4">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-blue-600 font-semibold text-sm">
            {patient.initials}
          </span>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {patient.name}
          </h3>
          <p className="text-sm text-gray-500">Age: {patient.age}</p>
        </div>
      </div>

      {/* Status Badge */}
      <div className="mb-4">
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusConfig.bg} ${statusConfig.text} border ${statusConfig.border}`}
        >
          {statusConfig.label}
        </span>
      </div>

      {/* Last Appointment */}
      <div className="mb-4 pb-4 border-b border-gray-100">
        <p className="text-xs text-gray-500 mb-1">Last Appointment</p>
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <Calendar className="w-4 h-4" />
          <span>{patient.lastAppointment}</span>
        </div>
      </div>

      {/* View Profile Button */}
      <Button 
        onClick={() => navigate(`/doctor/patient/${patient.id}`)}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        <Eye className="w-4 h-4" />
        View Profile
      </Button>
    </div>
  );
}
export default PatientCard;
