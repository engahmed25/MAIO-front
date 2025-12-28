import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar(){
  const [open, setOpen] = useState(false);
  return(
  <nav>
    <div>
      Your <span>Logo</span>
    </div>
    {/* Desktop */}
    <ul>
      <li><a href="#">Find a Doctor</a></li>
      <li><a href="#">Find a Hospital</a></li>
      <li><a href="#">Health A to Z</a></li>
    </ul>
    <div>
      <button>Login</button>
      <button>Sign Up</button>
    </div>
    {/* mobile */}
    <button
      onClick={()=>{
        setOpen(!open)
      }}>
        {open ? <X size={28} /> : <Menu size={28} />}
      </button>
    {open && (
      <div className="md:hidden mt-4 space-y-4 bg-gray-100 p-4 rounded-lg">
          <ul className="flex flex-col gap-4 text-blue-700 font-medium">
            <li><a href="#">Find a Doctor</a></li>
            <li><a href="#">Find a Hospital</a></li>
            <li><a href="#">Health A to Z</a></li>
          </ul>

          <div className="flex flex-col gap-3 pt-3">
            <button className="text-blue-700 font-medium">Log in</button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
              Sign up
            </button>
          </div>
        </div>
    )}
  </nav>);
}