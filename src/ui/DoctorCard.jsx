import { Link } from "react-router-dom";

function DoctorCard({
  name,
  description,
  specialization,
  price,
  status,
  image,
  id,
}) {
  const isAvailable = status?.toLowerCase() === "available";

  return (
    <Link to={`/doctor/${id}`} className="block">
      <div className="cursor-pointer hover:scale-105 transition-all duration-300 rounded-[var(--main-radius)] border-[var(--main-color)] border-[1px] p-4 bg-white shadow-sm w-full flex flex-col gap-3">
        {/* Top Section - Image */}
        <div className="w-full h-64 overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full rounded-[var(--main-radius)] object-cover"
          />
        </div>

        {/* Status */}
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${
              isAvailable ? "bg-green-500" : "bg-gray-500"
            }`}
          ></div>
          <span
            className={`text-sm ${
              isAvailable ? "text-green-600" : "text-gray-500"
            }`}
          >
            {status || "Offline"}
          </span>
        </div>

        {/* Text Section */}
        <div className="flex flex-col gap-2">
          {/* Doctor Name */}
          <h3 className="text-lg font-bold">{name}</h3>

          {/* Description */}
          <p className="text-sm text-gray-500">{description}</p>

          {/* Specialization and Price Row */}
          <div className="flex items-center justify-between text-sm font-medium">
            <span>{specialization}</span>
            <span>{price}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default DoctorCard;
