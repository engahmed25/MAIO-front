import SideCalendar from "../features/Doctors/SideCalendar";
import TodaysOverview from "../features/Doctors/TodaysOverView";
import TodaySchedule from "../features/Doctors/TodaysSchedule";
import { useState } from "react";
import Button from "../ui/Button";
import { useDoctorAppointmentsByDate } from "../features/Doctors/useDoctorAppointmentsByDate";
import { useDoctorInfo } from "../features/Doctors/useDoctorInfo";

// Main Dashboard Component
function DoctorDashBoard() {
  // Set today as the default date
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Fetch doctor info
  const { doctorInfo, isLoading: isDoctorLoading } = useDoctorInfo();

  console.log("👨‍⚕️ DoctorDashBoard - doctorInfo:", doctorInfo);
  console.log("👨‍⚕️ DoctorDashBoard - isDoctorLoading:", isDoctorLoading);

  // Fetch appointments for the selected date
  const { totalAppointments, isLoading } =
    useDoctorAppointmentsByDate(selectedDate);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome back, Dr.{" "}
            {isDoctorLoading
              ? "..."
              : `${doctorInfo?.firstName || ""} ${doctorInfo?.lastName || ""}`}
          </h1>
          <p className="text-gray-600">
            Here's your overview for today. You have{" "}
            {isLoading ? "..." : totalAppointments} appointments scheduled.
          </p>

          <div className="flex gap-3 mt-4">
            <Button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm">
              + New Appointment
            </Button>
            <Button className="px-4 py-2 bg-white !text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-sm border border-gray-200">
              Send Message
            </Button>
            <Button className="px-4 py-2 bg-white !text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-sm border border-gray-200">
              View Patients
            </Button>
            <Button className="px-4 py-2 bg-white !text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-sm border border-gray-200">
              View Reports
            </Button>
          </div>
        </div>

        {/* Overview Stats */}
        <TodaysOverview
          selectedDate={selectedDate}
          totalPatients={doctorInfo?.totalPatients}
        />

        {/* Schedule and Calendar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <TodaySchedule selectedDate={selectedDate} />
          </div>
          <div>
            <SideCalendar
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorDashBoard;
