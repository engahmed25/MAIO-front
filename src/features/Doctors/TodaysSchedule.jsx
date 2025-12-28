import { Calendar, Clock, ChevronRight } from "lucide-react";
import Button from "../../ui/Button";
// TodaySchedule Component
function TodaySchedule({ selectedDate, appointmentsData }) {
  const dateKey = `${selectedDate.getFullYear()}-${String(
    selectedDate.getMonth() + 1
  ).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`;
  const appointments = appointmentsData[dateKey] || [];

  const formatDate = (date) => {
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();
    const isTomorrow =
      date.toDateString() ===
      new Date(today.getTime() + 86400000).toDateString();

    if (isToday) return "Today";
    if (isTomorrow) return "Tomorrow";

    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-800">
            Schedule for {formatDate(selectedDate)}
          </h2>
        </div>
        <span className="text-sm text-gray-500">
          {appointments.length} appointment
          {appointments.length !== 1 ? "s" : ""}
        </span>
      </div>

      {appointments.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">
            No appointments scheduled for this day
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {appointments.map((apt, index) => (
            <div
              key={index}
              className="flex items-start justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm font-semibold text-gray-900">
                    {apt.time}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-medium ${
                      apt.status === "Scheduled"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {apt.status}
                  </span>
                </div>
                <div className="text-base font-medium text-gray-900 mb-1">
                  {apt.patient}
                </div>
                <div className="text-sm text-gray-600 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {apt.type}
                </div>
              </div>
              <Button className="flex items-center gap-1 px-3 py-1 text-sm">
                View
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TodaySchedule;
