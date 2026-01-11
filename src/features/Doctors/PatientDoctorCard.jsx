import React, { useState } from "react";
import {
  ArrowLeft,
  User,
  MapPin,
  MessageSquare,
  Phone,
  Home,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthUser } from "react-auth-kit";
import { getOrCreateRoom } from "../../services/apiChat";
import toast from "react-hot-toast";

export default function PatientDoctorCard({ doctor, patient }) {
  const navigate = useNavigate();
  const authUser = useAuthUser();
  const currentUser = authUser()?.user;
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);

  const getSpecialtyColor = (specialty) => {
    const colors = {
      "General Practice": "bg-teal-50 text-teal-700 border-teal-200",
      Neurology: "bg-cyan-50 text-cyan-700 border-cyan-200",
      Pediatrics: "bg-pink-50 text-pink-700 border-pink-200",
      Oncology: "bg-teal-50 text-teal-700 border-teal-200",
    };
    return colors[specialty] || "bg-gray-50 text-gray-700 border-gray-200";
  };

  const handleStartChat = async () => {
    if (!patient) {
      toast.error("Patient information is missing");
      return;
    }

    const authData = authUser();
    const userId =
      authData?.user?.userId ||
      authData?.user?._id ||
      authData?.user?.id ||
      authData?.userId ||
      authData?._id ||
      authData?.id;

    console.log("========================================");
    console.log("🚀 PatientDoctorCard - handleStartChat");
    console.log("========================================");
    console.log("📝 Full authData:", authData);
    console.log("👤 Current User (Logged in doctor):", authData?.user);
    console.log("🔑 JWT userId:", authData?.user?.userId);
    console.log("🆔 My ID (userId):", userId);
    console.log("👨‍⚕️ Peer Doctor (Doctor I want to message):", doctor);
    console.log("🆔 Peer Doctor ID being sent:", doctor.id);
    console.log("👥 Patient:", patient);
    console.log("⚠️ IMPORTANT: Sending doctorBId =", doctor.id);
    console.log("⚠️ Backend will identify me from JWT token");
    console.log("========================================");

    setIsCreatingRoom(true);
    try {
      console.log("Patient object:", patient);

      // Try to get patient ID from various possible fields
      const patientId =
        patient._id ||
        patient.id ||
        patient.patientId ||
        patient.userId ||
        (typeof patient === "string" ? patient : null);

      if (!patientId) {
        console.error("Could not find patient ID in:", patient);
        toast.error("Patient ID is missing");
        setIsCreatingRoom(false);
        return;
      }

      // Prepare patient data with ID and name
      const patientData = {
        patientId: patientId,
        name:
          patient.firstName && patient.lastName
            ? `${patient.firstName} ${patient.lastName}`
            : patient.name || "Patient",
      };

      console.log("Creating room with:", {
        doctorBId: doctor.id,
        patientData: patientData,
      });

      // Create or get existing room
      const response = await getOrCreateRoom(doctor.id, patientData);

      const roomId = response.room?._id || response.roomId;

      if (!roomId) {
        toast.error("Failed to create chat room");
        return;
      }

      // Navigate to chat page with room ID and doctor info
      navigate(`/doctor/chat/${roomId}`, {
        state: {
          patient,
          peerDoctor: {
            _id: doctor.id,
            firstName: doctor.name.replace("Dr. ", "").split(" ")[0],
            lastName: doctor.name
              .replace("Dr. ", "")
              .split(" ")
              .slice(1)
              .join(" "),
            specialization: doctor.specialty,
            profilePicture: doctor.profilePicture,
          },
        },
      });
    } catch (error) {
      console.error("Error creating room:", error);
      console.error("Error response:", error.response?.data);
      console.error("Error status:", error.response?.status);

      const errorMessage =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Failed to start chat. Please try again.";

      toast.error(errorMessage);
    } finally {
      setIsCreatingRoom(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
      {/* Doctor Header */}
      <div className="flex items-start gap-3 mb-4">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-blue-600 font-semibold text-sm">
            {doctor.initials}
          </span>
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-base mb-1">
            {doctor.name}
          </h3>
          <p className="text-sm text-gray-600">{doctor.specialty}</p>
        </div>
      </div>

      {/* Location */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
        <MapPin className="w-4 h-4 text-gray-400" />
        <span>{doctor.location}</span>
      </div>

      {/* Specialty Badge */}
      <div className="mb-4">
        <span
          className={`inline-block px-3 py-1 rounded-md text-xs font-medium border ${getSpecialtyColor(
            doctor.specialty
          )}`}
        >
          {doctor.specialty}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 mb-4 pb-4 border-b border-gray-100">
        <button
          onClick={handleStartChat}
          disabled={isCreatingRoom}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed relative"
        >
          <MessageSquare className="w-4 h-4" />
          {isCreatingRoom ? "Opening..." : "Message"}
          {/* Unread Message Badge */}
          {doctor.unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full min-w-[20px] h-5 px-1 flex items-center justify-center font-bold shadow-md border-2 border-white">
              {doctor.unreadCount > 99 ? "99+" : doctor.unreadCount}
            </span>
          )}
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700">
          <Phone className="w-4 h-4" />
          Call
        </button>
      </div>

      {/* Availability Status */}
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        <span className="text-sm text-gray-600">
          Available for consultation
        </span>
      </div>
    </div>
  );
}
