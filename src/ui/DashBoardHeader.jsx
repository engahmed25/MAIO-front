import { Search } from "lucide-react";
import UserButton from "./UserButton";
import Notification from "../features/Notification/Notification";

import { useAuthUser } from "react-auth-kit";
import { usePatientSettings } from "../features/Patients/usePatientSettings";
import { useDoctorSettings } from "../features/Doctors/useDoctorSettings";
import NotificationBell from "../features/Notifications/components/NotificationBell";

function DashBoardHeader() {
  const auth = useAuthUser();
  const authUser = auth()?.user;

  // Fetch latest patient data if user is a patient
  const { patientData } = usePatientSettings();
  // Fetch latest doctor data if user is a doctor
  const { doctorData } = useDoctorSettings();

  const baseUrl = import.meta.env.VITE_BACKEND_URL;

  // Use patientData if available (for patients), doctorData for doctors, otherwise use auth user data
  let currentUser = authUser;

  if (authUser?.role === "patient" && patientData) {
    currentUser = {
      ...authUser,
      profilePicture: patientData.profilePicture,
      firstName: patientData.firstName,
      lastName: patientData.lastName,
    };
  } else if (authUser?.role === "doctor" && doctorData) {
    currentUser = {
      ...authUser,
      profilePicture: doctorData.profilePicture,
      firstName: doctorData.firstName,
      lastName: doctorData.lastName,
    };
  }

  return (
    <div className="bg-white border-b border-gray-200 px-8 py-4">
      <div className="flex items-center justify-between">
        {/* Search Bar */}
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search patients, appointments..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Right side - Notifications and User */}
        <div className="flex items-center gap-4">
          {/* Notification Bell */}
          {/* <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
              3
            </span> 
          </button> */}
          <Notification/>

          {/* User Button */}
          <UserButton
            profilePicture={
              currentUser?.profilePicture
                ? `${baseUrl}/${currentUser.profilePicture}`
                : null
            }
            role={currentUser?.role}
            userName={`${currentUser?.firstName || ""} ${
              currentUser?.lastName || ""
            }`.trim()}
          />
        </div>
      </div>
    </div>
  );
}

export default DashBoardHeader;
