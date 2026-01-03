import { useState, useCallback, useMemo } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay, isSameDay } from "date-fns";
import { enUS } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useDoctorMonthAppointments } from "../features/Doctors/useDoctorMonthAppointments";
import { useDoctorAppointmentsByDate } from "../features/Doctors/useDoctorAppointmentsByDate";
import { Clock, User, Phone } from "lucide-react";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

function DoctorCalendarPage() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Fetch all appointments for the current month (includes appointmentsByDay indicator and all appointments)
  const { appointmentsByDay, allAppointments: allMonthAppointments } =
    useDoctorMonthAppointments(currentMonth);

  // Fetch appointments for selected date for detail view
  const { appointments, isLoading } = useDoctorAppointmentsByDate(selectedDate);

  // Convert all month appointments to calendar events
  const events = useMemo(() => {
    if (!allMonthAppointments || allMonthAppointments.length === 0) return [];

    return allMonthAppointments
      .filter(
        (apt) =>
          apt.appointmentDetails?.startTime &&
          apt.appointmentDetails?.endTime &&
          apt.appointmentDate // Make sure we have the appointment date
      ) // Filter out invalid appointments
      .map((apt) => {
        const [hours, minutes] = apt.appointmentDetails.startTime.split(":");
        const [endHours, endMinutes] =
          apt.appointmentDetails.endTime.split(":");

        // Use the appointmentDate (which is the date this appointment is scheduled for)
        const startDate = new Date(apt.appointmentDate);
        startDate.setHours(parseInt(hours), parseInt(minutes), 0);

        const endDate = new Date(apt.appointmentDate);
        endDate.setHours(parseInt(endHours), parseInt(endMinutes), 0);

        return {
          id: apt.appointmentId,
          title: apt.patientName || "No Patient",
          start: startDate,
          end: endDate,
          resource: apt,
        };
      });
  }, [allMonthAppointments]);

  const handleSelectSlot = useCallback((slotInfo) => {
    setSelectedDate(slotInfo.start);
  }, []);

  const handleSelectEvent = useCallback((event) => {
    setSelectedDate(event.start);
  }, []);

  const handleNavigate = useCallback((date) => {
    setCurrentMonth(date);
    setSelectedDate(date);
  }, []);

  const dayPropGetter = useCallback(
    (date) => {
      // Normalize both dates to midnight for accurate comparison
      const normalizedDate = new Date(date);
      normalizedDate.setHours(0, 0, 0, 0);

      const normalizedSelectedDate = new Date(selectedDate);
      normalizedSelectedDate.setHours(0, 0, 0, 0);

      if (normalizedDate.getTime() === normalizedSelectedDate.getTime()) {
        return {
          className: "selected-day-bg",
          style: {
            backgroundColor: "#bfdbfe",
          },
        };
      }
      return {};
    },
    [selectedDate]
  );

  const getAppointmentStatus = (status) => {
    const statusStyles = {
      scheduled: "bg-blue-100 text-blue-800 border-blue-300",
      confirmed: "bg-green-100 text-green-800 border-green-300",
      pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
      completed: "bg-gray-100 text-gray-800 border-gray-300",
      canceled: "bg-red-100 text-red-800 border-red-300",
    };
    return statusStyles[status] || statusStyles.pending;
  };

  const eventStyleGetter = (event) => {
    const appointment = event.resource;
    let backgroundColor = "#3b82f6"; // blue

    switch (appointment.appointmentDetails?.status) {
      case "confirmed":
        backgroundColor = "#10b981"; // green
        break;
      case "pending":
        backgroundColor = "#f59e0b"; // yellow
        break;
      case "completed":
        backgroundColor = "#6b7280"; // gray
        break;
      case "canceled":
        backgroundColor = "#ef4444"; // red
        break;
      default:
        backgroundColor = "#3b82f6"; // blue
    }

    return {
      style: {
        backgroundColor,
        borderRadius: "5px",
        opacity: 0.8,
        color: "white",
        border: "0px",
        display: "block",
      },
    };
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Calendar</h1>
        <p className="text-gray-600 mt-1">
          Manage your appointments and schedule
        </p>
      </div>

      <div className="flex-1 flex gap-6 overflow-hidden">
        {/* Main Calendar */}
        <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: "100%" }}
            onSelectSlot={handleSelectSlot}
            onSelectEvent={handleSelectEvent}
            onNavigate={handleNavigate}
            selectable
            eventPropGetter={eventStyleGetter}
            dayPropGetter={dayPropGetter}
            views={["month", "week", "day"]}
            defaultView="month"
          />
        </div>

        {/* Right Sidebar - Appointments for Selected Date */}
        <div className="w-96 bg-white rounded-lg shadow-sm border border-gray-200 p-6 overflow-y-auto">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {format(selectedDate, "EEEE, MMM d")}
            </h2>
            <p className="text-sm text-gray-500">
              {appointments?.length || 0} appointment
              {appointments?.length !== 1 ? "s" : ""}
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : appointments && appointments.length > 0 ? (
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div
                  key={appointment.appointmentId}
                  className={`border rounded-lg p-4 ${getAppointmentStatus(
                    appointment.appointmentDetails?.status
                  )}`}
                >
                  {/* Time */}
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-4 h-4" />
                    <span className="font-semibold">
                      {appointment.appointmentDetails?.startTime}
                    </span>
                  </div>

                  {/* Patient Info */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span className="font-medium">
                        {appointment.patientName || "No Patient"}
                      </span>
                    </div>

                    {appointment.patientInfo?.emergencyContact && (
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-4 h-4" />
                        <span>{appointment.patientInfo.emergencyContact}</span>
                      </div>
                    )}

                    {appointment.appointmentDetails?.reasonForVisit && (
                      <p className="text-sm mt-2">
                        {appointment.appointmentDetails.reasonForVisit}
                      </p>
                    )}
                  </div>

                  {/* Status Badge */}
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wide">
                      {appointment.appointmentDetails?.status}
                    </span>

                    {/* View Profile Button */}
                    <Button
                      type="secondary"
                      onClick={() =>
                        navigate(
                          `/doctor/patient/${appointment.patientId || ""}`
                        )
                      }
                      className="text-xs px-3 py-1"
                    >
                      View Profile
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-gray-400 mb-2">
                <Clock className="w-12 h-12 mx-auto" />
              </div>
              <p className="text-gray-500">No appointments scheduled</p>
              <p className="text-sm text-gray-400 mt-1">
                for {format(selectedDate, "MMMM d, yyyy")}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Custom CSS for calendar styling */}
      <style>{`
        .rbc-calendar {
          font-family: inherit;
        }
        .rbc-header {
          padding: 12px 0;
          font-weight: 600;
          color: #374151;
          background-color: #f9fafb;
          border-bottom: 2px solid #e5e7eb;
        }
        .rbc-today {
          background-color: #dbeafe;
        }
        .rbc-off-range-bg {
          background-color: #f9fafb;
        }
        .rbc-event {
          padding: 2px 5px;
          font-size: 0.875rem;
        }
        .rbc-selected-cell {
          background-color: #bfdbfe !important;
        }
        .selected-day-bg {
          background-color: #bfdbfe !important;
        }
        .rbc-day-bg.selected-day-bg {
          background-color: #bfdbfe !important;
        }
        .rbc-toolbar {
          padding: 15px 0;
          font-weight: 600;
        }
        .rbc-toolbar button {
          color: #374151;
          border: 1px solid #e5e7eb;
          padding: 8px 16px;
          border-radius: 6px;
          background-color: white;
          transition: all 0.2s;
        }
        .rbc-toolbar button:hover {
          background-color: #f3f4f6;
          border-color: #d1d5db;
        }
        .rbc-toolbar button.rbc-active {
          background-color: #3b82f6;
          color: white;
          border-color: #3b82f6;
        }
        .rbc-month-view {
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          overflow: hidden;
        }
        .rbc-date-cell {
          padding: 8px;
        }
        .rbc-event-label {
          font-size: 0.75rem;
        }
      `}</style>
    </div>
  );
}

export default DoctorCalendarPage;
