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
export default function MedicalRecordRow({ record }) {
  const getTypeIcon = (type) => {
    switch (type) {
      case "Lab Results":
        return <FileText className="w-4 h-4 text-blue-500" />;
      case "Prescription":
        return <FileText className="w-4 h-4 text-green-500" />;
      case "Diagnosis":
        return <FileText className="w-4 h-4 text-purple-500" />;
      case "Procedure Note":
        return <FileText className="w-4 h-4 text-orange-500" />;
      default:
        return <FileText className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50">
      <td className="px-4 py-4 text-sm text-gray-600">{record.date}</td>
      <td className="px-4 py-4">
        <div className="flex items-center gap-2">
          {getTypeIcon(record.type)}
          <span className="text-sm text-gray-900">{record.type}</span>
        </div>
      </td>
      <td className="px-4 py-4 text-sm text-gray-900">{record.title}</td>
      <td className="px-4 py-4 text-sm text-gray-600">{record.doctor}</td>
      <td className="px-4 py-4">
        <span
          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
            record.status === "Active"
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-gray-50 text-gray-700 border border-gray-200"
          }`}
        >
          {record.status}
        </span>
      </td>
      <td className="px-4 py-4">
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Eye className="w-4 h-4 text-gray-600" />
        </button>
      </td>
    </tr>
  );
}
