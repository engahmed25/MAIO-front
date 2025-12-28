import React, { useState } from "react";
import {
  Calendar,
  Clock,
  TrendingUp,
  TrendingDown,
  Minus,
  ChevronRight,
} from "lucide-react";

function TodaysOverview({ selectedDate, appointmentsData }) {
  const dateKey = `${selectedDate.getFullYear()}-${String(
    selectedDate.getMonth() + 1
  ).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`;
  const todayAppointments = appointmentsData[dateKey] || [];

  const stats = [
    {
      title: "Appointments Today",
      value: todayAppointments.length,
      change: "+1 since yesterday",
      trend: "up",
    },
    {
      title: "New Messages",
      value: 2,
      change: "No change",
      trend: "neutral",
    },
    {
      title: "Patients Under Care",
      value: 78,
      change: "+5 this month",
      trend: "up",
    },
    {
      title: "Urgent Consultations",
      value: 1,
      change: "-3 since last week",
      trend: "down",
    },
  ];

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Today's Overview
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-600">
                {stat.title}
              </span>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="flex items-center gap-1">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      stat.trend === "up"
                        ? "bg-blue-100 text-blue-700"
                        : stat.trend === "down"
                        ? "bg-gray-100 text-gray-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {stat.trend === "up" && (
                      <TrendingUp className="w-3 h-3 mr-1" />
                    )}
                    {stat.trend === "down" && (
                      <TrendingDown className="w-3 h-3 mr-1" />
                    )}
                    {stat.trend === "neutral" && (
                      <Minus className="w-3 h-3 mr-1" />
                    )}
                    {stat.change}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodaysOverview;
