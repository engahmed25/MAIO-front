import React, { useMemo } from "react";
import { Check } from "lucide-react"; // Or use a custom SVG if you don't have lucide-react
import AppointmentSummaryCard from "../features/paymentMethods/AppointmentSummaryCard";
import PaymentStatusMessage from "../features/paymentMethods/PaymentStatusMessage";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../ui/Button";

function ConfirmAppointmentPage({
  payMethod: payMethodProp = "debitCard",
  appointmentInfo,
}) {
  const { state } = useLocation();
  const navigate = useNavigate();

  const payMethod = state?.payMethod || payMethodProp || "debitCard";

  const appointmentSummary = useMemo(() => {
    if (appointmentInfo) return appointmentInfo;
    if (state?.appointmentInfo) return state.appointmentInfo;
    if (state?.confirmedAppointment) {
      const appt = state.confirmedAppointment;
      return {
        drName: appt?.doctorId?.name || "Doctor",
        speciality: appt?.doctorId?.specialization,
        date: appt?.appointmentDate
          ? new Date(appt.appointmentDate).toLocaleDateString()
          : undefined,
        time:
          appt?.startTime && appt?.endTime
            ? `${appt.startTime} - ${appt.endTime}`
            : undefined,
        clinicName: appt?.doctorId?.clinicName,
        clinicLocation: appt?.doctorId?.clinicAddress,
        price: appt?.amount,
      };
    }
    return null;
  }, [appointmentInfo, state]);

  function onClick() {
    navigate("/patient/dashboard");
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
        {appointmentSummary ? (
          <AppointmentSummaryCard
            drName={appointmentSummary.drName}
            speciality={appointmentSummary.speciality}
            date={appointmentSummary.date}
            time={appointmentSummary.time}
            clinicName={appointmentSummary.clinicName}
            clinicLocation={appointmentSummary.clinicLocation}
            price={appointmentSummary.price}
          />
        ) : (
          <p className="text-gray-500 text-sm mt-4">
            Appointment details will appear once available.
          </p>
        )}
        <div className="w-full border-t border-gray-100 my-6"></div>
        <PaymentStatusMessage
          payMethod={payMethod}
          shouldCheckAppointments={state?.shouldCheckUpcoming}
          appointmentId={state?.confirmedAppointment?._id}
        />
        <Button
          onClick={onClick}
          className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors"
        >
          Done
        </Button>
      </div>
    </div>
  );
}

export default ConfirmAppointmentPage;
