import { IoPerson } from "react-icons/io5";
import {
  IoCalendarOutline,
  IoTimeOutline,
  IoLocationOutline,
} from "react-icons/io5";

function AppointmentSummaryCard(props) {
  // const appointmentInfo = {
  //   drName: "Dr. Ahmed El Khatib",
  //   speciality: "Cardiology",
  //   date: "December 15, 2025",
  //   time: "10:30 AM",
  //   clinicName: "Mayo Clinic",
  //   clinicLocation: "Maadi , Cairo, Egypt",
  //   price: 850,
  // };

  return (
    <div className="bg-white w-[80%] rounded-lg border border-gray-300 p-5">
      {/* Title */}
      <h2 className="text-lg font-bold text-gray-900 mb-5">
        Appointment Summary
      </h2>

      {/* Doctor */}
      <div className="flex items-center gap-3 mb-5">
        <IoPerson className="w-5 h-5 text-blue-600" />
        <div>
          <p className="font-medium text-gray-900">{props.drName}</p>
          <p className="text-sm text-gray-500">{props.speciality}</p>
        </div>
      </div>

      {/* Date & Time */}
      <div className="mb-5 space-y-2">
        <div className="flex items-center gap-2 text-gray-700">
          <IoCalendarOutline className="w-4 h-4" />
          <span>{props.date}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <IoTimeOutline className="w-4 h-4" />
          <span>{props.time}</span>
        </div>
      </div>

      {/* Clinic */}
      <div className="mb-5">
        <div className="flex items-start gap-2">
          <IoLocationOutline className="w-4 h-4 text-gray-500 mt-1" />
          <div>
            <p className="font-medium text-gray-900">{props.clinicName}</p>
            <p className="text-sm text-gray-600">{props.clinicLocation}</p>
          </div>
        </div>
      </div>

      {/* Total */}
      <div className="pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <span className="font-bold text-gray-900">Total Amount</span>
          <span className="text-xl font-bold text-blue-600">
            {props.price} EGP
          </span>
        </div>
      </div>
    </div>
  );
}

export default AppointmentSummaryCard;
