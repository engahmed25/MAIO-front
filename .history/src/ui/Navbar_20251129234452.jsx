import { useState } from "react";
import { Menu, X } from "lucide-react";
import Button from "./Button";
import Link from ""

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-[var(--backGround-color)] px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-semibold flex items-center gap-1">
          <img
            src="/src/assets/navLogo/logo.png"
            alt="logo"
            className="w-12 md:w-12 rounded-xl object-cover"
          />
          <span className="text-[var(--main-lite-color)] text-2xl">
            Medicare
          </span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-10 text-[var(--main-lite-color)] font-bold">
          <li>
            <Link href="#">Find a Doctor</Link>
          </li>
          <li>
            <Link href="#">Find a Hospital</Link>
          </li>
          <li>
            <Link href="#">Health A to Z</Link>
          </li>
        </ul>

        {/* Right Buttons (using your Button component) */}
        <div className="hidden md:flex items-center gap-4">
          <button className="text-[var(--main-color)] font-bold">Log in</button>

          {/* Using your custom Button component */}
          <Button className="px-4 py-1">Sign up</Button>
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
              <Link href="#">Find a Doctor</Link>
            </li>
            <li>
              <Link href="#">Find a Hospital</Link>
            </li>
            <li>
              <Link href="#">Health A to Z</Link>
            </li>
          </ul>

          <div className="flex flex-col gap-3 pt-3">
            <button className="text-[var(--main-color)] font-medium">
              Log in
            </button>
            <Button>Sign up</Button>
          </div>
        </div>
      )}
    </nav>
  );
}
