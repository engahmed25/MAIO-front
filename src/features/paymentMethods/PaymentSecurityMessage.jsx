import { TiLockClosed } from "react-icons/ti";

// Security Message Component
function PaymentSecurityMessage() {
  return (
    <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-blue-50 rounded-xl border border-blue-100">
      <div className="flex items-start gap-3">
        <div className="w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center shrink-0">
          <TiLockClosed />
        </div>
        <div>
          <p className="text-xs sm:text-sm font-medium text-blue-900">
            Secure Payment
          </p>
          <p className="text-xs text-blue-700 mt-1">
            Your payment information is encrypted and processed securely. We
            never store your full card details.
          </p>
        </div>
      </div>
    </div>
  );
}

export default PaymentSecurityMessage;
