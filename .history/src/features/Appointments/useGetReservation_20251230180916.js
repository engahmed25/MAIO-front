// to get reservation details by ID

import { useQuery } from "@tanstack/react-query";
import axiosClient from "../../services/axiosClient";

const backendURL = import.meta.env.VITE_BACKEND_URL;

async function getReservationDetails(reservationId) {
    const res = await axiosClient.get(`${backendURL}/api/reservations/${reservationId}`);
    return res.data;
}

export function useGetReservation(reservationId) {
    const { isLoading, data: reservation, error } = useQuery({
        queryKey: ["reservation", reservationId],
        queryFn: () => getReservationDetails(reservationId),
        enabled: !!reservationId,
    });

    return {
        isLoading,
        reservation,
        error,
    };
}
