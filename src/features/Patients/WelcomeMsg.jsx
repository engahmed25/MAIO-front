import { CheckCircle } from "lucide-react";
import { usePatientSettings } from "./usePatientSettings";
import Spinner from "../../ui/Spinner";

export default function WelcomeSection() {
  const { patientData, isLoading } = usePatientSettings();

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <div className="flex justify-center">
          <Spinner />
        </div>
      </div>
    );
  }

  const firstName = patientData?.firstName || "User";
  const lastName = patientData?.lastName || "";
  const fullName = `${firstName} ${lastName}`.trim();
  const initials = `${firstName.charAt(0)}${
    lastName.charAt(0) || ""
  }`.toUpperCase();
  const age = patientData?.age || "N/A";
  const userId = patientData?._id || "N/A";
  const status = patientData?.status || "pending";
  const profilePicture = patientData?.profilePicture;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      <div className="flex flex-col md:flex-row items-start justify-between">
        <div className="flex items-center gap-4">
          {profilePicture ? (
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/${profilePicture}`}
              alt={fullName}
              className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextElementSibling.style.display = "flex";
              }}
            />
          ) : null}
          <div
            className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center"
            style={{ display: profilePicture ? "none" : "flex" }}
          >
            <span className="text-blue-600 font-bold text-xl">{initials}</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              Welcome back, {firstName}!
            </h1>
            <p className="text-gray-600">
              Here's your health overview for today
            </p>
          </div>
        </div>
        <div className="">
          <div className="flex items-center gap-2 text-green-600 mb-1">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium capitalize">{status}</span>
          </div>
          <p className="text-sm text-gray-600">Age: {age} years</p>
          <p className="text-sm text-gray-600">ID: {userId}</p>
        </div>
      </div>
    </div>
  );
}
