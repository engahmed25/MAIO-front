import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar(){
  const [open, setOpen] = useState(false);
   return (
    <nav className="bg-gray-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <div className="text-xl font-semibold flex items-center gap-1">
          Your <span className="text-red-600">logo</span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-10 text-blue-700 font-bold">
          <li><a href="#">Find a Doctor</a></li>
          <li><a href="#">Find a Hospital</a></li>
          <li><a href="#">Health A to Z</a></li>
        </ul>

        {/* Right Buttons (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          <button className="text-blue-700 font-bold">Log in</button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
            Sign up
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden mt-4 space-y-4 bg-gray-100 p-4 rounded-lg">
          <ul className="flex flex-col gap-4 text-blue-700 font-bold">
            <li><a href="#">Find a Doctor</a></li>
            <li><a href="#">Find a Hospital</a></li>
            <li><a href="#">Health A to Z</a></li>
          </ul>

          <div className="flex flex-col gap-3 pt-3">
            <button className="text-blue-700 font-bold">Log in</button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
              Sign up
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}