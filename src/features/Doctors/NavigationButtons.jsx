import React from "react";
import {
  ArrowLeft,
  User,
  MapPin,
  MessageSquare,
  Phone,
  Home,
} from "lucide-react";
export default function NavigationButtons({
  onBackToProfile,
  onReturnToDashboard,
}) {
  return (
    <div className="flex flex-wrap gap-4">
      <button
        onClick={onBackToProfile}
        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="font-medium">Back to Patient Profile</span>
      </button>

      <button
        onClick={onReturnToDashboard}
        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <Home className="w-4 h-4" />
        <span className="font-medium">Return to Dashboard</span>
      </button>
    </div>
  );
}
