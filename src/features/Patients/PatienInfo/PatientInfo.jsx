import PatientAvatar from "./PatientAvatar";
import PatientDetails from "./PatientDetails";
import ViewRecordButton from "./ViewRecordButton";
import DoctorChatButton from "./DoctorChatButton";
import ScheduleAppointmentButton from "./ScheduleAppointmentButton";

export default function PatientInfo({ patientData }) {
  const userData = patientData
    ? {
        id: patientData.patientId,
        name: `${patientData.firstName} ${patientData.lastName}`,
        age: patientData.age,
        status: "Under Observation",
        avatar: `${patientData.firstName[0]}${patientData.lastName[0]}`,
        gender: patientData.gender,
        profilePicture: patientData.profilePicture,
      }
    : {
        id: "p.1001",
        name: "Thomas Bailey",
        age: 45,
        status: "Under Observation",
        avatar: "TB",
      };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6">
        {/* Left Section: Avatar and Patient Info */}
        <div className="flex items-center gap-4 min-w-0">
          <PatientAvatar userData={userData} />
          <PatientDetails userData={userData} />
        </div>

        {/* Right Section: Action Buttons */}
        {/* <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 flex-shrink-0">
          <DoctorChatButton patientData={patientData} />
          <ViewRecordButton />
          <ScheduleAppointmentButton />
        </div> */}
      </div>
    </div>
  );
}
