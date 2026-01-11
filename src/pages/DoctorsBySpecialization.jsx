import { Link, useParams } from "react-router-dom";
import { useDoctorSpeciality } from "../features/Doctors/useDoctorSpeciality";
import DoctorCard from "../ui/DoctorCard";
import Spinner from "../ui/Spinner";
import Button from "../ui/Button";

function DoctorsBySpecialization() {
  const { specialization } = useParams();

  // Capitalize first letter to match API format (e.g., "cardiology" -> "Cardiology")
  const formattedSpecialization = specialization
    ? specialization.charAt(0).toUpperCase() + specialization.slice(1)
    : "";

  const { isLoading, doctors, error } = useDoctorSpeciality(
    formattedSpecialization
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div className="container flex flex-col items-center justify-center mx-auto px-4 py-8">
        <div className="text-center text-red-500">
          <h2 className="text-2xl font-bold mb-4">There Is No Doctors yet</h2>
        </div>
        <Link to="/">
          <Button className="px-4 py-2 bg-blue-500 text-white rounded">
            Back To Home
          </Button>
        </Link>
      </div>
    );
  }

  const doctorsData = doctors?.data?.doctors || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2 capitalize">
        {specialization} Specialists
      </h1>
      <p className="text-gray-600 mb-8">
        Browse our qualified {specialization} doctors
      </p>

      {doctorsData.length === 0 ? (
        <div className="text-center py-12">
          <div className="bg-gray-100 rounded-lg p-8 max-w-md mx-auto">
            <svg
              className="mx-auto h-12 w-12 text-gray-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No Doctors Found
            </h3>
            <p className="text-gray-500">
              Sorry, there are currently no doctors available in the{" "}
              {specialization} specialization.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctorsData.map((doctor) => (
            <DoctorCard key={doctor._id} doctor={doctor} />
          ))}
        </div>
      )}
    </div>
  );
}

export default DoctorsBySpecialization;
