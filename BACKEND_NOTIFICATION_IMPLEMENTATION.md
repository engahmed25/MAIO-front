# Backend Notification Implementation Required

## ⚠️ Issue: Doctors Not Receiving Notifications When Patients Upload Files

### Current Problem

When a patient uploads a medical document, the treating doctors are **NOT** receiving notifications. This needs to be implemented on the **BACKEND**.

---

## 🔧 Required Backend Implementation

### 1. Patient File Upload Endpoint

**Endpoint**: `POST /api/patients/me/medical-documents`

**Current behavior**: Accepts file upload and stores it in the database.

**Required changes**: After successfully storing the file, the backend must:

1. Query all doctors who are treating this patient
2. Send a notification to each treating doctor

#### Pseudo Code:

```javascript
// After successfully saving the medical document

// 1. Get the patient ID from the authenticated user
const patientId = req.user.id;

// 2. Query all doctors treating this patient
// This depends on your database schema - could be from:
// - Appointments table (doctors who have appointments with this patient)
// - PatientDoctors relation table
// - Consultations table
const treatingDoctors = await getDoctorsForPatient(patientId);

// 3. Get patient details for the notification message
const patient = await Patient.findById(patientId);
const patientName = `${patient.firstName} ${patient.lastName}`;

// 4. Send notification to each treating doctor
for (const doctor of treatingDoctors) {
  await createNotification({
    userId: doctor._id,
    userRole: "doctor",
    type: "document_upload",
    title: "New Medical Document",
    message: `${patientName} has uploaded a new medical document`,
    metadata: {
      patientId: patientId,
      patientName: patientName,
      documentId: savedDocument._id,
      documentType: savedDocument.documentType || "medical_document",
      uploadedAt: new Date().toISOString(),
    },
    isRead: false,
    createdAt: new Date(),
  });

  // Also emit real-time notification via Socket.IO
  io.to(`user_${doctor._id}`).emit("notification", {
    type: "document_upload",
    message: `${patientName} has uploaded a new medical document`,
    metadata: {
      patientId: patientId,
      patientName: patientName,
      documentId: savedDocument._id,
      documentType: savedDocument.documentType,
    },
    createdAt: new Date(),
  });
}
```

---

### 2. How to Query Treating Doctors

The method to get treating doctors depends on your database schema. Here are common approaches:

#### Option A: From Appointments

```javascript
async function getDoctorsForPatient(patientId) {
  const appointments = await Appointment.find({
    patientId: patientId,
    status: { $in: ["confirmed", "completed"] },
  }).populate("doctorId");

  // Get unique doctors
  const doctorIds = [
    ...new Set(appointments.map((apt) => apt.doctorId._id.toString())),
  ];
  return await Doctor.find({ _id: { $in: doctorIds } });
}
```

#### Option B: From PatientDoctors Relationship Table

```javascript
async function getDoctorsForPatient(patientId) {
  const relationships = await PatientDoctor.find({
    patientId: patientId,
    status: "active",
  }).populate("doctorId");

  return relationships.map((rel) => rel.doctorId);
}
```

#### Option C: From Consultations

```javascript
async function getDoctorsForPatient(patientId) {
  const consultations = await Consultation.find({
    patientId: patientId,
  }).populate("doctorId");

  const doctorIds = [
    ...new Set(consultations.map((c) => c.doctorId._id.toString())),
  ];
  return await Doctor.find({ _id: { $in: doctorIds } });
}
```

---

### 3. Similar Implementation Needed for Prescription Upload

**Endpoint**: `POST /api/prescriptions` (or wherever prescriptions are uploaded)

**When a doctor uploads a prescription**, the backend must:

1. Send notification to the patient
2. Query all OTHER doctors treating this patient (exclude the prescribing doctor)
3. Send notifications to all treating doctors

#### Pseudo Code:

