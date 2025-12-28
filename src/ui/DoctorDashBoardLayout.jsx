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

export default function DashboardLayout({ role = "patient" }) {
  const doctorMenuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/doctor/dashboard" },
    { icon: Users, label: "Patients", path: "/doctor/patientList" },
    { icon: Calendar, label: "Calendar", path: "/doctor/calendar" },
    { icon: MessageSquare, label: "Messages", path: "/doctor/messages" },
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
  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar menuItems={menuItems} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashBoardHeader />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
