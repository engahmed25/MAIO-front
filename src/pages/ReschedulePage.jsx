import React, { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Button from "../ui/Button";
import FormInput from "../features/Authentication/FormInput";
import { useBookingDoctor } from "../features/Appointments/useBookingDoctor";
import { useAvailableDays } from "../features/Appointments/useAvailableDays";
import { useCreateReservation } from "../features/Appointments/useCreateReservation";
import Spinner from "../ui/Spinner";

export default function ReschedulePage() {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [selectedDateIndex, setSelectedDateIndex] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [reasonForVisit, setReasonForVisit] = useState("");
  const [isBookingSuccess, setIsBookingSuccess] = useState(false);
  const [bookedData, setBookedData] = useState(null);

  // Fetch available days for the doctor
  const {
    isLoading: isLoadingAvailableDays,
    availableDays,
    error: availableDaysError,
  } = useAvailableDays(doctorId);

  // Use create reservation mutation
  const {
    isPending: isSubmitting,
    mutate: submitReservation,
    error: reservationError,
  } = useCreateReservation();

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
      const formattedDate = `${year}-${month}-${day}`;

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

    const dayNameMap = {
      SUN: "sunday",
      MON: "monday",
      TUE: "tuesday",
      WED: "wednesday",
      THU: "thursday",
      FRI: "friday",
      SAT: "saturday",
    };

    const fullDayName = dayNameMap[dayName];
    return availableDays.data.some(
      (availableDay) => availableDay.toLowerCase() === fullDayName.toLowerCase()
    );
  };

  // Fetch availability for selected date
  const selectedDate =
    selectedDateIndex !== null ? dates[selectedDateIndex] : null;
  const {
    isLoading: isLoadingSlots,
    availability,
    error: availabilityError,
  } = useBookingDoctor(doctorId, selectedDate?.fullDate);

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

  function handleReschedule() {
    if (selectedDateIndex !== null && selectedTime && reasonForVisit.trim()) {
      const selectedDate = dates[selectedDateIndex];
      submitReservation(
        {
          doctorId: doctorId,
          date: selectedDate.fullDate,
          startTime: selectedTime.startTime,
          endTime: selectedTime.endTime,
          reasonForVisit,
        },
        {
          onSuccess: (response) => {
            if (response.success || response.data) {
              toast.success("Appointment rescheduled successfully!");
              setBookedData({
                date: selectedDate.fullDate,
                day: selectedDate.day,
                dayDate: selectedDate.date,
                time: selectedTime.displayTime,
              });
              setIsBookingSuccess(true);
            } else {
              toast.error(
                "Failed to reschedule appointment. Please try again."
              );
            }
          },
          onError: (error) => {
            console.error("Rescheduling error:", error);
            toast.error(
              error?.response?.data?.message ||
                "An error occurred while rescheduling. Please try again."
            );
          },
        }
      );
    }
  }

  function handleDone() {
    // Invalidate queries to refetch appointment data
    queryClient.invalidateQueries(["patientAppointments"]);

    // Navigate back to dashboard
    navigate("/patient/dashboard");
  }

  if (isLoadingAvailableDays) {
    return (
      <div className="max-w-4xl mx-auto p-8 flex justify-center">
        <Spinner />
      </div>
    );
  }

  if (availableDaysError) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <div className="text-red-500 p-4">
          Error loading available days. Please try again.
        </div>
      </div>
    );
  }

  // Show success message after successful booking
  if (isBookingSuccess && bookedData) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <div className="bg-green-50 border-2 border-green-500 rounded-2xl p-8 text-center">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-green-700 mb-2">
              ✓ Appointment Rescheduled Successfully!
            </h2>
            <p className="text-gray-600 text-lg">
              Your appointment has been updated
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 mb-6 border border-green-200">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500 font-semibold">New Date</p>
                <p className="text-2xl font-bold text-gray-800">
                  {bookedData.day}, {bookedData.dayDate}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-semibold">New Time</p>
                <p className="text-2xl font-bold text-gray-800">
                  {bookedData.time}
                </p>
              </div>
            </div>
          </div>

          <Button
            onClick={handleDone}
            className="w-full md:w-[50%] py-3 !rounded-[20px] text-white font-semibold"
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="mb-6">
        <button
          onClick={() => navigate("/patient/dashboard")}
          className="text-[var(--main-color)] hover:underline mb-4"
        >
          ← Back to Dashboard
        </button>
        <h2 className="text-3xl font-semibold text-[var(--head-desc-color)]">
          Reschedule Appointment
        </h2>
      </div>

      {/* Date Selection */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">
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
                    setSelectedTime(null);
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
                <span className="text-xs font-medium uppercase">
                  {item.day}
                </span>
                <span className="text-2xl font-semibold mt-1">{item.date}</span>
              </Button>
            );
          })}
        </div>
      </div>

      {/* Time Selection */}
      {selectedDateIndex !== null && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            Select Time
          </h3>

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
                  className={`py-3 px-4 rounded-lg border-2 text-sm font-medium transition-all ${
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

      {/* Reason for Visit Input */}
      {selectedDateIndex !== null && selectedTime && (
        <div className="mb-8">
          <FormInput
            label="Reason for Visit"
            type="text"
            placeholder="Please describe your reason for visiting..."
            name="reasonForVisit"
            value={reasonForVisit}
            onChange={(e) => setReasonForVisit(e.target.value)}
            register={() => ({})}
            className="w-full"
          />
        </div>
      )}

      <Button
        onClick={handleReschedule}
        disabled={
          selectedTime === null ||
          selectedDateIndex === null ||
          !reasonForVisit.trim() ||
          isSubmitting
        }
        className={`w-full md:w-[50%] py-4 !rounded-[20px] text-white font-semibold transition-all ${
          selectedTime === null ||
          selectedDateIndex === null ||
          !reasonForVisit.trim() ||
          isSubmitting
            ? "!bg-gray-300 cursor-not-allowed"
            : "!bg-[var(--main-lite-color)] hover:!bg-[var(--main-color)]"
        }`}
      >
        {isSubmitting ? "Rescheduling..." : "Confirm Reschedule"}
      </Button>
    </div>
  );
}
