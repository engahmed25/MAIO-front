import { useState } from "react";
import { Menu, X } from "lucide-react";
import Button from "./Button";
import { Link } from "react-router-dom";
import UserButton from "./UserButton";
import { useAuthUser, useIsAuthenticated } from "react-auth-kit";
import { usePatientSettings } from "../features/Patients/usePatientSettings";
import Notification from "../features/Notification/Notification";

export default function Header() {
  const [open, setOpen] = useState(false);
  const isAuthenticated = useIsAuthenticated();
  const auth = useAuthUser();
  const user = auth()?.user;

  // Fetch latest patient data if user is a patient
  const { patientData } = usePatientSettings();

  const baseUrl = import.meta.env.VITE_BACKEND_URL;

  // Use patientData if available (for patients), otherwise use auth user data
  const currentUser =
    user?.role === "patient" && patientData
      ? {
          ...user,
          profilePicture: patientData.profilePicture,
          firstName: patientData.firstName,
          lastName: patientData.lastName,
        }
      : user;

  console.log("Header render - Authenticated user:", currentUser);

  return (
    <nav className=" bg-[var(--backGround-color)] px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link>
          <div className="text-xl font-semibold flex items-center gap-1">
            <img
              src="./logo.png"
              alt="logo"
              className="w-12 md:w-12 rounded-xl object-cover"
            />
          </div>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-10 text-[var(--main-lite-color)] font-bold">
          <li
            className="text-[var(--main-color)] font-bold
transition-all duration-300 hover:scale-110 hover:text-[var(--main-color)]"
          >
            <Link to="/doctors">All Doctors</Link>
          </li>
          <li
            className="text-[var(--main-color)] font-bold
transition-all duration-300 hover:scale-110 hover:text-[var(--main-color)]"
          >
            {" "}
            <Link to="#">Find a Hospital</Link>
          </li>
          <li
            className="text-[var(--main-color)] font-bold
transition-all duration-300 hover:scale-110 hover:text-[var(--main-color)]"
          >
            {" "}
            <Link to="/contactus">Contact Us</Link>
          </li>
        </ul>

        {/* Right Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated() ? (
            <>
              <Notification />
              <UserButton
                profilePicture={`${baseUrl}/${currentUser?.profilePicture}`}
                role={currentUser?.role}
                userName={`${currentUser?.firstName} ${currentUser?.lastName}`}
              />
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline" className="px-4 py-1">
                  Log in
                </Button>
              </Link>
              <Link to="/register">
                <Button className="px-4 py-1">Sign up</Button>
              </Link>
            </>
          )}
        </div>
        {/* Mobile Hamburger */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden mt-4 space-y-4 bg-[var(--sec-color)] p-4 rounded-lg">
          <ul className="flex flex-col gap-4 text-[var(--main-lite-color)] font-bold">
            <li>
              <Link to="/doctors">All Doctors</Link>
            </li>
            <li>
              <Link to="#">Find a Hospital</Link>
            </li>
            <li>
              <Link to="/contactus">Contact Us</Link>
            </li>
          </ul>

          <div className="flex flex-col gap-3 pt-3">
            {isAuthenticated() ? (
              <>
                <div className="flex items-center justify-center pb-2">
                  <Notification />
                </div>
                <UserButton
                  profilePicture={`${baseUrl}/${currentUser?.profilePicture}`}
                  role={currentUser?.role}
                  userName={`${currentUser?.firstName} ${currentUser?.lastName}`}
                />
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button className="w-full">Log in</Button>
                </Link>
                <Link to="/register">
                  <Button className="w-full">Sign up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
