import { Outlet } from "react-router-dom";
import Footer from "./footer";

function AppLayout() {
  return (
    <div>
      <h1>App Layout</h1>
      
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default AppLayout;
