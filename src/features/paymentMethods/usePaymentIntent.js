// import { useMutation } from "@tanstack/react-query";
// import { createPaymentIntent } from "../../services/apiPayment";

export function usePaymentIntent() {
  return useMutation({
    mutationFn: ({ reservationId }) => createPaymentIntent(reservationId),
  });
}
// export function usePaymentIntent() {
//     return useMutation({
//         mutationFn: ({ price, reservationId }) => createPaymentIntent({ price, reservationId }),
//     });
// }
