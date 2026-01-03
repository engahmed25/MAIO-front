import { useQuery } from "@tanstack/react-query";
import { getDoctorAppointmentsByDate } from "../../services/apiDoctors";

// Hook to fetch appointment counts for multiple days in a month
export function useDoctorMonthAppointments(currentMonth) {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    // Generate all days in the month
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Create array of dates to fetch (only future dates)
    const datesToFetch = [];
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        date.setHours(0, 0, 0, 0);

        if (date >= today) {
            const formattedDate = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
            datesToFetch.push({ day, formattedDate });
        }
    }

    // Fetch appointments for each date
    const queries = datesToFetch.map(({ day, formattedDate }) => {
        return useQuery({
            queryKey: ["doctorAppointments", formattedDate],
            queryFn: () => getDoctorAppointmentsByDate(formattedDate),
            staleTime: 1000 * 60 * 5, // 5 minutes
            retry: false,
            enabled: true,
        });
    });

    // Build a map of day -> hasAppointments
    const appointmentsByDay = {};
    const allAppointments = [];

    queries.forEach((query, index) => {
        const { day, formattedDate } = datesToFetch[index];
        if (query.data?.totalAppointments > 0) {
            appointmentsByDay[day] = true;
        }
        // Collect all appointments from all queries and add the date to each appointment
        if (query.data?.appointments) {
            const appointmentsWithDate = query.data.appointments.map(apt => ({
                ...apt,
                appointmentDate: formattedDate // Add the date this appointment is scheduled for
            }));
            allAppointments.push(...appointmentsWithDate);
        }
    });

    const isLoading = queries.some(q => q.isLoading);

    return {
        appointmentsByDay,
        allAppointments,
        isLoading,
    };
}
