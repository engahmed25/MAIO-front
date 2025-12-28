import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CardPaymentFormPage({ clientSecret }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Add this hook

  const handlePayment = async (e) => {
    e.preventDefault();
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
      alert(error.message);
    } else if (paymentIntent?.status === "succeeded") {
      alert("Payment Successful!");
      navigate(
        "/confirmappointmentpage"
        //   , {
        //   state: {
        //     payMethod: "debitCard",
        //     // appointmentInfo,
        //   },
        // }
      );
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
            disabled={!stripe || loading}
            className={`w-full bg-blue-600 text-white p-3 sm:p-4 rounded-lg 
            hover:bg-blue-700 active:bg-blue-800 transition font-medium
            ${loading && "bg-gray-400 cursor-not-allowed"}`}
          >
            {loading ? "Processing…" : "Submit Payment"}
          </button>
        </form>

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
