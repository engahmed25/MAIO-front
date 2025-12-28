import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../ui/Button";

function ChooseRole() {
  const [chooseRole, setChooseRole] = useState(null);
  const navigate = useNavigate();

  function handleRegister() {
    if (chooseRole === "doctor") {
      navigate("/register/doctors?step=1");
    } else if (chooseRole === "patient") {
      navigate("/register/patients?step=1");
    }
  }

  return (
    <div className=" flex flex-col items-center justify-center min-h-screen gap-6">
      <h2 className="font-bold text-3xl text-center">
        Join as a Doctor or Patient
      </h2>
      <div className="flex gap-5 flex-col w-[80%] md:w-auto md:flex-row">
        <button
          className={`p-[60px] ${
            chooseRole === "doctor"
              ? "bg-[var(--main-lite-color)] text-white"
              : ""
          }  transition-colors duration-500  hover:bg-[var(--main-lite-color)] hover:text-white text-black font-bold rounded-2xl border-[1px] border-[var(--main-color)] cursor-pointer`}
          onClick={() => setChooseRole("doctor")}
        >
          I'm a Doctor
        </button>
        <button
          className={`p-[60px] ${
            chooseRole === "patient"
              ? "bg-[var(--main-lite-color)] text-white"
              : ""
          }  transition-colors duration-500  hover:bg-[var(--main-lite-color)] hover:text-white text-black font-bold rounded-2xl border-[1px] border-[var(--main-color)] cursor-pointer`}
          onClick={() => setChooseRole("patient")}
        >
          I'm a Patient
        </button>{" "}
      </div>
      <div className="flex flex-col items-center">
        {/* <button
          className={`${
            chooseRole === null
              ? "bg-gray-400 cursor-not-allowed"
              : "cursor-pointer transition-colors duration-500  hover:bg-[var(--main-lite-color)]"
          } bg-[var(--main-color)] text-white font-bold py-4 px-10 rounded-[10px] mb-2 `}
        >
          {chooseRole === null
            ? "Create Account"
            : chooseRole === "doctor"
            ? "Register as Doctor"
            : "Register as Patient"}
        </button> */}

        <Button
          withTransition={chooseRole !== null}
          withHover={chooseRole !== null}
          className={`py-4 px-10 mb-2`}
          disabled={chooseRole === null}
          onClick={handleRegister}
        >
          {chooseRole === null
            ? "Create Account"
            : chooseRole === "doctor"
            ? "Register as Doctor"
            : "Register as Patient"}{" "}
        </Button>
        <p>
          Already have an account?
          <Link to="/login" className="text-blue-500 underline">
            {" "}
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ChooseRole;
