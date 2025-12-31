import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import StripeProvider from "./Stripe/StripeProvider";
import ConfirmAppointmentPage from "../../pages/ConfirmAppointmentPage";
import CardPaymentFormPage from "../../pages/CardPaymentFormPage";
import { usePaymentIntent } from "./usePaymentIntent";

function PaymentConfirmation() {
  const location = useLocation();
  const {
    drName,
    speciality,
    date,
    time,
    clinicName,
    clinicLocation,
    price,
    payMethod,
    reservationId,
  } = location.state || {};

  const { mutate: createPaymentIntent, data, isLoading } = usePaymentIntent();

  useEffect(() => {
    if (payMethod === "debitCard" && !data) {
      createPaymentIntent({ price, reservationId });
    }
  }, [payMethod, price, reservationId, data, createPaymentIntent]);

  if (!payMethod) return null;

  if (payMethod === "value") {
    return (
      <div className="mt-4 p-4 rounded-xl border border-gray-200 bg-gray-50">
        <p className="text-sm sm:text-base font-medium text-gray-800">
          valU installment plan will be available soon.
        </p>
      </div>
    );
  }

  if (payMethod === "cash") {
    return (
      <div className="p-4 rounded-xl border border-gray-200 bg-gray-50">
        <ConfirmAppointmentPage
          payMethod={"cash"}
          appointmentInfo={appointmentData}
        />
      </div>
    );
  }

  if (payMethod === "debitCard") {
    return (
      <StripeProvider>
        <div className="mt-6 p-6  bg-white rounded-2xl shadow-lg border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Card Payment
          </h2>

          {data?.data?.clientSecret ? (
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl">
              <CardPaymentFormPage
                clientSecret={data.data.clientSecret}
                appointmentData={{
                  drName,
                  speciality,
                  date,
                  time,
                  clinicName,
                  clinicLocation,
                  price,
                }}
              />
            </div>
          ) : (
            <p className="text-gray-600 text-center py-4 animate-pulse">
              {isCreating ? "Creating payment..." : "Loading payment…"}
            </p>
          )}
        </div>
      </StripeProvider>
    );
  }

  return null;
}

export default PaymentConfirmation;
