import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import UserList from "./UserList";

function UserButton() {
  const [open, setOpen] = useState(false);

  function handleToggle() {
    setOpen(!open);
  }
  return (
    <div className="relative">
      <div
        className="flex items-center  justify-center cursor-pointer"
        onClick={handleToggle}
      >
        <div className="w-8 h-8 rounded-full bg-amber-500 ">
          <img
            className="rounded-full"
            src="https://randomuser.me/api/portraits/women/1.jpg"
            alt=""
          />
        </div>
        <span>
          {open ? (
            <>
              <MdKeyboardArrowDown className="rotate-180 text-2xl transition-all duration-300" />
            </>
          ) : (
            <MdKeyboardArrowDown className="text-2xl transition-all duration-300" />
          )}
        </span>
      </div>
      <div
        className={`absolute right-0 z-50 mt-2 transform transition-all duration-300
      ${
        open
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-2 pointer-events-none"
      }
    `}
      >
        {" "}
        <UserList />
      </div>
    </div>
  );
}

export default UserButton;
