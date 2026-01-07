import React from "react";
import {
  Calendar,
  Clock,
  TrendingUp,
  TrendingDown,
  Minus,
  CheckCircle,
  Users,
  ClipboardList,
} from "lucide-react";
import { useDoctorAppointmentsByDate } from "./useDoctorAppointmentsByDate";

function TodaysOverview({ selectedDate, totalPatients }) {
  const { appointments, totalAppointments, isLoading } =
    useDoctorAppointmentsByDate(selectedDate);

  // Calculate stats from API data
  const confirmedCount = appointments.filter(
    (apt) => apt.appointmentDetails.status.toLowerCase() === "confirmed"
  ).length;

  const pendingCount = appointments.filter(
    (apt) =>
      apt.appointmentDetails.status.toLowerCase() === "pending" ||
      apt.appointmentDetails.status.toLowerCase() === "scheduled"
  ).length;

  const stats = [
    {
      title: "Total Appointments",
      value: isLoading ? "..." : totalAppointments,
      icon: Calendar,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-100",
      change:
        selectedDate.toDateString() === new Date().toDateString()
          ? "Today"
          : "Selected date",
      trend: "neutral",
    },
    {
      title: "Confirmed",
      value: isLoading ? "..." : confirmedCount,
      icon: CheckCircle,
      iconColor: "text-green-600",
      iconBg: "bg-green-100",
      change: "Ready to see",
      trend: "up",
    },
    {
      title: "Pending/Scheduled",
      value: isLoading ? "..." : pendingCount,
      icon: Clock,
      iconColor: "text-yellow-600",
      iconBg: "bg-yellow-100",
      change: "Awaiting confirmation",
      trend: "neutral",
    },
    {
      title: "Patients Under Care",
      value: totalPatients || 0,
      icon: Users,
      iconColor: "text-purple-600",
      iconBg: "bg-purple-100",
      change: "Total active patients",
      trend: "neutral",
    },
  ];

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Today's Overview
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <span className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </span>
                </div>
                <div className={`p-2 rounded-lg ${stat.iconBg}`}>
                  <Icon className={`w-5 h-5 ${stat.iconColor}`} />
                </div>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {stat.value}
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-gray-500">{stat.change}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TodaysOverview;
