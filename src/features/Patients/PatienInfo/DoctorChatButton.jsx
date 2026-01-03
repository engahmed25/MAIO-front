import { MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthUser } from "react-auth-kit";
import { getOrCreateRoom } from "../../../services/apiChat";
import { useState } from "react";
import toast from "react-hot-toast";

export default function DoctorChatButton({ patientData }) {
  const navigate = useNavigate();
  const authUser = useAuthUser();
  const currentUser = authUser()?.user;
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);

  const handleChatClick = async () => {
    if (!patientData) {
      toast.error("Patient information is missing");
      return;
    }

    // Get the patient's primary doctor or first doctor from their doctors list
    // For now, we'll need to get this from the patient's doctors
    // This assumes the patient has a list of doctors they're consulting with

    toast.info("Please select a doctor from the consulting doctors page");
    // Navigate to consulting doctors page where they can select which doctor to chat with
    navigate("/doctor/consulting-doctors", {
      state: { patientId: patientData.patientId || patientData._id },
    });
  };

  return (
    <>
      {/* Doctor Chat Button */}
      <button
        onClick={handleChatClick}
        disabled={isCreatingRoom}
        className="flex items-center justify-center sm:justify-start gap-2 px-3 sm:px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm font-medium whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <MessageCircle size={18} />
        <span className="hidden sm:inline">
          {isCreatingRoom ? "Opening..." : "Doctor Chat"}
        </span>
        <span className="sm:hidden">{isCreatingRoom ? "..." : "Chat"}</span>
      </button>
    </>
  );
}
