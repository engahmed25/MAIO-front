import React from "react";
import {
  ArrowLeft,
  User,
  MapPin,
  MessageSquare,
  Phone,
  Home,
} from "lucide-react";

export default function PatientDoctorCard({ doctor }) {
  const getSpecialtyColor = (specialty) => {
    const colors = {
      "General Practice": "bg-teal-50 text-teal-700 border-teal-200",
      Neurology: "bg-cyan-50 text-cyan-700 border-cyan-200",
      Pediatrics: "bg-pink-50 text-pink-700 border-pink-200",
      Oncology: "bg-teal-50 text-teal-700 border-teal-200",
    };
    return colors[specialty] || "bg-gray-50 text-gray-700 border-gray-200";
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
        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700">
          <MessageSquare className="w-4 h-4" />
          Message
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
