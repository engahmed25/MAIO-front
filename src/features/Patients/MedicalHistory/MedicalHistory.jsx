import { useEffect, useState } from "react";
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
import DashBoardHeader from "../../../ui/DashBoardHeader.jsx";
import DashBoardSideBar from "../../../ui/DashBoardSideBar.jsx";
import MedicalHistoryTimeline from "./components/MedicalHistoryTimeline.jsx";
import { fetchMedicalHistory } from "./medicalHistory.service.js";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/patient/dashboard" },
  { icon: Calendar, label: "Appointments", path: "/appointments" },
  { icon: FileText, label: "Medical History", path: "/patient/medical-history" },
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

function MedicalHistory() {
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadHistory = async () => {
      try {
        const data = await fetchMedicalHistory();
        if (isMounted) setRecords(data);
      } catch (error) {
        if (isMounted) setHasError(true);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadHistory();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#E8F0FF] flex">
      <DashBoardSideBar menuItems={menuItems} user={sidebarUser} />

      <div className="flex-1 flex flex-col">
        <DashBoardHeader />

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
              <MedicalHistoryTimeline
                records={records}
                isLoading={isLoading}
                error={hasError}
              />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default MedicalHistory;
