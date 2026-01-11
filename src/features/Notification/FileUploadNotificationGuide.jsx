import { FileText, AlertTriangle, CheckCircle } from "lucide-react";

/**
 * Component to display expected notification behavior
 * Shows which notifications SHOULD be triggered for file uploads
 * Use this as a reference/debug tool
 */
export default function FileUploadNotificationGuide() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg my-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <FileText className="w-6 h-6 text-purple-600" />
          File Upload Notification Behavior
        </h2>
        <p className="text-gray-600">
          This guide explains what notifications should be sent when a patient
          uploads a medical file.
        </p>
      </div>

      {/* Current Status */}
      <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-red-900 mb-1">Current Issue</h3>
            <p className="text-red-800 text-sm mb-2">
              Doctors are NOT receiving notifications when patients upload
              files. This needs to be fixed on the backend.
            </p>
            <p className="text-red-700 text-xs">
              The frontend is ready - the backend needs to send the
              notifications.
            </p>
          </div>
        </div>
      </div>

      {/* Expected Behavior */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-900 mb-3">
          📋 Expected Behavior
        </h3>
        <div className="space-y-3">
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-purple-600 font-bold">1</span>
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 mb-1">
                  Patient Uploads File
                </h4>
                <p className="text-sm text-gray-600">
                  Patient goes to "Upload Files" page and uploads a medical
                  document (lab report, x-ray, prescription, etc.)
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-purple-600 font-bold">2</span>
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 mb-1">
                  Backend Saves File
                </h4>
                <p className="text-sm text-gray-600">
                  Backend receives the file and saves it to the database
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">3</span>
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-purple-900 mb-1">
                  Backend Sends Notifications ⚠️ MISSING
                </h4>
                <p className="text-sm text-purple-800 mb-2">
                  Backend should automatically:
                </p>
                <ul className="list-disc list-inside text-sm text-purple-700 space-y-1 ml-2">
                  <li>Find all doctors treating this patient</li>
                  <li>Create a notification for each doctor</li>
                  <li>Emit Socket.IO event for real-time updates</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-green-900 mb-1">
                  Doctors Receive Notifications
                </h4>
                <p className="text-sm text-green-800">
                  Each treating doctor sees:
                </p>
                <ul className="list-disc list-inside text-sm text-green-700 space-y-1 ml-2 mt-1">
                  <li>Red counter badge on notification bell</li>
                  <li>Purple file icon with notification message</li>
                  <li>Can click to view patient's files</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notification Details */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-900 mb-3">
          📨 Notification Details
        </h3>
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-700 mb-2 font-medium">
            The backend should send this notification structure:
          </p>
          <pre className="bg-gray-800 text-green-400 p-4 rounded text-xs overflow-x-auto">
            {`{
  "userId": "doctor_id_here",
  "userRole": "doctor",
  "type": "document_upload",
  "title": "New Medical Document",
  "message": "John Doe has uploaded a new medical document",
  "metadata": {
    "patientId": "patient_id",
    "patientName": "John Doe",
    "documentId": "document_id",
    "documentType": "lab_report"
  },
  "isRead": false,
  "createdAt": "2026-01-09T12:00:00Z"
}`}
          </pre>
        </div>
      </div>

      {/* Visual Example */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-900 mb-3">
          👁️ What Doctor Should See
        </h3>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
            <span className="text-sm text-gray-600">Notification Bell:</span>
            <div className="relative">
              <div className="p-2 bg-gray-100 rounded-full">
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </div>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full min-w-[20px] h-5 px-1 flex items-center justify-center font-bold shadow-md border-2 border-white">
                1
              </span>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-l-blue-500 p-4 rounded">
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <p className="text-sm font-medium text-gray-800">
                    John Doe has uploaded a new medical document
                  </p>
                </div>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                  DOCUMENT UPLOAD
                </span>
                <p className="text-xs text-gray-500 mt-1">2 minutes ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Required */}
      <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
        <h3 className="font-semibold text-blue-900 mb-2">🔧 Action Required</h3>
        <p className="text-sm text-blue-800 mb-2">
          The backend developer needs to:
        </p>
        <ol className="list-decimal list-inside text-sm text-blue-700 space-y-1 ml-2">
          <li>
            Locate the file upload endpoint:{" "}
            <code className="bg-blue-100 px-1 rounded">
              POST /api/patients/me/medical-documents
            </code>
          </li>
          <li>Add logic to find all doctors treating the patient</li>
          <li>Create notifications for each doctor after successful upload</li>
          <li>Emit Socket.IO events for real-time updates</li>
        </ol>
        <p className="text-xs text-blue-600 mt-3">
          See <code>BACKEND_NOTIFICATION_IMPLEMENTATION.md</code> for detailed
          code examples.
        </p>
      </div>
    </div>
  );
}
