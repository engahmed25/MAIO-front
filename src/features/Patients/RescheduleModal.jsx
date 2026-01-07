import React, { useState, useMemo } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import Button from "../../ui/Button";
import FormInput from "../Authentication/FormInput";
import { useBookingDoctor } from "../Appointments/useBookingDoctor";
import { useAvailableDays } from "../Appointments/useAvailableDays";
import { useReschedule } from "./useReschedule";
import Spinner from "../../ui/Spinner";
import { useQueryClient } from "@tanstack/react-query";

export default function RescheduleModal({ isOpen, onClose, appointment }) {
  const [selectedDateIndex, setSelectedDateIndex] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [reasonForVisit, setReasonForVisit] = useState(
    appointment?.reason || ""
  );
  const [isBookingSuccess, setIsBookingSuccess] = useState(false);
  const [bookedData, setBookedData] = useState(null);

  const queryClient = useQueryClient();

  // Debug: Check what appointment object contains
  console.log("=== RescheduleModal Appointment Debug ===");
  console.log("Full appointment object:", appointment);
  console.log("appointment.id:", appointment?.id);
  console.log("appointment.doctorId:", appointment?.doctorId);
  console.log(
    "All appointment keys:",
    appointment ? Object.keys(appointment) : []
  );
  console.log("=========================================");

  // Extract doctor ID from appointment
  const doctorId = appointment?.doctorId;

  console.log("Doctor ID being fetched:", doctorId);

  // Fetch available days for the doctor
  const {
    isLoading: isLoadingAvailableDays,
    availableDays,
    error: availableDaysError,
  } = useAvailableDays(doctorId);

  // Use reschedule mutation
  const {
    reschedule,
    isRescheduling,
    error: rescheduleError,
  } = useReschedule();

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
    if (selectedDateIndex !== null && selectedTime) {
      const selectedDate = dates[selectedDateIndex];

      reschedule(
        {
          appointmentId: appointment.id,
          newDate: selectedDate.fullDate,
          newStartTime: selectedTime.startTime,
          newEndTime: selectedTime.endTime,
        },
        {
          onSuccess: (response) => {
            if (response.success || response.data) {
              setBookedData({
                date: selectedDate.fullDate,
                day: selectedDate.day,
                dayDate: selectedDate.date,
                time: selectedTime.displayTime,
              });
              setIsBookingSuccess(true);
            }
          },
        }
      );
    }
  }

  function handleDone() {
    // Invalidate queries to refetch appointment data
    queryClient.invalidateQueries(["patientAppointments"]);

    // Reset state
    setIsBookingSuccess(false);
    setBookedData(null);
    setSelectedDateIndex(null);
    setSelectedTime(null);
    setReasonForVisit(appointment?.reason || "");

    // Close modal
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-2xl font-bold text-gray-900">
            Reschedule Appointment
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isLoadingAvailableDays ? (
            <div className="flex justify-center py-8">
              <Spinner />
            </div>
          ) : availableDaysError ? (
            <div className="text-red-500 p-4">
              Error loading available days. Please try again.
            </div>
          ) : isBookingSuccess && bookedData ? (
            // Success Message
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
                    <p className="text-sm text-gray-500 font-semibold">
                      New Date
                    </p>
                    <p className="text-2xl font-bold text-gray-800">
                      {bookedData.day}, {bookedData.dayDate}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-semibold">
                      New Time
                    </p>
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
                Done
              </Button>
            </div>
          ) : (
            <>
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
                        <span className="text-2xl font-semibold mt-1">
                          {item.date}
                        </span>
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

                  {!isLoadingSlots &&
                    timeSlots.length === 0 &&
                    !availabilityError && (
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

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  onClick={onClose}
                  className="flex-1 py-3 !rounded-lg !bg-gray-200 !text-gray-700 hover:!bg-gray-300"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleReschedule}
                  disabled={
                    selectedTime === null ||
                    selectedDateIndex === null ||
                    isRescheduling
                  }
                  className={`flex-1 py-3 !rounded-lg text-white font-semibold transition-all ${
                    selectedTime === null ||
                    selectedDateIndex === null ||
                    isRescheduling
                      ? "!bg-gray-300 cursor-not-allowed"
                      : "!bg-[var(--main-lite-color)] hover:!bg-[var(--main-color)]"
                  }`}
                >
                  {isRescheduling ? "Rescheduling..." : "Confirm Reschedule"}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
