import { Link } from "react-router-dom";

function DoctorCard({ doctor }) {
  const {
    fullName,
    bio,
    specialization,
    ratePerSession,
    status,
    profilePicture,
    _id,
  } = doctor;

  const isApproved = status?.toLowerCase() === "approved";

  const basUrl = import.meta.env.VITE_BACKEND_URL;

  return (
    <Link to={`/doctor/${_id}`} className="block">
      <div className="cursor-pointer hover:scale-105 transition-all duration-300 rounded-[var(--main-radius)] border-[var(--main-color)] border-[1px] p-4 bg-white shadow-sm w-full flex flex-col gap-3">
        {/* Top Section - Image */}
        <div className="w-full h-64 overflow-hidden">
          <img
            src={`${basUrl}/${profilePicture}`}
            alt={fullName}
            className="w-full h-full rounded-[var(--main-radius)] object-cover"
          />
        </div>

        {/* Status */}
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${
              isApproved ? "bg-green-500" : "bg-gray-500"
            }`}
          ></div>
          <span
            className={`text-sm capitalize ${
              isApproved ? "text-green-600 font-medium" : "text-gray-500"
            }`}
          >
            {status || "Pending"}
          </span>
        </div>

        {/* Text Section */}
        <div className="flex flex-col gap-2">
          {/* Doctor Name */}
          <h3 className="text-lg font-bold">{fullName}</h3>

          {/* Description */}
          <p className="text-sm text-gray-500">{bio}</p>

          {/* Specialization and Price Row */}
          <div className="flex items-center justify-between text-sm font-medium">
            <span>{specialization}</span>
            <span>{ratePerSession} EGP</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default DoctorCard;
