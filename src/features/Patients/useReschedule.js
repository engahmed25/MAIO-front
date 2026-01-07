import { useMutation, useQueryClient } from "@tanstack/react-query";
import { rescheduleAppointment } from "../../services/apiPatients";
import toast from "react-hot-toast";

export function useReschedule() {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: rescheduleAppointment,
        onSuccess: (data) => {
            toast.success("Appointment rescheduled successfully!");
            // Invalidate queries to refetch appointment data
            queryClient.invalidateQueries(["patientAppointments"]);
        },
        onError: (error) => {
            console.error("Reschedule error:", error);
            toast.error(
                error?.response?.data?.message ||
                "Failed to reschedule appointment. Please try again."
            );
        },
    });

    return {
        reschedule: mutation.mutate,
        isRescheduling: mutation.isPending,
        error: mutation.error,
    };
}
