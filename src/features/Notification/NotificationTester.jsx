import { useState } from "react";
import { createNotification } from "../../services/apiNotifications";
import { useAuthUser } from "react-auth-kit";

/**
 * Testing component for creating sample notifications
 * This should be used ONLY in development mode
 * Remove or disable before production deployment
 */
export default function NotificationTester() {
  const [loading, setLoading] = useState(false);
  const auth = useAuthUser();
  const user = auth()?.user;

  const testNotifications = [
    {
      type: "appointment_booked",
      title: "New Appointment",
      message:
        "John Doe has booked an appointment with you for Jan 15, 2026 at 10:00 AM",
      metadata: {
        appointmentId: "test_appointment_123",
        patientId: "test_patient_456",
        doctorId: user?.id,
        appointmentDate: new Date(Date.now() + 86400000).toISOString(),
      },
    },
    {
      type: "appointment_rescheduled",
      title: "Appointment Rescheduled",
      message:
        "Jane Smith has rescheduled their appointment to Jan 20, 2026 at 2:00 PM",
      metadata: {
        appointmentId: "test_appointment_789",
        patientId: "test_patient_101",
        doctorId: user?.id,
        oldDate: new Date(Date.now() + 86400000).toISOString(),
        newDate: new Date(Date.now() + 172800000).toISOString(),
      },
    },
    {
      type: "appointment_deleted",
      title: "Appointment Cancelled",
      message:
        "Bob Johnson has cancelled their appointment scheduled for Jan 15, 2026",
      metadata: {
        appointmentId: "test_appointment_202",
        patientId: "test_patient_303",
        doctorId: user?.id,
        cancelledDate: new Date(Date.now() + 86400000).toISOString(),
      },
    },
    {
      type: "new_message",
      title: "New Message",
      message: "You have a new message from Dr. Smith",
      metadata: {
        senderId: "test_doctor_404",
        senderName: "Dr. Smith",
        conversationId: "test_conversation_505",
      },
    },
    {
      type: "document_upload",
      title: "New Medical Document",
      message: "Sarah Williams has uploaded new medical documents",
      metadata: {
        patientId: "test_patient_606",
        patientName: "Sarah Williams",
        documentId: "test_document_707",
        documentType: "lab_report",
      },
    },
    {
      type: "prescription_upload",
      title: "New Prescription",
      message: "Dr. Brown has uploaded a new prescription for Michael Davis",
      metadata: {
        patientId: "test_patient_808",
        prescribingDoctorId: "test_doctor_909",
        prescribingDoctorName: "Dr. Brown",
        prescriptionId: "test_prescription_111",
      },
    },
  ];

  const sendTestNotification = async (notification) => {
    if (!user?.id) {
      alert("You must be logged in to test notifications");
      return;
    }

    setLoading(true);
    try {
      const notificationData = {
        user_id: user.id,
        user_role: user.role,
        type: notification.type,
        title: notification.title,
        message: notification.message,
        metadata: notification.metadata,
      };

      await createNotification(notificationData);
      alert(`Test notification sent: ${notification.title}`);
    } catch (error) {
      console.error("Error sending test notification:", error);
      alert("Failed to send test notification. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="p-4 bg-yellow-100 border border-yellow-400 rounded">
        <p className="text-yellow-800">Please log in to test notifications</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto my-8">
      <div className="mb-4 p-4 bg-red-100 border border-red-400 rounded">
        <p className="text-red-800 font-bold">⚠️ DEVELOPMENT ONLY</p>
        <p className="text-red-600 text-sm">
          This component should be removed before production deployment
        </p>
      </div>

      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Notification System Tester
      </h2>
      <p className="text-gray-600 mb-6">
        Click any button below to send a test notification
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {testNotifications.map((notification, index) => (
          <button
            key={index}
            onClick={() => sendTestNotification(notification)}
            disabled={loading}
            className="p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed text-left"
          >
            <div className="font-semibold">{notification.title}</div>
            <div className="text-sm mt-1 text-blue-100">
              Type: {notification.type}
            </div>
            <div className="text-xs mt-2 text-blue-200">
              {notification.message}
            </div>
          </button>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-100 rounded">
        <h3 className="font-semibold text-gray-800 mb-2">
          Testing Instructions:
        </h3>
        <ol className="list-decimal list-inside text-sm text-gray-700 space-y-1">
          <li>Click any button above to send a test notification</li>
          <li>
            Check the notification bell icon in the header for the red counter
            badge
          </li>
          <li>Click the bell icon to open the notification dropdown</li>
          <li>Verify the correct icon appears for each notification type</li>
          <li>
            Click a notification to test navigation to the appropriate page
          </li>
          <li>Verify that unread notifications show the blue dot indicator</li>
        </ol>
      </div>
    </div>
  );
}
