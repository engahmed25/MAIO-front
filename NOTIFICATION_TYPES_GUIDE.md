# Notification System Guide

## Overview

The notification system supports real-time notifications with a Facebook-style counter badge. Users can click on notifications to navigate to relevant pages.

## Notification Counter Badge

- Red circular badge with white border appears on the notification bell icon
- Shows count up to 99 (displays "99+" for counts over 99)
- Only appears when there are unread notifications
- Updates in real-time via WebSocket

## Notification Types and Navigation

### 1. Appointment Notifications

#### Type: `appointment_booked` or `new_appointment`

**When to send**: When a patient creates a new appointment with a doctor

**Metadata structure**:

```json
{
  "type": "appointment_booked",
  "message": "John Doe has booked an appointment with you for Jan 15, 2026 at 10:00 AM",
  "metadata": {
    "appointmentId": "appointment_id_here",
    "patientId": "patient_id_here",
    "doctorId": "doctor_id_here",
    "appointmentDate": "2026-01-15T10:00:00Z"
  }
}
```

**Navigation behavior**:

- For doctors: Navigates to `/doctor-dashboard/patients/{patientId}`
- For patients: Navigates to `/appointments`

---

#### Type: `appointment_rescheduled`

**When to send**: When a patient reschedules an existing appointment

**Metadata structure**:

```json
{
  "type": "appointment_rescheduled",
  "message": "John Doe has rescheduled their appointment to Jan 20, 2026 at 2:00 PM",
  "metadata": {
    "appointmentId": "appointment_id_here",
    "patientId": "patient_id_here",
    "doctorId": "doctor_id_here",
    "oldDate": "2026-01-15T10:00:00Z",
    "newDate": "2026-01-20T14:00:00Z"
  }
}
```

**Navigation behavior**: Same as `appointment_booked`

---

#### Type: `appointment_deleted` or `appointment_cancelled`

**When to send**: When a patient cancels an appointment

**Metadata structure**:

```json
{
  "type": "appointment_deleted",
  "message": "John Doe has cancelled their appointment scheduled for Jan 15, 2026",
  "metadata": {
    "appointmentId": "appointment_id_here",
    "patientId": "patient_id_here",
    "doctorId": "doctor_id_here",
    "cancelledDate": "2026-01-15T10:00:00Z"
  }
}
```

**Navigation behavior**: Same as `appointment_booked`

---

### 2. Message Notifications

#### Type: `new_message` or `message`

**When to send**: When a doctor receives a message from another doctor or patient

**Metadata structure**:

```json
{
  "type": "new_message",
  "message": "You have a new message from Dr. Smith",
  "metadata": {
    "senderId": "sender_user_id_here",
    "senderName": "Dr. Smith",
    "conversationId": "conversation_id_here"
  }
}
```

**Navigation behavior**:

- Navigates to `/chat?userId={senderId}`
- If senderId is not available, navigates to `/chat`

---

### 3. Document Upload Notifications

#### Type: `document_upload`, `file_uploaded`, or `medical_document`

**When to send**:

- When a patient uploads medical documents
- All doctors currently treating this patient should receive this notification

**Metadata structure**:

```json
{
  "type": "document_upload",
  "message": "John Doe has uploaded new medical documents",
  "metadata": {
    "patientId": "patient_id_here",
    "patientName": "John Doe",
    "documentId": "document_id_here",
    "documentType": "lab_report"
  }
}
```

**Navigation behavior**:

- For doctors: Navigates to `/doctor-dashboard/patients/{patientId}`
- For patients: Navigates to `/patient-dashboard/files`

**Backend requirements**:

- When a patient uploads a file, query all doctors associated with this patient
- Send notifications to all treating doctors

---

### 4. Prescription Upload Notifications

#### Type: `prescription_upload`, `prescription`, or `new_prescription`

**When to send**:

- When a doctor uploads a prescription for a patient
- All doctors treating this patient AND the patient should receive notifications

**Metadata structure**:

