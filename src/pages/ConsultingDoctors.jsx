import { ArrowLeft } from "lucide-react";
import CareTeamSummary from "../features/Doctors/CareTeamSummary";
import NavigationButtons from "../features/Doctors/NavigationButtons";
import PatientDoctorCard from "../features/Doctors/PatientDoctorCard";
import PatientInfoBanner from "../features/Doctors/PatientInfoBanner";

// Main ConsultingDoctors Component
export default function ConsultingDoctors() {
  const patientInfo = {
    name: "John Doe",
    id: "#PAT-2024-001",
  };

  const doctors = [
    {
      id: 1,
      name: "Dr. Alex Johnson",
      initials: "DAJ",
      specialty: "General Practice",
      location: "Main Clinic, Floor 1",
    },
    {
      id: 2,
      name: "Dr. Sarah Chen",
      initials: "DSC",
      specialty: "Neurology",
      location: "Specialty Building A",
    },
    {
      id: 3,
      name: "Dr. Michael Ortiz",
      initials: "DMO",
      specialty: "Pediatrics",
      location: "Children's Wing, 3rd Floor",
    },
    {
      id: 4,
      name: "Dr. Lisa Wong",
      initials: "DLW",
      specialty: "Oncology",
      location: "Cancer Center, Level 2",
    },
  ];

  const careTeamInfo = {
    totalDoctors: 4,
    primaryPhysician: "Dr. Evelyn Reed",
    lastUpdated: "Today at 10:30 AM",
  };

  const handleBackToProfile = () => {
    console.log("Navigate to patient profile");
  };

  const handleReturnToDashboard = () => {
    console.log("Navigate to dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with Back Button */}
        <div className="mb-6">
          <button
            onClick={handleBackToProfile}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Consulting Doctors
          </h1>
          <p className="text-gray-600">
            Medical professionals currently involved in this patient's care
          </p>
        </div>

        {/* Patient Info Banner */}
        <PatientInfoBanner
          patientName={patientInfo.name}
          patientId={patientInfo.id}
        />

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {doctors.map((doctor) => (
            <PatientDoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>

        {/* Care Team Summary */}
        <CareTeamSummary
          totalDoctors={careTeamInfo.totalDoctors}
          primaryPhysician={careTeamInfo.primaryPhysician}
          lastUpdated={careTeamInfo.lastUpdated}
        />

        {/* Navigation Buttons */}
        <NavigationButtons
          onBackToProfile={handleBackToProfile}
          onReturnToDashboard={handleReturnToDashboard}
        />
      </div>
    </div>
  );
}
