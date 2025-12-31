import { Calendar } from "lucide-react";

export default function ScheduleAppointmentButton() {
  return (
    <>
      {/* Schedule Appointment Button */}
      <button className="flex items-center justify-center sm:justify-start gap-2 px-3 sm:px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-sm font-medium whitespace-nowrap">
        <Calendar size={18} />
        <span className="hidden sm:inline">Schedule Appointment</span>
        <span className="sm:hidden">Schedule</span>
      </button>
    </>
  );
}
