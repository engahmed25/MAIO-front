import {
  Calendar,
  FileText,
  Plus,
  ChevronRight,
  Download,
  Activity,
  Heart,
  Droplet,
  Weight,
} from "lucide-react";
import WelcomeSection from "../features/Patients/WelcomeMsg";
import AppointmentCard from "../features/Patients/AppointmentsCard";
import HealthVitalCard from "../features/Patients/HealthVitalCard";
import MedicationCard from "../features/Patients/MedicationCard";
import MedicalRecordRow from "../features/Patients/MedicalRecordRow";
export default function PatientDashboard() {
  const appointments = [
    {
      id: 1,
      doctor: "Dr. Evelyn Reed",
      specialty: "Cardiology",
      time: "10:00 AM",
      reason: "Follow-up Consultation",
      location: "MAIO Medical Center, Suite 402",
      date: "Mon, Dec 15, 2025",
    },
    {
      id: 2,
      doctor: "Dr. Alex Johnson",
      specialty: "General Practice",
      time: "02:30 PM",
      reason: "Routine Check-up",
      location: "Main Clinic, Floor 1",
      date: "Mon, Dec 22, 2025",
    },
  ];

  const healthVitals = [
    {
      id: 1,
      name: "Blood Pressure",
      value: "120/80",
      unit: "mmHg",
      status: "normal",
      statusLabel: "Normal",
      normalRange: "90/60 - 120/80",
      lastUpdated: "Updated 2 hours ago",
      icon: Activity,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      id: 2,
      name: "Heart Rate",
      value: "72",
      unit: "bpm",
      status: "normal",
      statusLabel: "Normal",
      normalRange: "60-100 bpm",
      lastUpdated: "Updated 2 hours ago",
      icon: Heart,
      iconBg: "bg-red-50",
      iconColor: "text-red-600",
    },
    {
      id: 3,
      name: "Blood Glucose",
      value: "95",
      unit: "mg/dL",
      status: "normal",
      statusLabel: "Normal",
      normalRange: "70-100 mg/dL",
      lastUpdated: "Updated 1 day ago",
      icon: Droplet,
      iconBg: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      id: 4,
      name: "Weight",
      value: "75",
      unit: "kg",
      status: "normal",
      statusLabel: "Healthy",
      normalRange: "BMI 18.5-24.9",
      lastUpdated: "Updated 3 days ago",
      icon: Weight,
      iconBg: "bg-green-50",
      iconColor: "text-green-600",
    },
  ];

  const medications = [
    {
      id: 1,
      name: "Lisinopril",
      dosage: "5mg",
      frequency: "Once daily in the morning",
      doctor: "Dr. Alex Johnson",
      startDate: "Dec 5, 2025",
      status: "Active",
      nextDose: "Today at 8:00 AM",
    },
    {
      id: 2,
      name: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily with meals",
      doctor: "Dr. Evelyn Reed",
      startDate: "Nov 28, 2025",
      status: "Active",
      nextDose: "Today at 12:00 PM",
    },
    {
      id: 3,
      name: "Vitamin D3",
      dosage: "1000 IU",
      frequency: "Once daily",
      doctor: "Dr. Alex Johnson",
      startDate: "Nov 15, 2025",
      status: "Active",
      nextDose: "Today at 8:00 AM",
    },
  ];

  const medicalRecords = [
    {
      id: 1,
      date: "Dec 9, 2025",
      type: "Lab Results",
      title: "Blood Work - Complete Panel",
      doctor: "Dr. Evelyn Reed",
      status: "Active",
    },
    {
      id: 2,
      date: "Dec 5, 2025",
      type: "Prescription",
      title: "Lisinopril 5mg - Daily",
      doctor: "Dr. Alex Johnson",
      status: "Active",
    },
    {
      id: 3,
      date: "Nov 28, 2025",
      type: "Diagnosis",
      title: "Mild Hypertension",
      doctor: "Dr. Evelyn Reed",
      status: "Active",
    },
    {
      id: 4,
      date: "Nov 15, 2025",
      type: "Procedure Note",
      title: "ECG - Routine Monitoring",
      doctor: "Dr. Sarah Chen",
      status: "Archived",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Welcome Section */}
      <WelcomeSection />

      {/* Upcoming Appointments Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              Upcoming Appointments
            </h2>
            <p className="text-sm text-gray-600">
              Your scheduled medical visits
            </p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
            <Plus className="w-4 h-4" />
            Book New
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {appointments.map((appointment) => (
            <AppointmentCard key={appointment.id} appointment={appointment} />
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Health Vitals
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Your recent health measurements and vitals
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {healthVitals.map((vital) => (
            <HealthVitalCard key={vital.id} vital={vital} />
          ))}
        </div>
      </div>

      {/* Current Medications */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Current Medications
            </h2>
            <p className="text-sm text-gray-600">
              Your active prescriptions and dosage schedule
            </p>
          </div>
          <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1">
            View All
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {medications.map((medication) => (
            <MedicationCard key={medication.id} medication={medication} />
          ))}
        </div>
      </div>

      {/* Medical Records Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              Medical Records
            </h2>
            <p className="text-sm text-gray-600">
              Your recent medical documents and records
            </p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700">
            <Download className="w-4 h-4" />
            Export All
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                  Type
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                  Title
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                  Doctor
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {medicalRecords.map((record) => (
                <MedicalRecordRow key={record.id} record={record} />
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 text-center">
          <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
            View All Records
          </button>
        </div>
      </div>
    </div>
  );
}
