import { Outlet } from "react-router-dom";
import Footer from "./footer";
import Navbar from ""

function AppLayout() {
  return (
    <div>
      <h1>App Layout</h1>
      <Navbar/>
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default AppLayout;
