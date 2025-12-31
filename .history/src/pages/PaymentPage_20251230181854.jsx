import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PaymentMethodSelector from "../features/paymentMethods/PaymentMethodSelector";
import AppointmentSummaryCard from "../features/paymentMethods/AppointmentSummaryCard";
import PaymentPageTitle from "../features/paymentMethods/PaymentPageTitle";
import PaymentMethodHeader from "../features/paymentMethods/PaymentMethodHeader";

function PaymentPage() {
  const [selectedMethod, setSelectedMethod] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Get appointment info from navigation state (passed from BookingSlot)
  const appointmentInfo = location.state || {
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
        drName: appointmentInfo.drName,
        speciality: appointmentInfo.speciality,
        date: appointmentInfo.date,
        time: appointmentInfo.time,
        clinicName: appointmentInfo.clinicName,
        clinicLocation: appointmentInfo.clinicLocation,
        price: appointmentInfo.price,
        payMethod: selectedMethod,
        reservationId: appointmentInfo.reservationId,
        appointmentCode: appointmentInfo.appointmentCode,
      },
    });
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <PaymentPageTitle />

          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            <aside className="w-full lg:w-1/3">
              <AppointmentSummaryCard
                drName={appointmentInfo.drName}
                speciality={appointmentInfo.speciality}
                date={appointmentInfo.date}
                time={appointmentInfo.time}
                clinicName={appointmentInfo.clinicName}
                clinicLocation={appointmentInfo.clinicLocation}
                price={appointmentInfo.price}
                
              />
            </aside>

            <main className="w-full lg:w-2/3">
              <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8">
                <PaymentMethodHeader />

                {/* Payment Methods */}
                <PaymentMethodSelector
                  selectedMethod={selectedMethod}
                  onSelectMethod={setSelectedMethod}
                />

                <button
                  onClick={onclick}
                  className={` shadow-[0px_5px_15px_rgba(0,0,0,0.20)] rounded-(--main-radius) px-9 py-4 mt-5 w-full font-semibold
                    ${
                      selectedMethod
                        ? " bg-blue-500 text-white"
                        : " bg-white  border-gray-300"
                    }`}
                >
                  Confirm Appointment ➡️
                </button>

                {/* Payment Details (Form or Info) */}
                {/* <PaymentDetails payMethod={selectedMethod} /> */}

                {/* <SecurityMessage /> */}
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}

export default PaymentPage;
