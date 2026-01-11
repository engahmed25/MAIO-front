import SideCalendar from "../features/Doctors/SideCalendar";
import TodaysOverview from "../features/Doctors/TodaysOverView";
import TodaySchedule from "../features/Doctors/TodaysSchedule";
import NearestUpcomingAppointment from "../features/Doctors/NearestUpcomingAppointment";
import { useState, useEffect } from "react";
import Button from "../ui/Button";
import { useDoctorAppointmentsByDate } from "../features/Doctors/useDoctorAppointmentsByDate";
import { useDoctorInfo } from "../features/Doctors/useDoctorInfo";

// Main Dashboard Component
function DoctorDashBoard() {
  // Set today as the default date
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Fetch doctor info
  const { doctorInfo, isLoading: isDoctorLoading } = useDoctorInfo();

  // Log all doctor information when it's loaded
  useEffect(() => {
    if (!isDoctorLoading && doctorInfo) {
      console.log("========================================");
      console.log("🏥 DOCTOR DASHBOARD - FULL DOCTOR INFO");
      console.log("========================================");
      console.log("📋 Complete Doctor Object:", doctorInfo);
      console.log("----------------------------------------");
      console.log("🆔 Doctor ID:", doctorInfo._id || doctorInfo.id);
      console.log("👤 First Name:", doctorInfo.firstName);
      console.log("👤 Last Name:", doctorInfo.lastName);
      console.log("📧 Email:", doctorInfo.email);
      console.log("📞 Phone:", doctorInfo.phone);
      console.log("🏥 Specialization:", doctorInfo.specialization);
      console.log("📜 License Number:", doctorInfo.licenseNumber);
      console.log("💳 National ID:", doctorInfo.nationalId);
      console.log("🎂 Date of Birth:", doctorInfo.dateOfBirth);
      console.log("⚧ Gender:", doctorInfo.gender);
      console.log("📍 Address:", doctorInfo.address);
      console.log("🏢 Clinic Info:", doctorInfo.clinicInfo);
      console.log("💰 Consultation Fee:", doctorInfo.consultationFee);
      console.log("🎓 Experience Years:", doctorInfo.experienceYears);
      console.log("📝 Bio:", doctorInfo.bio);
      console.log("🔐 Role:", doctorInfo.role);
      console.log("✅ Is Approved:", doctorInfo.isApproved);
      console.log("🖼️ Profile Picture:", doctorInfo.profilePicture);
      console.log("📄 Documents:", doctorInfo.documents);
      console.log("⭐ Rating:", doctorInfo.rating);
      console.log("📊 Total Patients:", doctorInfo.totalPatients);
      console.log("📅 Created At:", doctorInfo.createdAt);
      console.log("🔄 Updated At:", doctorInfo.updatedAt);
      console.log("========================================");
    }
  }, [doctorInfo, isDoctorLoading]);

  console.log("👨‍⚕️ DoctorDashBoard - doctorInfo:", doctorInfo);
  console.log("👨‍⚕️ DoctorDashBoard - isDoctorLoading:", isDoctorLoading);

  // Fetch appointments for the selected date
  const { totalAppointments, isLoading, appointments } =
    useDoctorAppointmentsByDate(selectedDate);

  // Debug appointments data
  console.log("📅 Selected Date:", selectedDate);
  console.log("📊 Total Appointments:", totalAppointments);
  console.log("📋 Appointments Array:", appointments);
  console.log("⏳ Is Loading:", isLoading);

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
        </div>

        {/* Nearest Upcoming Appointment */}
        <NearestUpcomingAppointment />

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
