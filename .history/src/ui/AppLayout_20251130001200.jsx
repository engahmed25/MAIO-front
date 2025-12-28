import { Outlet } from "react-router-dom";
import Footer from "./footer";
import Search from "./Search";
import Navbar from "./Navbar";

function AppLayout() {
  return (
    <div>
      <h1 className="text-3xl font-bold ">App Layout</h1>
      {/* <h1>App Layout</h1> */}
      <Navbar/>
      <main>
        <Outlet />
        <Search />
      </main>
      <Footer />
      
    </div>
  );
}

export default AppLayout;
