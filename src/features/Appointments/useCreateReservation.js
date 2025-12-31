// to create a reservation/booking
import { createReservation } from "../../services/apiDoctors";
import { useMutation } from "@tanstack/react-query";
// import { createReservation } from "../../services/apiPayment";

export function useCreateReservation() {
    const { isPending, mutate, error } = useMutation({
        mutationFn: ({ doctorId, date, startTime, endTime, reasonForVisit }) =>
            createReservation(doctorId, date, startTime, endTime, reasonForVisit),
    });

    return {
        isPending,
        mutate,
        error,
    };
}
