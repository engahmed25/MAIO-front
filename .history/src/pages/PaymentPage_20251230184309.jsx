import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PaymentMethodSelector from "../features/paymentMethods/PaymentMethodSelector";
import AppointmentSummaryCard from "../features/paymentMethods/AppointmentSummaryCard";
import PaymentPageTitle from "../features/paymentMethods/PaymentPageTitle";
import PaymentMethodHeader from "../features/paymentMethods/PaymentMethodHeader";
import { useAppointmentsSummary } from "../features/paymentMethods/useAppointmentssummary";
import Spinner from "../ui/Spinner";

function PaymentPage() {
  const [selectedMethod, setSelectedMethod] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get reservation ID from navigation state
  const reservationId = location.state?.reservationId;

  // Fetch appointment summary from API using the hook
  const { isLoading, appointmentInfo, error } = useAppointmentsSummary(reservationId);

  // Fallback to location state or default values if no reservation ID
  const displayAppointmentInfo = appointmentInfo || location.state || {
    drName: "Dr. Ahmed El Khatib",
    speciality: "Cardiology",
    date: "December 15, 2025",
    time: "10:30 AM",
    clinicName: "Mayo Clinic",
    clinicLocation: "Maadi , Cairo, Egypt",
    price: 850,
    reservationId: null,
  };
  function onclick() {
    if (!selectedMethod) return; // prevent navigation if no method selected
    navigate("/patient/payment/confirm-payment", {
      state: {
        drName: displayAppointmentInfo.drName,
        speciality: displayAppointmentInfo.speciality,
        date: displayAppointmentInfo.date,
        time: displayAppointmentInfo.time,
        clinicName: displayAppointmentInfo.clinicName,
        clinicLocation: displayAppointmentInfo.clinicLocation,
        price: displayAppointmentInfo.price,
        payMethod: selectedMethod,
        reservationId: displayAppointmentInfo.reservationId,
        appointmentCode: displayAppointmentInfo.appointmentCode,
      },
    });
  }

  // Show loading spinner while fetching appointment data
  if (isLoading && reservationId) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-8 flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  // Show error message if fetching failed
  if (error && reservationId) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-red-500 p-4 text-center">
            Error loading appointment details. Please try again.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <PaymentPageTitle />

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <aside className="w-full lg:w-1/3">
            <AppointmentSummaryCard
              drName={displayAppointmentInfo.drName}
              speciality={displayAppointmentInfo.speciality}
              date={displayAppointmentInfo.date}
              time={displayAppointmentInfo.time}
              clinicName={displayAppointmentInfo.clinicName}
              clinicLocation={displayAppointmentInfo.clinicLocation}
              price={displayAppointmentInfo.price}
            />
          </aside>

          <main className="w-full lg:w-2/3">
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8">
              <PaymentMethodHeader />
              
              <PaymentMethodSelector
                selectedMethod={selectedMethod}
                onSelectMethod={setSelectedMethod}
              />

              <button
                onClick={onclick}
                disabled={!selectedMethod}
                className={`w-full px-9 py-4 mt-5 font-semibold rounded-lg shadow-[0px_5px_15px_rgba(0,0,0,0.20)] transition-colors ${
                  selectedMethod
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                Confirm Appointment ➡️
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
