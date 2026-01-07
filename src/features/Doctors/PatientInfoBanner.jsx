import React from "react";
import {
  ArrowLeft,
  User,
  MapPin,
  MessageSquare,
  Phone,
  Home,
} from "lucide-react";

// PatientInfoBanner Component
export default function PatientInfoBanner({
  patientName,
  patientId,
  profilePicture,
}) {
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const imageUrl = profilePicture ? `${backendURL}/${profilePicture}` : null;

  return (
    <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
      <div className="flex items-center gap-3">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={patientName}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-blue-600" />
          </div>
        )}
        <div>
          <p className="font-medium text-gray-900">Patient: {patientName}</p>
          <p className="text-sm text-gray-600">ID: {patientId}</p>
        </div>
      </div>
    </div>
  );
}
