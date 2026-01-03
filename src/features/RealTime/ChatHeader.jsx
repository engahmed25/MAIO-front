import React from "react";
import { Phone, Video, MoreVertical, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function ChatHeader({ peerDoctor, patient, isOnline }) {
  const navigate = useNavigate();

  // Get profile picture URL
  const getProfilePicture = (doctor) => {
    const picture = doctor?.profilePicture;
    if (picture) {
      // If it's already a full URL, use it
      if (picture.startsWith("http://") || picture.startsWith("https://")) {
        return picture;
      }
      // Otherwise, construct the URL from backend
      return `${
        import.meta.env.VITE_API_BASE_URL ||
        "https://tjdlts3w-5000.uks1.devtunnels.ms"
      }/${picture.replace(/\\/g, "/")}`;
    }
    return null;
  };

  const peerProfilePic = getProfilePicture(peerDoctor);

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm">
      {/* Left Section - Doctor Info */}
      <div className="flex items-center gap-3 flex-1">
        <button
          onClick={() => navigate(-1)}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>

        {/* Doctor Avatar */}
        <div className="relative">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-md overflow-hidden">
            {peerProfilePic ? (
              <img
                src={peerProfilePic}
                alt={peerDoctor?.firstName || "Doctor"}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to initials if image fails to load
                  e.target.style.display = "none";
                  e.target.parentElement.innerHTML = `<span class="text-white font-semibold text-sm">${
                    peerDoctor?.firstName?.charAt(0)?.toUpperCase() || "D"
                  }</span>`;
                }}
              />
            ) : (
              <span>
                {peerDoctor?.firstName?.charAt(0)?.toUpperCase() || "D"}
              </span>
            )}
          </div>
          {/* Online Status */}
          {isOnline && (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
          )}
        </div>

        {/* Doctor & Patient Info */}
        <div className="flex-1 min-w-0">
          <h2 className="text-sm font-semibold text-gray-900 truncate">
            Dr.{" "}
            {peerDoctor?.firstName && peerDoctor?.lastName
              ? `${peerDoctor.firstName} ${peerDoctor.lastName}`
              : peerDoctor?.name || "Loading..."}
          </h2>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="truncate">
              {peerDoctor?.specialization ||
                peerDoctor?.speciality ||
                "Specialist"}
            </span>
            {patient && (
              <>
                <span>•</span>
                <span className="truncate">
                  Patient:{" "}
                  {patient.firstName && patient.lastName
                    ? `${patient.firstName} ${patient.lastName}`
                    : patient.name || "Patient"}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Right Section - Patient Card & Actions */}
      <div className="flex items-center gap-2">
        {/* Patient Info Card (Desktop) */}
        {patient && (
          <div className="hidden lg:flex bg-blue-50 px-4 py-2 rounded-lg border border-blue-100">
            <div>
              <p className="text-xs text-gray-600 font-medium">Patient Case</p>
              <p className="text-sm font-semibold text-gray-900">
                {patient.name}
              </p>
              <p className="text-xs text-gray-500">
                {patient.age}y • {patient.gender} • {patient.condition || "N/A"}
              </p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {/* <div className="flex items-center gap-1">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Phone className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Video className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <MoreVertical className="w-5 h-5 text-gray-600" />
          </button>
        </div> */}
      </div>
    </div>
  );
}

export default ChatHeader;
