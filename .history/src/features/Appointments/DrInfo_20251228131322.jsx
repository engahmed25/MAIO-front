import { FiInfo } from "react-icons/fi";
import { MdOutlineVerified } from "react-icons/md";
import DrImg from "./../../assets/DrInfoImgs/DrImg.png";
import Spinner from "../../ui/Spinner";
import { useDoctor } from "../Doctors/useDoctor";

function DrInfo({ id }) {
  const { isLoading, doctor, error } = useDoctor(id);

  console.log("Raw Doctor Response:", doctor);
  console.log("Doctor ID being fetched:", id);

  if (isLoading) return <Spinner />;
  if (error) {
    console.error("Error fetching doctor:", error);
    return (
      <div className="text-red-500 p-4">Error loading doctor information</div>
    );
  }
  if (!doctor) return <div className="text-gray-500 p-4">Doctor not found</div>;

  // Handle different possible response structures
  const doctorData = doctor.data?.doctor || doctor.data || doctor;
  const basUrl = import.meta.env.VITE_BACKEND_URL;

  const doctorInfo = {
    img: doctorData.profilePicture
      ? `${basUrl}/${doctorData.profilePicture}`
      : DrImg,
    name:
      `${doctorData.firstName || ""} ${doctorData.lastName || ""}`.trim() ||
      "Dr Name",
    speciality: doctorData.specialization || "Dermatologist",
    experience: doctorData.yearsOfExperience || "2",
    about: doctorData.bio || "No bio available",
    fee: doctorData.ratePerSession || 50,
  };
  return (
    <section className="flex flex-col md:flex-row gap-6 m-4 bg-white p-6 rounded-(--main-radius) border border-gray-300">
      <div className="rounded-(--main-radius) overflow-hidden  shadow-[0px_5px_15px_rgba(0,0,0,0.35)]">
        <img
          src={doctorInfo.img}
          alt="Doctor"
          className="w-full h-auto max-w-sm object-fill"
        />
      </div>

      <div className="flex-1 border border-gray-200 p-6 rounded-(--main-radius) bg-gray-50 shadow-[0px_5px_15px_rgba(0,0,0,0.35)]">
        <div className="flex items-center gap-2">
          <h1 className="font-bold text-2xl md:text-3xl text-gray-900">
            {doctorInfo.name}
          </h1>
          <MdOutlineVerified className="text-blue-600 text-2xl" />
        </div>

        <div className="flex items-center gap-3 mt-2">
          <h2 className="text-gray-700 font-semibold">
            {doctorInfo.speciality}
          </h2>

          <span className="border border-gray-400 rounded-2xl text-gray-600 text-xs px-3 py-1 bg-white shadow-sm">
            <span>{doctorInfo.experience}</span> years
          </span>
        </div>

        <div className="flex items-center gap-2 mt-5">
          <h3 className="font-semibold text-gray-800">About</h3>
          <FiInfo className="text-gray-600" />
        </div>

        <p className="text-gray-600 text-sm md:text-base mt-2 leading-relaxed">
          {doctorInfo.about}
        </p>

        <p className="mt-5 text-gray-700 text-lg">
          Appointment Fee:
          <span className="font-bold text-gray-900"> {doctorInfo.fee}</span>
        </p>
      </div>
    </section>
  );
}

export default DrInfo;
