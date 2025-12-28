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
export default function HealthVitalCard({ vital }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "normal":
        return "text-green-600 bg-green-50 border-green-200";
      case "warning":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "critical":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-12 h-12 rounded-lg flex items-center justify-center ${vital.iconBg}`}
          >
            <vital.icon className={`w-6 h-6 ${vital.iconColor}`} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{vital.name}</h3>
            <p className="text-xs text-gray-500">{vital.lastUpdated}</p>
          </div>
        </div>
      </div>

      <div className="mb-3">
        <p className="text-3xl font-bold text-gray-900">{vital.value}</p>
        <p className="text-sm text-gray-600">{vital.unit}</p>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <span
          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
            vital.status
          )}`}
        >
          {vital.statusLabel}
        </span>
        <span className="text-xs text-gray-500">
          Range: {vital.normalRange}
        </span>
      </div>
    </div>
  );
}
