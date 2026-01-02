import React, { useState } from "react";
import {
  LayoutDashboard,
  Calendar,
  MessageSquare,
  FileText,
  Settings,
  Search,
  Bell,
  User,
  Clock,
  MapPin,
  Edit,
  Trash2,
  Plus,
  ChevronRight,
  Download,
  Eye,
  CheckCircle,
  Activity,
  Heart,
  Droplet,
  Weight,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";
import RescheduleModal from "./RescheduleModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { useDeleteAppointment } from "../Appointments/useDeleteAppointment";

export default function AppointmentCard({ appointment }) {
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { deleteAppointment, isPending } = useDeleteAppointment();

  console.log("Rendering AppointmentCard with appointment:", appointment);

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    deleteAppointment(appointment.id, {
      onSuccess: () => {
        toast.success("Appointment deleted successfully");
        setIsDeleteModalOpen(false);
      },
      onError: (error) => {
        toast.error(
          error?.response?.data?.message || "Failed to delete appointment"
        );
      },
    });
  };

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                {appointment.doctor}
              </h3>
              <p className="text-sm text-gray-600">{appointment.specialty}</p>
            </div>
          </div>
          <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            {appointment.time}
          </span>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-start gap-2 text-sm text-gray-600">
            <span className="font-medium">Reason:</span>
            <span>{appointment.reason}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{appointment.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>{appointment.date}</span>
          </div>
        </div>

        <div className="flex gap-2 pt-4 border-t border-gray-100">
          <button
            onClick={() => setIsRescheduleModalOpen(true)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            <Edit className="w-4 h-4" />
            Reschedule
          </button>
          <button
            onClick={handleDeleteClick}
            disabled={isPending}
            className="flex items-center justify-center gap-2 px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Trash2 className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Reschedule Modal */}
      <RescheduleModal
        isOpen={isRescheduleModalOpen}
        onClose={() => setIsRescheduleModalOpen(false)}
        appointment={appointment}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        isDeleting={isPending}
      />
    </>
  );
}
