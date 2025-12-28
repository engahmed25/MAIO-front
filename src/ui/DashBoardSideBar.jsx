import React, { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Calendar,
  MessageSquare,
  Settings,
  User,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

// DashBoardSideBar Component
function DashBoardSideBar({
  menuItems = [],
  user = { name: "User", role: "Role" },
}) {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  // const menuItems = [
  //   { icon: LayoutDashboard, label: "Dashboard", path: "/doctor/dashboard" },
  //   { icon: Users, label: "Patients", path: "/doctor/patientList" },
  //   { icon: Calendar, label: "Calendar", path: "/doctor/calendar" },
  //   { icon: MessageSquare, label: "Messages", path: "/doctor/messages" },
  //   { icon: Settings, label: "Settings", path: "/doctor/settings" },
  // ];

  return (
    <div
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      className={`bg-white border-r border-gray-200 h-screen flex flex-col ${
        isOpen ? "w-64" : "w-20"
      } transition-width duration-300 ease-in-out`}
    >
      {/* Logo */}
      <div
        className={`p-6 border-b border-gray-200 ${
          isOpen ? "" : "place-items-center"
        }`}
      >
        <div className={`flex items-center gap-3 `}>
          <Link to={"/"}>
            <img src="/logo.png" alt="Logo" className="w-8 h-8" />
            <div>
              {isOpen && (
                <>
                  <h1 className="text-lg font-bold text-gray-900">MAIO</h1>
                  <p className="text-sm text-gray-500">Doctor's Portal</p>
                </>
              )}
            </div>
          </Link>
        </div>
      </div>

      {/* Navigation */}
      <nav className={`flex-1 p-4 ${isOpen ? "" : "place-items-center"}`}>
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.label;
            return (
              <li key={item.label}>
                <button
                  onClick={() => {
                    setActiveItem(item.label);
                    navigate(item.path);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors cursor-pointer ${
                    isActive
                      ? "bg-[var(--main-color)] text-white font-bold"
                      : "text-gray-600 hover:bg-[var(--main-color)] hover:text-white"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {isOpen && <span>{item.label}</span>}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 px-2 py-2">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-blue-600" />
          </div>
          {isOpen && (
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Dr. Smith</p>
              <p className="text-xs text-gray-500">Cardiologist</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashBoardSideBar;
