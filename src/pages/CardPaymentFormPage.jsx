import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useConfirmPaymentIntent } from "../features/paymentMethods/useConfirmPaymentIntent";

function CardPaymentFormPage({
  clientSecret,
  paymentIntentId,
  reservationId,
  appointmentData,
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const {
    confirmIntent,
    isConfirming,
    error: confirmError,
  } = useConfirmPaymentIntent();

  const handlePayment = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!reservationId) {
      setErrorMessage("Missing reservation. Please restart checkout.");
      return;
    }

    if (!stripe || !elements) return;

    setLoading(true);

    const cardElement = elements.getElement(CardNumberElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement,
        },
      }
    );

    if (error) {
      setErrorMessage(error.message || "Payment failed. Please try again.");
      setLoading(false);
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      try {
        const confirmedAppointment = await confirmIntent({
          reservationId,
          paymentIntentId: paymentIntent?.id || paymentIntentId,
        });

        navigate("/confirmappointmentpage", {
          state: {
            payMethod: "debitCard",
            appointmentInfo: appointmentData,
            confirmedAppointment,
            reservationId,
            shouldCheckUpcoming: true,
          },
        });
      } catch (err) {
        setErrorMessage(
          err?.response?.data?.message ||
            err?.message ||
            "Payment succeeded, but booking confirmation failed."
        );
      }
    } else {
      setErrorMessage("Payment not completed. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="w-full bg-gray-50 p-4 sm:p-6">
      <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Payment Details
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Enter your card information
          </p>
        </div>

        {/* Stripe Form */}
        <form onSubmit={handlePayment} className="space-y-4 sm:space-y-5">
          {/* Card Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Card Number
            </label>

            <div className="p-3 sm:p-4 border border-gray-300 rounded-lg bg-white focus-within:ring-2 focus-within:ring-blue-500">
              <CardNumberElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#333",
                    },
                  },
                }}
              />
            </div>
          </div>

          {/* Expiry + CVC */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Expiry */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expiry Date
              </label>
              <div className="p-3 sm:p-4 border border-gray-300 rounded-lg bg-white focus-within:ring-2 focus-within:ring-blue-500">
                <CardExpiryElement />
              </div>
            </div>

            {/* CVC */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CVC
              </label>
              <div className="p-3 sm:p-4 border border-gray-300 rounded-lg bg-white focus-within:ring-2 focus-within:ring-blue-500">
                <CardCvcElement />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            disabled={!stripe || loading || isConfirming}
            className={`w-full bg-blue-600 text-white p-3 sm:p-4 rounded-lg 
            hover:bg-blue-700 active:bg-blue-800 transition font-medium
            ${(loading || isConfirming) && "bg-gray-400 cursor-not-allowed"}`}
          >
            {loading || isConfirming ? "Processing…" : "Submit Payment"}
          </button>
        </form>

        {(errorMessage || confirmError) && (
          <p className="text-red-600 text-center mt-4 text-sm">
            {errorMessage ||
              confirmError?.response?.data?.message ||
              confirmError?.message}
          </p>
        )}

        {/* Security Note */}
        <div className="mt-6 p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-xs sm:text-sm text-gray-600 text-center">
            🔒 Your payment information is encrypted and secure
          </p>
        </div>
      </div>
    </div>
  );
}

export default CardPaymentFormPage;
