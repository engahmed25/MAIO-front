import SideCalendar from "../features/Doctors/SideCalendar";
import TodaysOverview from "../features/Doctors/TodaysOverView";
import TodaySchedule from "../features/Doctors/TodaysSchedule";
import { useState } from "react";
import Button from "../ui/Button";
const appointmentsData = {
  "2025-12-11": [
    {
      time: "09:00 AM",
      patient: "Thomas Bailey",
      type: "Chest Pain Follow-up",
      status: "Scheduled",
    },
    {
      time: "10:30 AM",
      patient: "Maria Rodriguez",
      type: "Post-operative Check (Day 1)",
      status: "Scheduled",
    },
    {
      time: "01:00 PM",
      patient: "Oliver Smith",
      type: "Routine Wellness Exam",
      status: "Scheduled",
    },
    {
      time: "02:30 PM",
      patient: "Jessica Lee",
      type: "Consultation Request (Neurology)",
      status: "Pending",
    },
  ],
  "2025-12-12": [
    {
      time: "10:00 AM",
      patient: "Sarah Johnson",
      type: "Annual Physical Exam",
      status: "Scheduled",
    },
    {
      time: "02:00 PM",
      patient: "Michael Chen",
      type: "Blood Work Review",
      status: "Scheduled",
    },
  ],
  "2025-12-13": [
    {
      time: "09:30 AM",
      patient: "Emily Davis",
      type: "Follow-up Consultation",
      status: "Scheduled",
    },
    {
      time: "11:00 AM",
      patient: "Robert Wilson",
      type: "Cardiology Screening",
      status: "Pending",
    },
    {
      time: "03:00 PM",
      patient: "Linda Martinez",
      type: "Diabetes Management",
      status: "Scheduled",
    },
  ],
  "2025-12-15": [
    {
      time: "08:00 AM",
      patient: "James Anderson",
      type: "Pre-Surgery Consultation",
      status: "Scheduled",
    },
  ],
  "2025-12-16": [
    {
      time: "09:00 AM",
      patient: "Patricia Taylor",
      type: "Orthopedic Follow-up",
      status: "Scheduled",
    },
    {
      time: "11:30 AM",
      patient: "David Brown",
      type: "Mental Health Check-in",
      status: "Scheduled",
    },
  ],
};
// Main Dashboard Component
// Main Dashboard Component
function DoctorDashBoard() {
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 11, 11));

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome back, Dr. Evelyn Reed
          </h1>
          <p className="text-gray-600">
            Here's your overview for today. You have{" "}
            {
              (
                appointmentsData[
                  `${selectedDate.getFullYear()}-${String(
                    selectedDate.getMonth() + 1
                  ).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(
                    2,
                    "0"
                  )}`
                ] || []
              ).length
            }{" "}
            appointments scheduled.
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
          appointmentsData={appointmentsData}
        />

        {/* Schedule and Calendar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <TodaySchedule
              selectedDate={selectedDate}
              appointmentsData={appointmentsData}
            />
          </div>
          <div>
            <SideCalendar
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
              appointmentsData={appointmentsData}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorDashBoard;
