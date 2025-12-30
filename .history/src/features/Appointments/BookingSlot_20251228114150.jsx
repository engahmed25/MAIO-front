import React, { useState, useMemo } from "react";
import { useAuthUser, useIsAuthenticated } from "react-auth-kit";
import toast from "react-hot-toast";
import LoginModal from "../Authentication/LoginModal";
import Button from "../../ui/Button";
import { useBookingDoctor } from "./useBookingDoctor";
import { useAvailableDays } from "./useAvailableDays";
import Spinner from "../../ui/Spinner";

export default function BookingSlots({ id }) {
  const [selectedDateIndex, setSelectedDateIndex] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isAuthenticated = useIsAuthenticated();
  const authUser = useAuthUser();
  const user = authUser()?.user;

  // Fetch available days for the doctor
  const { isLoading: isLoadingAvailableDays, availableDays, error: availableDaysError } = useAvailableDays(id);

  // Generate dates for the next 7 days
  const dates = useMemo(() => {
    const today = new Date();
    const generatedDates = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
      const dayName = dayNames[date.getDay()];
      const dayDate = date.getDate();
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(dayDate).padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`; // Format: YYYY-MM-DD

      generatedDates.push({
        day: dayName,
        date: dayDate,
        fullDate: formattedDate,
      });
    }

    return generatedDates;
  }, []);

  // Check if a day is available
  const isDateAvailable = (dayName) => {
    if (!availableDays?.data || !Array.isArray(availableDays.data)) {
      return false;
    }
    return availableDays.data.some(
      (availableDay) => availableDay.toLowerCase() === dayName.toLowerCase()
    );
  };

  // Fetch availability for selected date
  const selectedDate = selectedDateIndex !== null ? dates[selectedDateIndex] : null;
  const { isLoading: isLoadingSlots, availability, error: availabilityError } = useBookingDoctor(
    id,
    selectedDate?.fullDate
  );

  // Extract time slots from availability response
  const timeSlots = useMemo(() => {
    if (availability?.data?.slots) {
      return availability.data.slots.map((slot) => ({
        startTime: slot.startTime,
        endTime: slot.endTime,
        displayTime: `${slot.startTime} - ${slot.endTime}`,
      }));
    }
    return [];
  }, [availability]);

  function handleBooking() {
    if (!isAuthenticated()) {
      setIsModalOpen(true);
      toast("Login to book an appointment", {
        icon: "⚠️",
      });
    }
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  if (isLoadingAvailableDays) {
    return (
      <div className="max-w-4xl p-8 flex justify-center">
        <Spinner />
      </div>
    );
  }

  if (availableDaysError) {
    return (
      <div className="max-w-4xl p-8">
        <div className="text-red-500 p-4">Error loading available days. Please try again.</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl p-8 ">
      <h2 className="text-3xl font-semibold text-[var(--head-desc-color)] text-center mb-6">
        Book an appointment
      </h2>

      {/* Date Selection */}
      <div className="mb-8">
        <h3 className="text-m font-semibold text-[var(--head-desc-color)] mb-3">
          Select Date
        </h3>
        <div className="flex gap-3 flex-wrap pb-2">
          {dates.map((item, index) => {
            const dayAvailable = isDateAvailable(item.day);
            return (
              <Button
                key={index}
                onClick={() => {
                  if (dayAvailable) {
                    setSelectedDateIndex(index);
                    setSelectedTime(null); // Reset selected time when date changes
                  }
                }}
                disabled={!dayAvailable}
                className={`flex flex-col items-center justify-center min-w-[55px] md:min-w-[70px] h-20 rounded-xl border-2 transition-all ${
                  !dayAvailable
                    ? "!bg-gray-100 !border-gray-300 !text-gray-400 cursor-not-allowed opacity-50"
                    : selectedDateIndex === index
                    ? "!border-[var(--main-color)] !bg-[var(--main-verylite-color)] !text-[var(--main-color)]"
                    : "!bg-[var(--sec-color)] !border-gray-200 hover:!border-gray-400 !text-[var(--head-desc-color)]"
                }`}
              >
                <span className="text-xs font-medium uppercase">{item.day}</span>
                <span className="text-2xl font-semibold mt-1">{item.date}</span>
              </Button>
            );
          })}
        </div>
      </div>

      {/* Time Selection - Only show if a date is selected */}
      {selectedDateIndex !== null && (
        <div className="mb-8">
          <h3 className="text-m font-semibold text-gray-700 mb-3">Select Time</h3>

          {isLoadingSlots && (
            <div className="flex justify-center py-8">
              <Spinner />
            </div>
          )}

          {availabilityError && (
            <div className="text-red-500 p-4 mb-4">
              Error loading available slots. Please try again.
            </div>
          )}

          {!isLoadingSlots && timeSlots.length === 0 && !availabilityError && (
            <div className="text-gray-500 p-4 mb-4">
              No available slots for this date.
            </div>
          )}

          {!isLoadingSlots && timeSlots.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {timeSlots.map((slot, index) => (
                <Button
                  key={index}
                  onClick={() => setSelectedTime(slot)}
                  className={`py-3 px-4 rounded-lg border-2 text-m font-medium transition-all ${
                    selectedTime?.startTime === slot.startTime
                      ? "!border-[var(--main-color)] !bg-[var(--main-verylite-color)] !text-[var(--main-color)]"
                      : "!bg-[var(--sec-color)] !border-gray-200 hover:!border-gray-400 !text-[var(--head-desc-color)]"
                  }`}
                >
                  {slot.displayTime}
                </Button>
              ))}
            </div>
          )}
        </div>
      )}

      <Button
        onClick={handleBooking}
        disabled={selectedTime === null || selectedDateIndex === null}
        className={`w-[80%] md:w-[50%] py-4 !rounded-[20px] text-white font-semibold transition-all ${
          selectedTime === null || selectedDateIndex === null
            ? "!bg-gray-300 cursor-not-allowed"
            : "!bg-[var(--main-lite-color)] hover:!bg-[var(--main-color)]"
        }`}
      >
        {isAuthenticated()
          ? "Book Appointment"
          : "You must be logged in to book"}
      </Button>

      {/* Login Modal */}
      <LoginModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

