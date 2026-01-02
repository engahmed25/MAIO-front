import { useEffect, useRef, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import UserList from "./UserList";
import { useNavigate } from "react-router-dom";
import { LogOut, Settings, User } from "lucide-react";
import { useLogout } from "../features/Authentication/useLogout";

function UserButton({ profilePicture, role, userName }) {
  const [isOpen, setIsOpen] = useState(false);
  const { logout, isLoading: isLoggingOut } = useLogout();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleToggle() {
    setIsOpen(!isOpen);
  }

  const handleLogout = () => {
    logout();
  };
  function goToDashboard() {
    if (role === "doctor") {
      navigate("/doctor/dashboard");
    } else if (role === "patient") {
      navigate("/patient/dashboard");
    }
    setIsOpen(false);
  }

  function goToSettings() {
    if (role === "doctor") {
      navigate("/doctor/settings");
    } else if (role === "patient") {
      navigate("/patient/settings");
    }
    setIsOpen(false);
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* User Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
      >
        {profilePicture ? (
          <img
            src={profilePicture}
            alt={userName}
            className="w-10 h-10 rounded-full object-cover border-2 border-[var(--main-color)]"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-[var(--main-color)] flex items-center justify-center text-white font-bold">
            {userName?.charAt(0)?.toUpperCase() || "U"}
          </div>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          {/* User Info */}
          <div className="px-4 py-3 border-b border-gray-200">
            <p className="font-semibold text-gray-800">{userName}</p>
            <p className="text-sm text-gray-500 capitalize">{role}</p>
          </div>

          {/* Menu Items */}
          <button
            onClick={goToDashboard}
            className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2 text-gray-700"
          >
            <User size={18} />
            Dashboard
          </button>

          <button
            onClick={goToSettings}
            className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2 text-gray-700"
          >
            <Settings size={18} />
            Settings
          </button>

          <hr className="my-2" />

          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-full px-4 py-2 text-left hover:bg-red-50 flex items-center gap-2 text-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <LogOut size={18} />
            {isLoggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>
      )}
    </div>
  );
}

export default UserButton;
