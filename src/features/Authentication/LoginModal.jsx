import { useNavigate, useLocation } from "react-router-dom";

function LoginModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();

  if (!isOpen) return null;

  const handleLoginClick = () => {
    // Store current path for redirect after login
    if (location.pathname.includes("/doctor/")) {
      localStorage.setItem("redirectAfterLogin", location.pathname);
    }
    navigate("/login");
    onClose?.();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl p-8 w-96 h-64 flex flex-col items-center justify-center gap-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-semibold text-gray-800">Need to login?</h2>
        <button
          onClick={handleLoginClick}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
}

export default LoginModal;
