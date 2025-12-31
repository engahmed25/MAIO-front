import { useMemo } from "react";
import { useUpcomingAppointments } from "./useUpcomingAppointments";
import Spinner from "../../ui/Spinner";

export default function PaymentStatusMessage({
  payMethod,
  shouldCheckAppointments = false,
  appointmentId,
}) {
  const shouldLoadUpcoming =
    shouldCheckAppointments && payMethod === "debitCard";

  const { appointments, isLoading, error } =
    useUpcomingAppointments(shouldLoadUpcoming);

  const nextAppointment = useMemo(() => {
    if (!appointments || appointments.length === 0) return null;
    if (appointmentId) {
      const match = appointments.find(
        (appt) => String(appt?._id) === String(appointmentId)
      );
      if (match) return match;
    }
    return appointments[0];
  }, [appointments, appointmentId]);

  if (payMethod === "cash") {
    return (
      <div className="space-y-2 mt-4">
        <h3 className="text-lg font-semibold text-gray-900">Cash On Arrival</h3>
        <p className="text-gray-500 text-sm sm:text-base">
          Your appointment is scheduled. <br />
          Please pay at the clinic upon arrival.
        </p>
      </div>
    );
  }

  if (payMethod === "debitCard") {
    return (
      <div className="space-y-2 mt-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Card Payment Successful
        </h3>
        <p className="text-gray-500 text-sm sm:text-base">
          Your payment has been completed successfully.
        </p>

        {shouldLoadUpcoming && (
          <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
            {isLoading && (
              <div className="flex justify-center py-2">
                <Spinner />
              </div>
            )}

            {error && (
              <p className="text-red-600 text-sm text-center">
                {error?.response?.data?.message ||
                  error?.message ||
                  "Unable to load upcoming appointments."}
              </p>
            )}

            {!isLoading && !error && nextAppointment && (
              <div className="text-sm text-gray-700 space-y-1 text-left">
                <p className="font-semibold text-gray-900">
                  Upcoming:{" "}
                  {nextAppointment?.doctorId
                    ? `${nextAppointment.doctorId.firstName} ${nextAppointment.doctorId.lastName}`
                    : "Your doctor"}
                </p>
                <p>
                  {nextAppointment?.appointmentDate
                    ? new Date(nextAppointment.appointmentDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "Date TBA"}
                </p>
                <p>
                  {nextAppointment?.startTime && nextAppointment?.endTime
                    ? `${nextAppointment.startTime} - ${nextAppointment.endTime}`
                    : "Time TBA"}
                </p>
                {nextAppointment?.doctorId?.clinicAddress && (
                  <p>{nextAppointment.doctorId.clinicAddress}</p>
                )}
              </div>
            )}

            {!isLoading && !error && !nextAppointment && (
              <p className="text-sm text-gray-600 text-center">
                Your appointment will appear here once the booking is finalized.
              </p>
            )}
          </div>
        )}
      </div>
    );
  }

  return null;
}
