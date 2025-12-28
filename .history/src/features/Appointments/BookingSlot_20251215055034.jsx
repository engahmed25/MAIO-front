import React, { useState } from "react";
import Button from "../../ui/Button";

export default function BookingSlots() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const dates = [
    { day: "MON", date: 10 },
    { day: "TUE", date: 11 },
    { day: "WED", date: 12 },
    { day: "THU", date: 13 },
    { day: "FRI", date: 14 },
    { day: "SAT", date: 15 },
    { day: "SUN", date: 16 },
  ];

  const times = [
    "8:00 am",
    "8:30 am",
    "9:00 am",
    "9:30 am",
    "10:00 am",
    "10:30 am",
    "11:00 am",
    "11:30 am",
  ];

  return (
    <div className="max-w-4xl mx-auto p-8 ">
      <h2 className="text-2xl font-semibold text-[var(--head-desc-color)] text-center mb-6">
        Book an appointment
      </h2>

      {/* Date Selection */}
      <div className="mb-8">
        <h3 className="text-m font-semibold text-[var(--head-desc-color)] mb-3">Select Date</h3>
        <div className="flex gap-3 flex-wrap pb-2">
          {dates.map((item, index) => (
            <Button
              key={index}
              onClick={() => setSelectedDate(index)}
              className={`flex flex-col items-center justify-center min-w-[55px] md:min-w-[70px] h-20 rounded-xl border-2 transition-all ${
                selectedDate === index
                  ? "!border-[var(--main-color)] !bg-[var(--main-verylite-color)] !text-[var(--main-color)]"
                  : "!bg-[var(--sec-color)] !border-gray-200 hover:!border-gray-400 !text-[var(--head-desc-color)]"
              }`}
            >
              <span className="text-xs font-medium uppercase">{item.day}</span>
              <span className="text-2xl font-semibold mt-1">{item.date}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Time Selection */}
      <div className="mb-8">
        <h3 className="text-m font-semibold text-gray-700 mb-3">Select Time</h3>
        <div className="grid grid-cols-4 gap-3">
          {times.map((time, index) => (
            <Button
              key={index}
              onClick={() => setSelectedTime(time)}
              className={`py-3 px-4 rounded-lg border-2 text-m font-medium transition-all ${
                selectedTime === time
                  ? "!border-[var(--main-color)] !bg-[var(--main-verylite-color)] !text-[var(--main-color)]"
                  : "!bg-[var(--sec-color)] !border-gray-200 hover:!border-gray-400 !text-[var(--head-desc-color)]"
              }`}
            >
              {time}
            </Button>
          ))}
        </div>
      </div>

      {/* Book Button */}
      <Button
        disabled={selectedTime === null || selectedDate === null}
        className={`w-full py-4 rounded-lg text-white font-semibold transition-all ${
          selectedTime === null
            ? "!bg-gray-300 cursor-not-allowed"
            : "!bg-(--main-lite-color) hover:!bg-(--main-color) "
        }`}
      >
        Book Appointment
      </Button>
    </div>
  );
}
