import { Outlet } from "react-router-dom";
import Footer from "./footer";
import Search from "./Search";
import Navbar from "./Navbar";

function AppLayout() {
  return (
    <div>
      <Navbar/>
      <main>
        <Outlet />
        
      </main>
      <Footer />
      
    </div>
  );
}

export default AppLayout;
