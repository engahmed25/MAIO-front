// ui/DashboardLayout.jsx
import { Outlet } from "react-router-dom";
import DashboardSidebar from "./DashBoardSideBar.jsx";
import DashBoardHeader from "./DashBoardHeader.jsx";

export default function DashboardLayout() {
  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashBoardHeader />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
