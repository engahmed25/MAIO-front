import { LayoutDashboard, Calendar, FileText, MessageSquare, CreditCard, Upload, Settings, LogOut } from "lucide-react";
import {
  FiCalendar,
  FiClipboard,
  FiDroplet,
  FiHash,
  FiMessageCircle,
  FiPlusCircle,
  FiUploadCloud,
  FiUser,
} from "react-icons/fi";
import PatientDashboardLayout from "../patient-dashboard/components/layout/PatientDashboardLayout.jsx";
import PatientProfileCard from "../patient-dashboard/components/profile/PatientProfileCard.jsx";
import QuickActions from "../patient-dashboard/components/actions/QuickActions.jsx";
import UpcomingAppointments from "../patient-dashboard/components/appointments/UpcomingAppointments.jsx";
import PrescriptionReminders from "../patient-dashboard/components/prescriptions/PrescriptionReminders.jsx";
import RecentUploads from "../patient-dashboard/components/uploads/RecentUploads.jsx";
import HealthAnalysis from "../patient-dashboard/components/health/HealthAnalysis.jsx";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/patient-dashboard" },
  { icon: Calendar, label: "Appointments", path: "/patient-dashboard" },
  { icon: FileText, label: "Medical History", path: "/patient-dashboard" },
  { icon: MessageSquare, label: "Chat with Doctor", path: "/patient-dashboard" },
  { icon: CreditCard, label: "Payments", path: "/patient-dashboard" },
  { icon: Upload, label: "Upload Files", path: "/patient-dashboard" },
  { icon: Settings, label: "Settings", path: "/patient-dashboard" },
  { icon: LogOut, label: "Logout", path: "/patient-dashboard" },
];

const patient = {
  name: "Aisha Patel",
  patientId: "#P-48291",
  status: "Active",
  initials: "AP",
};

const patientInfoItems = [
  { icon: FiCalendar, label: "Age / Gender", value: "32 • Female" },
  { icon: FiUser, label: "Blood Type", value: "O+" },
  { icon: FiDroplet, label: "Allergies", value: "Penicillin" },
  { icon: FiHash, label: "Member Since", value: "2021" },
  { icon: FiClipboard, label: "Care Plan", value: "Cardio + Nutrition" },
];

const handleQuickAction = (label) => {
  console.log(`Quick action triggered: ${label}`);
};

const quickActions = [
  {
    label: "Reserve Appointment",
    icon: FiCalendar,
    bg: "from-[#0057FF] to-[#5a8dff]",
    onClick: () => handleQuickAction("Reserve Appointment"),
  },
  {
    label: "Upload Report",
    icon: FiUploadCloud,
    bg: "from-[#2fa6ff] to-[#79c5ff]",
    onClick: () => handleQuickAction("Upload Report"),
  },
  {
    label: "Start Chat",
    icon: FiMessageCircle,
    bg: "from-[#0bb5ff] to-[#5ae4ff]",
    onClick: () => handleQuickAction("Start Chat"),
  },
];

const appointments = [
  {
    doctor: "Dr. Emily Carter",
    specialty: "Cardiology",
    date: "Mon, Dec 9",
    time: "09:30 AM",
    status: "confirmed",
    action: "Join Video Call",
  },
  {
    doctor: "Dr. Omar Rahman",
    specialty: "Dermatology",
    date: "Wed, Dec 11",
    time: "12:15 PM",
    status: "pending",
    action: "Details",
  },
  {
    doctor: "Dr. Laila Nassar",
    specialty: "Nutrition",
    date: "Fri, Dec 13",
    time: "04:00 PM",
    status: "confirmed",
    action: "Join Video Call",
  },
];

const handleAppointmentAction = (appointment) => {
  console.log(`Appointment action: ${appointment.action} for ${appointment.doctor}`);
};

const appointmentStatusStyles = {
  confirmed: "bg-emerald-50 text-emerald-700 border border-emerald-100",
  pending: "bg-amber-50 text-amber-700 border border-amber-100",
};

const prescriptions = [
  {
    name: "Atorvastatin 20mg",
    schedule: "After breakfast",
    due: "Due in 30m",
    urgency: "due-soon",
  },
  {
    name: "Metformin 500mg",
    schedule: "12:00 PM",
    due: "In 3h",
    urgency: "on-track",
  },
  {
    name: "Vitamin D",
    schedule: "Tonight",
    due: "Optional",
    urgency: "low",
  },
];

const handlePrescriptionAction = (prescription) => {
  console.log(`Prescription action for ${prescription.name}`);
};

const prescriptionStatusStyles = {
  "due-soon": "bg-amber-50 text-amber-700 border-amber-100",
  "on-track": "bg-emerald-50 text-emerald-700 border-emerald-100",
  low: "bg-emerald-50 text-emerald-700 border-emerald-100",
};

const uploads = [
  { name: "Chest X-Ray.png", type: "Imaging", time: "Today, 09:10 AM" },
  { name: "Blood Panel.pdf", type: "Lab Report", time: "Yesterday, 05:22 PM" },
  { name: "Allergy Notes.docx", type: "Notes", time: "Nov 26, 02:48 PM" },
];

const handleUploadView = (file) => {
  console.log(`View upload: ${file.name}`);
};

const heartRateTrend = [72, 76, 74, 80, 78, 82, 79];

const bmi = {
  value: "22.8",
  statusText: "Healthy range",
};

const lastCheckup = {
  date: "Nov 22, 2025",
  doctor: "Dr. Emily Carter",
};

const sidebarUser = {
  name: patient.name,
  role: "Patient",
};

function PatientDashboard() {
  return (
    <PatientDashboardLayout menuItems={menuItems} sidebarUser={sidebarUser}>
      <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.08em] text-[#2d5cff] font-semibold">
            Welcome back
          </p>
          <h1 className="text-3xl lg:text-4xl font-bold">Patient Dashboard</h1>
          <p className="text-sm text-slate-600 mt-1">
            Track your appointments, health insights, and quick actions in one place.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-full bg-white/80 border border-[#dfe7ff] shadow-sm text-sm text-slate-600">
            Last synced: 5 minutes ago
          </div>
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0057FF] text-white font-semibold shadow-lg shadow-[#0057ff40]">
            <FiPlusCircle /> New Request
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="space-y-6">
          <PatientProfileCard patient={patient} infoItems={patientInfoItems} />
          <UpcomingAppointments
            appointments={appointments}
            statusStyles={appointmentStatusStyles}
            onAction={handleAppointmentAction}
          />
          <HealthAnalysis
            heartRateValue="78 bpm"
            heartRateTrend={heartRateTrend}
            heartStatus="Stable"
            heartBadge="+4 this week"
            bmi={bmi}
            lastCheckup={lastCheckup}
            medicationSummary="Morning pills taken, evening dose scheduled at 8:00 PM."
            doctorNotes="Keep daily hydration above 2L and add light cardio twice a week."
          />
        </div>

        <div className="space-y-6">
          <QuickActions actions={quickActions} />
          <PrescriptionReminders
            prescriptions={prescriptions}
            statusStyles={prescriptionStatusStyles}
            onAction={handlePrescriptionAction}
          />
          <RecentUploads uploads={uploads} onView={handleUploadView} />
        </div>
      </div>
    </PatientDashboardLayout>
  );
}

export default PatientDashboard;
