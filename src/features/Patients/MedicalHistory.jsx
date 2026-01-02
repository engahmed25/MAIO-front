import {
  Calendar,
  CreditCard,
  FileText,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Settings,
  Upload,
} from "lucide-react";
import DashBoardHeader from "../../ui/DashBoardHeader.jsx";
import DashBoardSideBar from "../../ui/DashBoardSideBar.jsx";
import MedicalHistoryTimeline from "./MedicalHistoryTimeline.jsx";
import { useGetMedicalHistory } from "./useGetMedicalHistory.js";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/patient/dashboard" },
  { icon: Calendar, label: "Appointments", path: "/appointments" },
  {
    icon: FileText,
    label: "Medical History",
    path: "/patient/medical-history",
  },
  { icon: MessageSquare, label: "Chat with Doctor", path: "/patient/messages" },
  { icon: CreditCard, label: "Payments", path: "/patient/payments" },
  { icon: Upload, label: "Upload Files", path: "/patient/uploads" },
  { icon: Settings, label: "Settings", path: "/patient/settings" },
  { icon: LogOut, label: "Logout", path: "/login" },
];

const sidebarUser = {
  name: "Aisha Patel",
  role: "Patient",
};

export function MedicalHistory() {
  const { medicalHistory, patientName, profilePicture, isLoading, error } =
    useGetMedicalHistory();

  // Debug logging
  console.log("MedicalHistory Component - Data:", {
    medicalHistory,
    patientName,
    profilePicture,
    isLoading,
    error,
  });

  return (
    <main className="flex-1 p-6 lg:p-10 space-y-6 bg-[#E8F0FF] overflow-auto">
      <section className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 lg:p-8">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.08em] text-[#2d5cff] font-semibold">
              Medical Records
            </p>
            <h1 className="text-3xl lg:text-4xl font-bold text-slate-900">
              Medical History
            </h1>
            <p className="text-sm text-slate-600 mt-2 max-w-3xl">
              Comprehensive chronological record of diagnoses, procedures,
              medications, and clinical notes.
            </p>
          </div>
          <div className="px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-sm text-slate-600">
            Synced to chart • {new Date().toLocaleDateString()}
          </div>
        </div>

        <div className="mt-6">
          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2d5cff]"></div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
              <p className="text-red-800">
                Failed to load medical records. Please try again later.
              </p>
            </div>
          )}

          {/* Medical History Section */}
          {!isLoading && !error && (
            <div className="space-y-6">
              {/* Patient Info Header */}
              {patientName && (
                <div className="bg-gradient-to-r from-[#2d5cff] to-[#4c6fff] rounded-xl p-6 text-white shadow-lg">
                  <div className="flex items-center gap-4">
                    {profilePicture ? (
                      <img
                        src={`${
                          import.meta.env.VITE_BACKEND_URL
                        }/${profilePicture}`}
                        alt={patientName}
                        className="w-20 h-20 rounded-full border-4 border-white shadow-md object-cover"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-full border-4 border-white shadow-md bg-white/20 flex items-center justify-center text-3xl font-bold">
                        {patientName?.charAt(0) || "P"}
                      </div>
                    )}
                    <div>
                      <h2 className="text-2xl font-bold mb-1">
                        {patientName || "Patient"}
                      </h2>
                      <p className="text-white/80 text-sm">
                        Medical History Overview
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Chronic Diseases */}
                {medicalHistory?.chronicDiseases &&
                  medicalHistory.chronicDiseases.length > 0 && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-5">
                      <h3 className="text-lg font-semibold text-red-900 mb-3">
                        Chronic Diseases
                      </h3>
                      <ul className="space-y-2">
                        {medicalHistory.chronicDiseases.map(
                          (disease, index) => (
                            <li
                              key={index}
                              className="flex items-center text-red-800"
                            >
                              <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                              {disease}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}

                {/* Allergies */}
                {medicalHistory?.allergies &&
                  medicalHistory.allergies.length > 0 && (
                    <div className="bg-orange-50 border border-orange-200 rounded-xl p-5">
                      <h3 className="text-lg font-semibold text-orange-900 mb-3">
                        Allergies
                      </h3>
                      <ul className="space-y-2">
                        {medicalHistory.allergies.map((allergy, index) => (
                          <li
                            key={index}
                            className="flex items-center text-orange-800"
                          >
                            <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                            {allergy}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
              </div>

              {/* Notes */}
              {medicalHistory?.notes && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                  <h3 className="text-lg font-semibold text-blue-900 mb-3">
                    Medical Notes
                  </h3>
                  <p className="text-blue-800 whitespace-pre-wrap">
                    {medicalHistory.notes}
                  </p>
                </div>
              )}

              {/* Show message if no medical history data */}
              {!medicalHistory && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
                  <p className="text-yellow-800">
                    No medical history data available yet.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !error && !medicalHistory && (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-12 text-center">
              <FileText className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                No Medical History Found
              </h3>
              <p className="text-slate-600">
                Your medical history will appear here once it's been added.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
