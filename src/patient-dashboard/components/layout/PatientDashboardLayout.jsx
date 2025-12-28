import DashBoardSideBar from "../../../ui/DashBoardSideBar.jsx";
import DashBoardHeader from "../../../ui/DashBoardHeader.jsx";

function PatientDashboardLayout({
  children,
  menuItems = [],
  sidebarUser = { name: "Patient", role: "Member" },
}) {
  return (
    <div className="min-h-screen bg-[#E8F0FF] flex">
      <DashBoardSideBar menuItems={menuItems} user={sidebarUser} />
      <div className="flex-1 flex flex-col">
        <DashBoardHeader />
        <main className="flex-1 p-6 lg:p-10 space-y-6 bg-[#E8F0FF] overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

export default PatientDashboardLayout;