```javascript
// After successfully saving the prescription

const prescribingDoctorId = req.user.id;
const patientId = prescriptionData.patientId;

// 1. Get patient details
const patient = await Patient.findById(patientId);
const patientName = `${patient.firstName} ${patient.lastName}`;

// 2. Get prescribing doctor details
const doctor = await Doctor.findById(prescribingDoctorId);
const doctorName = `Dr. ${doctor.firstName} ${doctor.lastName}`;

// 3. Send notification to the PATIENT
await createNotification({
  userId: patientId,
  userRole: "patient",
  type: "prescription_upload",
  title: "New Prescription",
  message: `${doctorName} has uploaded a new prescription for you`,
  metadata: {
    patientId: patientId,
    prescribingDoctorId: prescribingDoctorId,
    prescribingDoctorName: doctorName,
    prescriptionId: savedPrescription._id,
  },
  isRead: false,
  createdAt: new Date(),
});

// Emit real-time to patient
io.to(`user_${patientId}`).emit("notification", {
  /* notification data */
});

// 4. Get all treating doctors (EXCLUDING the prescribing doctor)
const treatingDoctors = await getDoctorsForPatient(patientId);
const otherDoctors = treatingDoctors.filter(
  (doc) => doc._id.toString() !== prescribingDoctorId.toString()
);

// 5. Send notification to other treating doctors
for (const otherDoctor of otherDoctors) {
  await createNotification({
    userId: otherDoctor._id,
    userRole: "doctor",
    type: "prescription_upload",
    title: "New Prescription",
    message: `${doctorName} has uploaded a new prescription for ${patientName}`,
    metadata: {
      patientId: patientId,
      prescribingDoctorId: prescribingDoctorId,
      prescribingDoctorName: doctorName,
      prescriptionId: savedPrescription._id,
    },
    isRead: false,
    createdAt: new Date(),
  });

  // Emit real-time
  io.to(`user_${otherDoctor._id}`).emit("notification", {
    /* notification data */
  });
}
```

---

## 🧪 Testing Checklist

After implementing the backend changes:

### Patient File Upload Test:

1. [ ] Log in as a patient
2. [ ] Upload a medical document
3. [ ] Verify all treating doctors receive a notification
4. [ ] Check notification appears with purple file icon
5. [ ] Click notification as doctor → should navigate to patient's file page
6. [ ] Verify notification count badge updates in real-time

### Prescription Upload Test:

1. [ ] Log in as a doctor
2. [ ] Upload a prescription for a patient
3. [ ] Verify the patient receives a notification
4. [ ] Verify all OTHER treating doctors receive a notification
5. [ ] Verify the prescribing doctor does NOT receive their own notification
6. [ ] Check notification appears with teal pill icon
7. [ ] Click notification → should navigate to prescription page

---

## 📋 Database Schema Considerations

Your notifications table/collection should have this structure:

```javascript
{
  _id: ObjectId,
  userId: ObjectId,           // User who receives the notification
  userRole: String,           // 'doctor' or 'patient'
  type: String,               // 'document_upload', 'prescription_upload', etc.
  title: String,              // Notification title
  message: String,            // Notification message
  metadata: {                 // Additional data for navigation
    patientId: ObjectId,
    patientName: String,
    documentId: ObjectId,     // For document notifications
    prescriptionId: ObjectId, // For prescription notifications
    doctorId: ObjectId,       // For various notifications
    // ... other relevant data
  },
  isRead: Boolean,            // false by default
  createdAt: Date,            // Timestamp
  updatedAt: Date             // Timestamp
}
```

---

## 🔌 Socket.IO Event Names

The frontend is listening for this socket event:

```javascript
socket.on("notification", (data) => {
  // Handle real-time notification
});
```

Make sure your backend emits to the correct room:

```javascript
io.to(`user_${userId}`).emit("notification", notificationData);
```

---

## 📝 Summary

### Backend Must Implement:

1. **File Upload**: When patient uploads a file → notify all treating doctors
2. **Prescription Upload**: When doctor uploads prescription → notify patient + all other treating doctors
3. **Appointment Events**: Already should be working, but verify:
   - New appointment → notify doctor
   - Reschedule → notify doctor
   - Cancel → notify doctor
4. **Message Events**: When message sent → notify recipient

### API Endpoints to Update:

- ✅ `POST /api/patients/me/medical-documents` - Add doctor notifications
- ✅ `POST /api/prescriptions` (or equivalent) - Add patient + doctor notifications
- ⚠️ Verify appointment endpoints send notifications
- ⚠️ Verify chat/message endpoints send notifications

---

## 🆘 Need Help?

If you need clarification on:

- How to structure the notification data
- How to emit Socket.IO events
- How to query relationships in your database
- Any other backend implementation details

Please refer to the `NOTIFICATION_TYPES_GUIDE.md` file for detailed notification type specifications and metadata structures.
