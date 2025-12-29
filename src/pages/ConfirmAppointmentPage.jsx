import React from "react";
import { Check } from "lucide-react"; // Or use a custom SVG if you don't have lucide-react
import AppointmentSummaryCard from "../features/paymentMethods/AppointmentSummaryCard";
import PaymentStatusMessage from "../features/paymentMethods/PaymentStatusMessage";
import { useNavigate } from "react-router-dom";

function ConfirmAppointmentPage({ payMethod = "debitCard" }) {
  // const { state } = useLocation();
  const navigate = useNavigate();

  function onClick() {
    navigate("/");
  }

  return (
    <div className="w-full  bg-gray-50 p-4 sm:p-6 flex items-center justify-center">
      <div className="h-[60%] w-[40%] bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col items-center text-center">
        {/* --- Confirmation Logo Section --- */}
        <div className="mb-6">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-200">
            <Check className="text-white w-12 h-12 stroke-[3px]" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Booking Confirmed
        </h2>
        <AppointmentSummaryCard
        // drName={appointmentInfo.drName}
        // speciality={appointmentInfo.speciality}
        // date={appointmentInfo.date}
        // time={appointmentInfo.time}
        // clinicName={appointmentInfo.clinicName}
        // clinicLocation={appointmentInfo.clinicLocation}
        // price={appointmentInfo.price}
        />
        <div className="w-full border-t border-gray-100 my-6"></div>
        <PaymentStatusMessage payMethod={payMethod} />
        <button
          onClick={onClick}
          className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors"
        >
          Done
        </button>
      </div>
    </div>
  );
}

export default ConfirmAppointmentPage;
