import { useMutation } from "@tanstack/react-query";
import { createPaymentIntent } from "../../services/apiPayment";

export function usePaymentIntent() {
  return useMutation({
    mutationFn: ({ reservationId }) => createPaymentIntent(reservationId),
  });
}
