import { useMutation } from "@tanstack/react-query";
import { confirmPaymentIntent } from "../../services/apiPayment";

export function useConfirmPaymentIntent() {
    const { mutateAsync, isPending, error } = useMutation({
        mutationFn: ({ reservationId, paymentIntentId }) =>
            confirmPaymentIntent({ reservationId, paymentIntentId }),
    });

    return {
        confirmIntent: mutateAsync,
        isConfirming: isPending,
        error,
    };
}
