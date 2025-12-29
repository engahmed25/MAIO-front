export default function PaymentStatusMessage({ payMethod }) {
  if (payMethod === "cash") {
    return (
      <div className="space-y-2 mt-4">
        <h3 className="text-lg font-semibold text-gray-900">Cash On Arrival</h3>
        <p className="text-gray-500 text-sm sm:text-base">
          Your appointment is scheduled. <br />
          Please pay at the clinic upon arrival.
        </p>
      </div>
    );
  }

  if (payMethod === "debitCard") {
    return (
      <div className="space-y-2 mt-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Card Payment Successful
        </h3>
        <p className="text-gray-500 text-sm sm:text-base">
          Your payment has been completed successfully.
        </p>
      </div>
    );
  }

  return null;
}
