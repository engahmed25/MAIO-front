import { Outlet } from "react-router-dom";
import Footer from "./footer";
import Navbar from "./Navbar";

function AppLayout() {
  return (
    <div>
      <h1>App Layout</h1>
      
      <main>
        <Navbar/>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default AppLayout;
