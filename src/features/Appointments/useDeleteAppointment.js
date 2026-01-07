import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosClient from "../../services/axiosClient";

async function deleteAppointment(appointmentId) {
    const response = await axiosClient.delete(`/api/appointments/${appointmentId}`);
    return response.data;
}

export function useDeleteAppointment() {
    const queryClient = useQueryClient();

    const { isPending, mutate, error } = useMutation({
        mutationFn: (appointmentId) => deleteAppointment(appointmentId),
        onSuccess: () => {
            // Invalidate and refetch appointments
            queryClient.invalidateQueries({ queryKey: ["patientAppointments"] });
            queryClient.invalidateQueries({ queryKey: ["upcomingAppointments"] });
        },
    });

    return {
        isPending,
        deleteAppointment: mutate,
        error,
    };
}
