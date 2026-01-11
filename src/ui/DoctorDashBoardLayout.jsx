// ui/DashboardLayout.jsx
import { Outlet } from "react-router-dom";
import DashboardSidebar from "./DashBoardSideBar.jsx";
import DashBoardHeader from "./DashBoardHeader.jsx";
import {
  Calendar,
  FileText,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Users,
} from "lucide-react";
import { useAuthUser } from "react-auth-kit";
import { usePatientSettings } from "../features/Patients/usePatientSettings";
import { useDoctorSettings } from "../features/Doctors/useDoctorSettings";

export default function DashboardLayout({ role = "patient" }) {
  const auth = useAuthUser();
  const authUser = auth()?.user;

  // Fetch latest patient data if user is a patient
  const { patientData } = usePatientSettings();
  // Fetch latest doctor data if user is a doctor
  const { doctorData } = useDoctorSettings();

  const doctorMenuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/doctor/dashboard" },
    { icon: Users, label: "Patients", path: "/doctor/patientList" },
    { icon: Calendar, label: "Calendar", path: "/doctor/calendar" },

    { icon: Settings, label: "Settings", path: "/doctor/settings" },
  ];

  const patientMenuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/patient/dashboard" },
    { icon: Calendar, label: "Upload Files", path: "/patient/upload-files" },
    {
      icon: FileText,
      label: "Medical History",
      path: "/patient/medical-history",
    },
    { icon: Settings, label: "Settings", path: "/patient/settings" },
  ];

  const menuItems = role === "doctor" ? doctorMenuItems : patientMenuItems;

  // Create user object for sidebar with fresh data
  let sidebarUser;

  if (role === "patient" && patientData) {
    sidebarUser = {
      name: `${patientData.firstName} ${patientData.lastName}`,
      role: "Patient",
      profilePicture: patientData.profilePicture,
    };
  } else if (role === "doctor" && doctorData) {
    sidebarUser = {
      name: `${doctorData.firstName} ${doctorData.lastName}`,
      role: "Doctor",
      profilePicture: doctorData.profilePicture,
    };
  } else {
    sidebarUser = {
      name:
        `${authUser?.firstName || ""} ${authUser?.lastName || ""}`.trim() ||
        "User",
      role: authUser?.role || role,
      profilePicture: authUser?.profilePicture,
    };
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar menuItems={menuItems} user={sidebarUser} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashBoardHeader />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
