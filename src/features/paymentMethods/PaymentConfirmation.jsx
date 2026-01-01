import { useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import StripeProvider from "./Stripe/StripeProvider";
import ConfirmAppointmentPage from "../../pages/ConfirmAppointmentPage";
import CardPaymentFormPage from "../../pages/CardPaymentFormPage";
import { useCreatePaymentIntent } from "./useCreatePaymentIntent";

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
  } = location.state || {};

  const reservationId = location.state?.reservationId;
  const appointmentCode = location.state?.appointmentCode;
  const [clientSecret, setClientSecret] = useState("");
  const [paymentIntentId, setPaymentIntentId] = useState("");
  const [intentError, setIntentError] = useState(null);

  const { createIntent, isCreating } = useCreatePaymentIntent();

  useEffect(() => {
    let isMounted = true;
    setIntentError(null);

    if (payMethod === "debitCard" && reservationId) {
      createIntent(reservationId)
        .then((data) => {
          if (!isMounted) return;
          setClientSecret(data?.clientSecret || "");
          setPaymentIntentId(data?.paymentIntentId || "");
        })
        .catch((error) => {
          if (!isMounted) return;
          const message =
            error?.response?.data?.message ||
            error?.message ||
            "Failed to create payment intent";
          setIntentError(message);
        });
    }
    return () => {
      isMounted = false;
    };
  }, [createIntent, payMethod, reservationId]);

  const appointmentData = useMemo(
    () => ({
      drName,
      speciality,
      date,
      time,
      clinicName,
      clinicLocation,
      price,
      reservationId,
      appointmentCode,
    }),
    [
      appointmentCode,
      clinicLocation,
      clinicName,
      date,
      drName,
      price,
      reservationId,
      speciality,
      time,
    ]
  );

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

          {intentError && (
            <p className="text-red-600 text-center py-3">{intentError}</p>
          )}

          {!reservationId && (
            <p className="text-red-600 text-center py-3">
              Missing reservation information. Please go back and try again.
            </p>
          )}

          {reservationId && clientSecret ? (
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl">
              <CardPaymentFormPage
                clientSecret={clientSecret}
                paymentIntentId={paymentIntentId}
                reservationId={reservationId}
                appointmentData={appointmentData}
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
