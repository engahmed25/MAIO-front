// to create a reservation/booking

import { useMutation } from "@tanstack/react-query";
import { createReservation } from "../../services/apiDoctors";

export function useCreateReservation() {
    const { isPending, mutate, error } = useMutation({
        mutationFn: ({ doctorId, date, startTime, endTime, reasonForVisit }) =>
            createReservation(doctorId, date, startTime, endTime),
    });

    return {
        isPending,
        mutate,
        error,
    };
}
