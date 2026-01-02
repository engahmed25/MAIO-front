import React, { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useDoctorMonthAppointments } from "./useDoctorMonthAppointments";

function SideCalendar({ selectedDate, onDateChange }) {
  console.log("📅 SideCalendar - selectedDate prop:", selectedDate);
  console.log("📅 SideCalendar - selectedDate type:", typeof selectedDate);
  console.log(
    "📅 SideCalendar - selectedDate is Date?",
    selectedDate instanceof Date
  );

  const [currentMonth, setCurrentMonth] = useState(
    new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)
  );

  // Fetch appointments for the current month to show dots
  const { appointmentsByDay } = useDoctorMonthAppointments(currentMonth);

  console.log("📅 SideCalendar - currentMonth state:", currentMonth);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const daysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const firstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const generateCalendarDays = () => {
    const days = [];
    const totalDays = daysInMonth(currentMonth);
    const firstDay = firstDayOfMonth(currentMonth);

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    for (let i = 1; i <= totalDays; i++) {
      days.push(i);
    }

    return days;
  };

  const hasAppointments = (day) => {
    if (!day) return false;
    return appointmentsByDay[day] === true;
  };

  const isSelectedDate = (day) => {
    if (!day) return false;
    return (
      day === selectedDate.getDate() &&
      currentMonth.getMonth() === selectedDate.getMonth() &&
      currentMonth.getFullYear() === selectedDate.getFullYear()
    );
  };

  const isPastDate = (day) => {
    if (!day) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset to start of day for accurate comparison

    const dateToCheck = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    dateToCheck.setHours(0, 0, 0, 0);

    return dateToCheck < today;
  };

  const handleDayClick = (day) => {
    if (day && !isPastDate(day)) {
      const newDate = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        day
      );

      // Format date for backend: YYYY-MM-DD
      const year = newDate.getFullYear();
      const month = String(newDate.getMonth() + 1).padStart(2, "0");
      const dayFormatted = String(newDate.getDate()).padStart(2, "0");
      const formattedDate = `${year}-${month}-${dayFormatted}`;

      console.log("📅 SideCalendar - Raw Date object:", newDate);
      console.log(
        "📅 SideCalendar - Formatted for backend (YYYY-MM-DD):",
        formattedDate
      );
      console.log(
        "📅 SideCalendar - Date as ISO string:",
        newDate.toISOString()
      );

      onDateChange(newDate);
    }
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  const days = generateCalendarDays();
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={goToPreviousMonth}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h3 className="text-lg font-semibold text-gray-800 min-w-[180px] text-center">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h3>
          <button
            onClick={goToNextMonth}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-gray-600 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          const isPast = isPastDate(day);
          const isSelected = isSelectedDate(day);
          const hasApts = hasAppointments(day);

          return (
            <div
              key={index}
              onClick={() => handleDayClick(day)}
              className={`aspect-square flex items-center justify-center text-sm rounded-lg relative ${
                day === null
                  ? ""
                  : isPast
                  ? "text-gray-300 cursor-not-allowed"
                  : isSelected
                  ? "bg-blue-600 text-white font-semibold cursor-pointer"
                  : "text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors"
              }`}
            >
              {day}
              {hasApts && !isSelected && !isPast && (
                <span className="absolute bottom-1 w-1 h-1 bg-blue-500 rounded-full"></span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SideCalendar;
