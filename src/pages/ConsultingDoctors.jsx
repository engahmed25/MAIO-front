import { ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthUser } from "react-auth-kit";
import CareTeamSummary from "../features/Doctors/CareTeamSummary";
import NavigationButtons from "../features/Doctors/NavigationButtons";
import PatientDoctorCard from "../features/Doctors/PatientDoctorCard";
import PatientInfoBanner from "../features/Doctors/PatientInfoBanner";
import { usePatientDoctors } from "../features/Patients/usePatientDoctors";
import { usePatientPublicProfile } from "../features/Patients/usePatientPublicProfile";
import { useDoctorUnreadCounts } from "../features/RealTime/useDoctorUnreadCounts";
import Spinner from "../ui/Spinner";

// Main ConsultingDoctors Component
export default function ConsultingDoctors() {
  const navigate = useNavigate();
  const location = useLocation();
  const authUser = useAuthUser();
  const user = authUser()?.user;

  // Get patientId from navigation state or from the authenticated user
  const patientId = location.state?.patientId || user?.patientId;

  // Fetch patient's doctors using the custom hook
  const { doctors, isLoading, error } = usePatientDoctors(patientId);

  // Fetch patient public profile
  const {
    patient,
    isLoading: isLoadingPatient,
    error: patientError,
  } = usePatientPublicProfile(patientId);

  // Fetch unread message counts for all doctors
  const { unreadCountsByDoctor } = useDoctorUnreadCounts();

  const patientInfo = {
    name:
      patient?.firstName && patient?.lastName
        ? `${patient.firstName} ${patient.lastName}`
        : "Patient",
    id: patientId || "N/A",
  };

  const careTeamInfo = {
    totalDoctors: doctors.length,
    primaryPhysician:
      doctors.length > 0
        ? `Dr. ${doctors[0].firstName} ${doctors[0].lastName}`
        : "N/A",
    lastUpdated:
      "Today at " +
      new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
  };

  const handleBackToProfile = () => {
    if (patientId) {
      navigate(`/doctor/patient/${patientId}`);
    } else {
      navigate(-1); // Go back to previous page
    }
  };

  const handleReturnToDashboard = () => {
    navigate("/doctor/dashboard");
  };

  // Transform API doctor data to match PatientDoctorCard format
  const transformedDoctors = doctors.map((doctor) => ({
    id: doctor._id,
    name: `Dr. ${doctor.firstName} ${doctor.lastName}`,
    initials: `${doctor.firstName.charAt(0)}${doctor.lastName.charAt(0)}`,
    specialty: doctor.specialization,
    location: doctor.clinicAddress,
    profilePicture: doctor.profilePicture,
    ratePerSession: doctor.ratePerSession,
    rating: doctor.rating,
    yearsOfExperience: doctor.yearsOfExperience,
    unreadCount: unreadCountsByDoctor[doctor._id] || 0, // Add unread message count
  }));

  if (isLoading || isLoadingPatient) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (error || patientError) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded">
            <p className="font-medium">Error loading data</p>
            <p className="text-sm">{error?.message || patientError?.message}</p>
          </div>
        </div>
      </div>
    );
  }

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
          profilePicture={patient?.profilePicture}
        />

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {transformedDoctors.length > 0 ? (
            transformedDoctors.map((doctor) => (
              <PatientDoctorCard
                key={doctor.id}
                doctor={doctor}
                patient={patient}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">
                No doctors found for this patient
              </p>
            </div>
          )}
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
