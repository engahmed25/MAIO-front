import React, { useState } from "react";
import {
  LayoutDashboard,
  Calendar,
  MessageSquare,
  FileText,
  Settings,
  Search,
  Bell,
  User,
  Clock,
  MapPin,
  Edit,
  Trash2,
  Plus,
  ChevronRight,
  Download,
  Eye,
  CheckCircle,
  Activity,
  Heart,
  Droplet,
  Weight,
} from "lucide-react";
export default function MedicationCard({ medication }) {
  const isCompleted = medication.status === "Completed";

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3
            className={`font-semibold text-gray-900 mb-1 ${
              isCompleted ? "line-through" : ""
            }`}
          >
            {medication.name}
          </h3>
          <p className="text-sm text-gray-600 mb-2">{medication.dosage}</p>
        </div>
        <span
          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
            medication.status === "Active"
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-gray-50 text-gray-700 border border-gray-200"
          }`}
        >
          {medication.status}
        </span>
      </div>

      <div className="space-y-2 mb-4 text-sm">
        <div className="flex items-center gap-2 text-gray-600">
          <Clock className="w-4 h-4" />
          <span className={isCompleted ? "line-through" : ""}>
            {medication.frequency}
          </span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <User className="w-4 h-4" />
          <span>Prescribed by {medication.doctor}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>Since {medication.startDate}</span>
        </div>
      </div>

      {medication.nextDose && medication.nextDose !== "-" && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-xs text-blue-600 font-medium mb-1">Next Dose</p>
          <p className="text-sm text-blue-900">{medication.nextDose}</p>
        </div>
      )}
    </div>
  );
}
