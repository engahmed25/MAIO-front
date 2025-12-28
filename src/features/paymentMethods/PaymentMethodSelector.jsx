import { FaStarOfLife, FaCreditCard } from "react-icons/fa";
import { GiTakeMyMoney } from "react-icons/gi";
import PaymentMethodCard from "./PaymentMethodCard";

const paymentOptions = [
  {
    id: "value",
    icon: FaStarOfLife,
    title: "valU Installments",
    subTitle: "Pay over multiple months with valU financing.",
    badge: "Installments",
  },
  {
    id: "debitCard",
    icon: FaCreditCard,
    title: "Credit/Debit Card",
    subTitle: "Visa, Mastercard, Meeza.",
  },
  {
    id: "cash",
    icon: GiTakeMyMoney,
    title: "Cash on Arrival",
    subTitle: "Pay the fee directly at the clinic reception.",
  },
];

function PaymentMethodSelector({ selectedMethod, onSelectMethod }) {
  return (
    <div className="space-y-3 sm:space-y-4">
      {paymentOptions.map((option) => (
        <PaymentMethodCard
          key={option.id}
          icon={option.icon}
          title={option.title}
          subtitle={option.subTitle}
          badge={option.badge}
          isSelected={selectedMethod === option.id}
          onClick={() => onSelectMethod(option.id)}
        />
      ))}
    </div>
  );
}

export default PaymentMethodSelector;
