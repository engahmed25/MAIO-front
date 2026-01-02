import { Calendar, Clock, ChevronRight, User, Phone } from "lucide-react";
import Button from "../../ui/Button";
import { useDoctorAppointmentsByDate } from "./useDoctorAppointmentsByDate";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";

// TodaySchedule Component
function TodaySchedule({ selectedDate }) {
  const navigate = useNavigate();
  const { appointments, totalAppointments, isLoading, error } =
    useDoctorAppointmentsByDate(selectedDate);

  // Debug: Log appointments to see the data structure
  if (appointments.length > 0) {
    console.log(
      "First appointment FULL OBJECT:",
      JSON.stringify(appointments[0], null, 2)
    );
  }

  const formatDate = (date) => {
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();
    const isTomorrow =
      date.toDateString() ===
      new Date(today.getTime() + 86400000).toDateString();

    if (isToday) return "Today";
    if (isTomorrow) return "Tomorrow";

    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-center py-12">
          <Spinner />
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="text-center py-12">
          <p className="text-red-500 text-sm">
            Failed to load appointments. Please try again.
          </p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    const statusLower = status?.toLowerCase();
    switch (statusLower) {
      case "confirmed":
        return "bg-green-100 text-green-700";
      case "scheduled":
        return "bg-blue-100 text-blue-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "completed":
        return "bg-gray-100 text-gray-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-800">
            Schedule for {formatDate(selectedDate)}
          </h2>
        </div>
        <span className="text-sm text-gray-500">
          {totalAppointments} appointment
          {totalAppointments !== 1 ? "s" : ""}
        </span>
      </div>

      {appointments.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">
            No appointments scheduled for this day
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {appointments.map((apt) => (
            <div
              key={apt.appointmentId}
              className="flex flex-col lg:flex-row lg:items-start justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100 gap-4"
            >
              {/* Main Info Section */}
              <div className="flex-1 min-w-0">
                {/* Patient Name - Primary */}
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <h3 className="text-lg font-semibold text-gray-900 truncate">
                    {apt.patientName}
                  </h3>
                  <span className="text-sm text-gray-500 whitespace-nowrap">
                    ({apt.patientInfo.age}y, {apt.patientInfo.gender})
                  </span>
                </div>

                {/* Phone Number - Secondary */}
                <div className="flex items-center gap-2 mb-3">
                  <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <a
                    href={`tel:${apt.patientInfo.phoneNumber}`}
                    className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    {apt.patientInfo.phoneNumber}
                  </a>
                  {apt.patientInfo.emergencyContact && (
                    <>
                      <span className="text-gray-300">|</span>
                      <span className="text-xs text-gray-500">
                        Emergency: {apt.patientInfo.emergencyContact}
                      </span>
                    </>
                  )}
                </div>

                {/* Time and Status Row */}
                <div className="flex flex-wrap items-center gap-2 mb-3 pb-3 border-b border-gray-100">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                    {apt.appointmentDetails.startTime} -{" "}
                    {apt.appointmentDetails.endTime}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(
                      apt.appointmentDetails.status
                    )}`}
                  >
                    {apt.appointmentDetails.status}
                  </span>
                </div>

                {/* Reason for Visit */}
                {apt.appointmentDetails.reasonForVisit && (
                  <div className="text-sm text-gray-700 mb-2">
                    <span className="font-medium text-gray-600">Reason: </span>
                    {apt.appointmentDetails.reasonForVisit}
                  </div>
                )}

                {/* Medical Notes */}
                {apt.appointmentDetails.notes && (
                  <div className="text-sm text-gray-600 mb-2">
                    <span className="font-medium">Notes: </span>
                    {apt.appointmentDetails.notes}
                  </div>
                )}

                {/* Allergies Warning */}
                {apt.medicalInfo?.drugAllergies &&
                  apt.medicalInfo.drugAllergies !== "None" && (
                    <div className="mt-2 text-xs text-red-600 bg-red-50 px-3 py-1.5 rounded inline-flex items-center gap-1">
                      <span className="text-base">⚠️</span>
                      <span className="font-medium">
                        Drug Allergies: {apt.medicalInfo.drugAllergies}
                      </span>
                    </div>
                  )}

                {/* Chronic Diseases */}
                {apt.medicalInfo?.chronicDiseases &&
                  apt.medicalInfo.chronicDiseases.length > 0 && (
                    <div className="mt-2 text-xs text-gray-600 bg-gray-50 px-3 py-1.5 rounded">
                      <span className="font-medium">Chronic Diseases: </span>
                      {apt.medicalInfo.chronicDiseases.join(", ")}
                    </div>
                  )}

                {/* Current Medications */}
                {apt.medicalInfo?.currentMedications && (
                  <div className="mt-2 text-xs text-gray-600">
                    <span className="font-medium">Current Meds: </span>
                    {apt.medicalInfo.currentMedications}
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="flex-shrink-0">
                <Button
                  onClick={() => {
                    const patientId =
                      apt.patientId ||
                      apt.patientInfo?.patientId ||
                      apt.patient?.id;
                    console.log(
                      "Navigating to patient:",
                      patientId,
                      "Full apt:",
                      apt
                    );
                    navigate(`/doctor/patient/${patientId}`);
                  }}
                  className="flex items-center gap-1 px-4 py-2 text-sm w-full lg:w-auto justify-center"
                >
                  View Details
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TodaySchedule;
