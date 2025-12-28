import React from "react";
import {
  ArrowLeft,
  User,
  MapPin,
  MessageSquare,
  Phone,
  Home,
} from "lucide-react";
export default function CareTeamSummary({
  totalDoctors,
  primaryPhysician,
  lastUpdated,
}) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
      <h3 className="font-semibold text-gray-900 text-lg mb-4">
        Care Team Summary
      </h3>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">
            Total Consulting Doctors
          </span>
          <span className="font-semibold text-gray-900">{totalDoctors}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Primary Care Physician</span>
          <span className="font-semibold text-gray-900">
            {primaryPhysician}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Last Updated</span>
          <span className="font-semibold text-gray-900">{lastUpdated}</span>
        </div>
      </div>
    </div>
  );
}
