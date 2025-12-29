export default function PatientDetails({ userData }) {
  return (
    <>
      {/* Patient Details */}
      <div className="min-w-0 flex-1">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800 truncate">
          {userData.name}
        </h2>
        <p className="text-xs sm:text-sm text-blue-600 font-medium">
          {userData.status}
        </p>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 mt-2 text-xs sm:text-sm text-gray-600">
          <p>
            <span className="font-semibold">Age:</span> {userData.age} years
          </p>
          <p>
            <span className="font-semibold">Patient ID:</span> {userData.id}
          </p>
        </div>
      </div>
    </>
  );
}
