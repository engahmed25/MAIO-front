import { useMutation } from "@tanstack/react-query";
import { createPaymentIntent } from "../../services/apiPayment";

export function useCreatePaymentIntent() {
    const { mutateAsync, isPending, error } = useMutation({
        mutationFn: (reservationId) => createPaymentIntent(reservationId),
    });

    return {
        createIntent: mutateAsync,
        isCreating: isPending,
        error,
    };
}