```json
{
  "type": "prescription_upload",
  "message": "Dr. Smith has uploaded a new prescription for you",
  "metadata": {
    "patientId": "patient_id_here",
    "prescribingDoctorId": "doctor_id_here",
    "prescribingDoctorName": "Dr. Smith",
    "prescriptionId": "prescription_id_here"
  }
}
```

**Navigation behavior**:

- For doctors: Navigates to `/doctor-dashboard/patients/{patientId}`
- For patients: Navigates to `/patient-dashboard/prescriptions`

**Backend requirements**:

- When a doctor uploads a prescription:
  1. Send notification to the patient
  2. Query all other doctors treating this patient
  3. Send notifications to all treating doctors (excluding the prescribing doctor)

---

## Icon System

Each notification type displays a specific icon:

- 📅 **Appointment (Green)**: `appointment_booked`, `appointment_created`, `new_appointment`
- 🕐 **Appointment Update (Orange)**: `appointment_rescheduled`, `appointment_updated`
- 📅 **Appointment Cancelled (Red)**: `appointment_deleted`, `appointment_cancelled`
- 💬 **Message (Blue)**: `new_message`, `message`
- 📄 **Document (Purple)**: `document_upload`, `file_uploaded`, `medical_document`
- 💊 **Prescription (Teal)**: `prescription_upload`, `prescription`, `new_prescription`
- 🔔 **Default (Gray)**: Any other type

---

## Backend Implementation Checklist

### Appointment Events

- [ ] On appointment creation: Send `appointment_booked` to the doctor
- [ ] On appointment reschedule: Send `appointment_rescheduled` to the doctor
- [ ] On appointment cancellation: Send `appointment_deleted` to the doctor

### Message Events

- [ ] On new chat message: Send `new_message` to the recipient

### Document Upload Events

- [ ] When patient uploads medical files:
  - [ ] Query all doctors treating this patient
  - [ ] Send `document_upload` notification to each treating doctor

### Prescription Events

- [ ] When doctor uploads prescription:
  - [ ] Send `prescription_upload` to the patient
  - [ ] Query all doctors treating this patient
  - [ ] Send `prescription_upload` to all treating doctors (except the prescribing doctor)

---

## WebSocket Events

The frontend listens for the following socket event:

```javascript
socket.on("notification", (data) => {
  // data should contain: type, message, metadata, createdAt, isRead
});
```

## API Endpoints Expected

The frontend uses these endpoints:

- `GET /api/notifications` - Get all notifications for current user
- `GET /api/notifications/unread/count` - Get count of unread notifications
- `PATCH /api/notifications/:id/read` - Mark single notification as read
- `PATCH /api/notifications/read-all` - Mark all notifications as read
- `DELETE /api/notifications/:id` - Delete a notification

---

## Testing Recommendations

1. **Appointment Flow**:

   - Create appointment → Doctor should see notification with green calendar icon
   - Reschedule appointment → Doctor should see notification with orange clock icon
   - Cancel appointment → Doctor should see notification with red calendar icon

2. **Messaging Flow**:

   - Send chat message → Recipient should see notification with blue message icon
   - Click notification → Should navigate to chat with sender

3. **Document Upload Flow**:

   - Patient uploads medical document → All treating doctors see notification with purple file icon
   - Click notification (as doctor) → Should navigate to patient's profile/files

4. **Prescription Flow**:
   - Doctor uploads prescription → Patient sees notification with teal pill icon
   - All other treating doctors also see the notification
   - Click notification → Navigate to appropriate page

---

## Notes for Frontend Developers

The notification system is located in:

- Main component: `src/features/Notification/Notification.jsx`
- Uses React Query for data fetching
- Uses Socket.IO for real-time updates
- Integrated in both `Header.jsx` and `DashBoardHeader.jsx`

The counter badge is styled to be similar to Facebook's notification badge with:

- Red background (#EF4444)
- White text
- White border for contrast
- Rounded pill shape
- Displays "99+" for counts over 99
