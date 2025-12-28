import { Link } from "react-router-dom";

function UserList() {
  return (
    <div className="bg-[#aeadad] rounded-[var(--main-radius)] transition-all duration-300 z-50  p-4 flex flex-col ">
      <Link to="/patient/dashboard">
        <div className="cursor-pointer text-white font-bold transition-all duration-300 hover:scale-110 hover:text-[var(--main-color)]">
          DashBoard
        </div>
      </Link>
      <div className="cursor-pointer text-white font-bold transition-all duration-300 hover:scale-110 hover:text-[var(--main-color)]">
        Settings
      </div>
    </div>
  );
}

export default UserList;
