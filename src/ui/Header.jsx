import { useState } from "react";
import { Menu, X } from "lucide-react";
import Button from "./Button";
import { Link } from "react-router-dom";
import UserButton from "./UserButton";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <nav className=" bg-[var(--backGround-color)] px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link>
          <div className="text-xl font-semibold flex items-center gap-1">
            <img
              src="./logo.png"
              alt="logo"
              className="w-12 md:w-12 rounded-xl object-cover"
            />
          </div>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-10 text-[var(--main-lite-color)] font-bold">
          <li
            className="text-[var(--main-color)] font-bold
transition-all duration-300 hover:scale-110 hover:text-[var(--main-color)]"
          >
            <Link to="/doctors">All Doctors</Link>
          </li>
          <li
            className="text-[var(--main-color)] font-bold
transition-all duration-300 hover:scale-110 hover:text-[var(--main-color)]"
          >
            {" "}
            <Link to="#">Find a Hospital</Link>
          </li>
          <li
            className="text-[var(--main-color)] font-bold
transition-all duration-300 hover:scale-110 hover:text-[var(--main-color)]"
          >
            {" "}
            <Link to="/contactus">Contact Us</Link>
          </li>
        </ul>

        {/* Right Buttons (using your Button component) */}
        <div className="hidden md:flex items-center gap-4">
          {/* <Link>Log in</Link> */}

          {/* Using your custom Button component */}
          <Link to="/register">
            <Button className="px-4 py-1">Sign up</Button>
          </Link>
          <UserButton />
        </div>

        {/* Mobile Hamburger */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden mt-4 space-y-4 bg-[var(--sec-color)] p-4 rounded-lg">
          <ul className="flex flex-col gap-4 text-[var(--main-lite-color)] font-bold">
            <li>
              <Link href="#">All Doctors</Link>
            </li>
            <li>
              <Link href="#">Find a Hospital</Link>
            </li>
            <li>
              <Link href="#">Health A to Z</Link>
            </li>
          </ul>

          <div className="flex flex-col gap-3 pt-3">
            <Button>Log in</Button>
            <Button>Sign up</Button>
          </div>
        </div>
      )}
    </nav>
  );
}
