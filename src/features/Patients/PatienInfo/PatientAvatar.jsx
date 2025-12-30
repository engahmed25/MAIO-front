export default function PatientAvatar({ userData }) {
  return (
    <>
      {/* Avatar */}
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg bg-linear-to-br from-blue-400 to-blue-600 flex items-center justify-center flex-shrink-0">
        <span className="text-white text-xl sm:text-2xl font-bold">
          {userData.avatar}
        </span>
      </div>
    </>
  );
}
