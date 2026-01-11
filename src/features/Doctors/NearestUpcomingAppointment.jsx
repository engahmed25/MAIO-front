import { Calendar, Clock, User, Phone, ChevronRight, Bell } from "lucide-react";
import Button from "../../ui/Button";
import { useDoctorMonthAppointments } from "./useDoctorMonthAppointments";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";

function NearestUpcomingAppointment() {
  const navigate = useNavigate();

  // Get current month to fetch appointments
  const currentMonth = new Date();
  const { allAppointments, isLoading } =
    useDoctorMonthAppointments(currentMonth);

  // Find the nearest upcoming appointment
  const now = new Date();
  const upcomingAppointments = allAppointments
    .filter((apt) => {
      const aptDate = new Date(apt.appointmentDate);
      return aptDate >= now;
    })
    .sort((a, b) => {
      const dateA = new Date(a.appointmentDate);
      const dateB = new Date(b.appointmentDate);
      return dateA - dateB;
    });

  const appointment = upcomingAppointments[0] || null;

  // Show loading state
  if (isLoading) {
    return (
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg border border-blue-400 p-6 mb-6">
        <div className="flex items-center justify-center py-8">
          <Spinner />
        </div>
      </div>
    );
  }

  // If no appointment, don't show anything
  if (!appointment) {
    return null;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const aptDate = new Date(date);
    aptDate.setHours(0, 0, 0, 0);

    if (aptDate.getTime() === today.getTime()) {
      return "Today";
    }
    if (aptDate.getTime() === tomorrow.getTime()) {
      return "Tomorrow";
    }

    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStatusColor = (status) => {
    const statusLower = status?.toLowerCase();
    switch (statusLower) {
      case "confirmed":
        return "bg-green-500 text-white";
      case "scheduled":
        return "bg-blue-400 text-white";
      case "pending":
        return "bg-yellow-400 text-gray-900";
      default:
        return "bg-gray-400 text-white";
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg border border-blue-400 p-6 mb-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Bell className="w-6 h-6 text-white animate-pulse" />
        <h2 className="text-xl font-bold text-white">
          Nearest Upcoming Appointment
        </h2>
      </div>

      {/* Appointment Card */}
      <div className="bg-white rounded-lg p-5 shadow-md">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
          {/* Main Info Section */}
          <div className="flex-1 min-w-0">
            {/* Date Badge */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-lg">
                <Calendar className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-semibold text-blue-900">
                  {formatDate(appointment.appointmentDate)}
                </span>
              </div>
              <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-lg">
                <Clock className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-semibold text-blue-900">
                  {appointment.appointmentDetails.startTime} -{" "}
                  {appointment.appointmentDetails.endTime}
                </span>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                  appointment.appointmentDetails.status
                )}`}
              >
                {appointment.appointmentDetails.status}
              </span>
            </div>

            {/* Patient Info */}
            <div className="border-l-4 border-blue-500 pl-4 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <User className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <h3 className="text-xl font-bold text-gray-900">
                  {appointment.patientName}
                </h3>
                <span className="text-sm text-gray-500">
                  ({appointment.patientInfo.age}y,{" "}
                  {appointment.patientInfo.gender})
                </span>
              </div>

              {/* Phone Number */}
              <div className="flex items-center gap-2 mb-2">
                <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <a
                  href={`tel:${appointment.patientInfo.phoneNumber}`}
                  className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
                >
                  {appointment.patientInfo.phoneNumber}
                </a>
                {appointment.patientInfo.emergencyContact && (
                  <>
                    <span className="text-gray-300">|</span>
                    <span className="text-xs text-gray-500">
                      Emergency: {appointment.patientInfo.emergencyContact}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Reason for Visit */}
            {appointment.appointmentDetails.reasonForVisit && (
              <div className="bg-gray-50 rounded-lg p-3 mb-3">
                <span className="font-semibold text-gray-700 text-sm">
                  Reason for Visit:{" "}
                </span>
                <span className="text-gray-900 text-sm">
                  {appointment.appointmentDetails.reasonForVisit}
                </span>
              </div>
            )}

            {/* Medical Notes */}
            {appointment.appointmentDetails.notes && (
              <div className="bg-gray-50 rounded-lg p-3 mb-3">
                <span className="font-semibold text-gray-700 text-sm">
                  Notes:{" "}
                </span>
                <span className="text-gray-900 text-sm">
                  {appointment.appointmentDetails.notes}
                </span>
              </div>
            )}

            {/* Medical Alerts */}
            <div className="flex flex-wrap gap-2">
              {/* Drug Allergies Warning */}
              {appointment.medicalInfo?.drugAllergies &&
                appointment.medicalInfo.drugAllergies !== "None" && (
                  <div className="text-xs text-red-700 bg-red-100 border border-red-300 px-3 py-2 rounded-lg flex items-center gap-2">
                    <span className="text-base">⚠️</span>
                    <span className="font-semibold">
                      Drug Allergies: {appointment.medicalInfo.drugAllergies}
                    </span>
                  </div>
                )}

              {/* Chronic Diseases */}
              {appointment.medicalInfo?.chronicDiseases &&
                appointment.medicalInfo.chronicDiseases.length > 0 && (
                  <div className="text-xs text-orange-700 bg-orange-50 border border-orange-200 px-3 py-2 rounded-lg flex items-center gap-2">
                    <span className="text-base">♿</span>
                    <span className="font-semibold">Chronic Diseases: </span>
                    <span>
                      {appointment.medicalInfo.chronicDiseases.join(", ")}
                    </span>
                  </div>
                )}

              {/* Current Medications */}
              {appointment.medicalInfo?.currentMedications && (
                <div className="text-xs text-blue-700 bg-blue-50 border border-blue-200 px-3 py-2 rounded-lg flex items-center gap-2">
                  <span className="text-base">💊</span>
                  <span className="font-semibold">Current Medications: </span>
                  <span>{appointment.medicalInfo.currentMedications}</span>
                </div>
              )}
            </div>
          </div>

          {/* Action Button */}
          <div className="flex-shrink-0 flex items-center">
            <Button
              onClick={() => {
                const patientId =
                  appointment.patientId ||
                  appointment.patientInfo?.patientId ||
                  appointment.patient?.id;
                console.log("Navigating to patient profile:", patientId);
                navigate(`/doctor/patient/${patientId}`);
              }}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all w-full lg:w-auto justify-center"
            >
              View Profile
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NearestUpcomingAppointment;
