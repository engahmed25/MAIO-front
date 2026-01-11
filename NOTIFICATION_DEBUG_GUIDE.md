# Notification System Debug Guide

## Changes Made

### 1. Backend - Socket Notification Metadata Support

**Files Modified:**

- `MAIO-Backend/sockets/notificationHandler.js`
- `MAIO-Backend/services/notification.service.js`

**Changes:**

- Updated `sendNotificationToUser()` to accept and emit `metadata` parameter
- Updated `sendNotificationToUsers()` to accept and pass `metadata` parameter
- Metadata is now sent with real-time Socket.IO notifications

### 2. Backend - Prescription Notifications

**File:** `MAIO-Backend/controllers/prescriptionController.js`

**Changes:**

- Added extensive logging with 💊 emoji for tracking
- Added `patientName` to metadata
- Improved error handling with specific error messages
- Now properly notifies:
  - ✅ Patient who received the prescription
  - ✅ All other doctors treating the same patient (excluding prescribing doctor)

**Logging Points:**

```javascript
console.log(`💊 Processing prescription notifications:`);
console.log(`💊 Patient found:`);
console.log(`💊 Found X doctors treating this patient`);
console.log(`💊 Found X other doctors to notify`);
console.log(`💊 Notifying doctor:`);
```

### 3. Backend - Message Notifications

**File:** `MAIO-Backend/sockets/chatHandler.js`

**Changes:**

- Added extensive logging with 📧 emoji for tracking
- Identifies the "other doctor" in the room correctly
- Sends notification with metadata including:
  - `senderId`: Doctor who sent the message
  - `senderName`: Full name of sender
  - `roomId`: Chat room ID
  - `messagePreview`: First 50 characters of message

**Logging Points:**

```javascript
console.log(`📧 Room found for notification:`);
console.log(`📧 Other doctor identified:`);
console.log(`📧 Sending message notification to:`);
console.log(`✅ Message notification sent successfully`);
```

### 4. Frontend - Notification Navigation

**File:** `src/features/Notification/Notification.jsx`

**Changes:**

- Fixed navigation paths from `/doctor-dashboard/patients/{id}` to `/doctor/patient/{id}`
- Updated for:
  - ✅ Appointment notifications
  - ✅ File upload notifications
  - ✅ Prescription notifications

### 5. Frontend - Unread Message Indicator

**File:** `src/features/RealTime/useDoctorUnreadCounts.js`

**Changes:**

- Fixed doctor ID extraction from rooms (Room model uses `doctorA` and `doctorB`, not `doctorAId` and `doctorBId`)
- Added fallback logic to handle both field name conventions
- Added console logging with 🔔 emoji for debugging
- Properly converts ObjectIds to strings for comparison

**Logging Points:**

```javascript
console.log("🔔 useDoctorUnreadCounts - Rooms data:");
console.log("🔔 useDoctorUnreadCounts - Unread counts by doctor:");
console.log("🔔 useDoctorUnreadCounts - Total unread:");
```

## Testing Checklist

### Prescription Notifications

1. **Setup:**

   - Have two doctors treating the same patient
   - Both doctors should have appointments with status: scheduled, confirmed, or completed

2. **Test:**

   - Login as Doctor A
   - Create a prescription for the shared patient
   - Check backend logs for 💊 messages

3. **Expected Results:**
   - Patient receives notification
   - Doctor B receives notification
   - Both notifications include `patientName` in metadata
   - Clicking notification navigates to `/doctor/patient/{patientId}`

### Message Notifications

1. **Setup:**

   - Have two doctors with a shared patient
   - Create a chat room between them

2. **Test:**

   - Login as Doctor A
   - Send a message to Doctor B
   - Check backend logs for 📧 messages

3. **Expected Results:**
   - Doctor B receives real-time notification
   - Notification includes sender name and message preview
   - Notification appears in notification dropdown
   - Clicking notification navigates to chat

### Message Indicator on Consulting Doctors Page

1. **Setup:**

   - Have two doctors treating the same patient
   - One doctor sends messages to the other

2. **Test:**

   - Login as Doctor A
   - Navigate to `/doctor/consulting-doctors` for a patient
   - Check browser console for 🔔 messages

3. **Expected Results:**
   - Unread message count appears as red badge on doctor card
   - Count updates every 30 seconds
   - Badge shows correct count

## Troubleshooting

### Prescription Notifications Not Working

**Check:**

1. Are both doctors in the database?
2. Do they both have appointments with the patient?
3. Are appointment statuses: `scheduled`, `confirmed`, or `completed`?
4. Check backend logs for 💊 messages
5. Is the doctor's `userId` field populated correctly?

**Common Issues:**

- Doctor missing `userId` field
- No appointments found for the patient
- Appointment status is not in the allowed list

### Message Notifications Not Working

**Check:**

1. Is the room created correctly in the database?
2. Do both doctors exist in the room?
3. Check backend logs for 📧 messages
4. Is Socket.IO connection established?
5. Check frontend console for Socket.IO connection status

**Common Issues:**

- Room not found in database
- Doctor not connected to Socket.IO
- Doctor missing `userId` field
- Socket.IO namespace mismatch

### Message Indicator Not Showing

**Check:**

1. Open browser console and look for 🔔 messages
2. Verify rooms are being fetched: `useDoctorUnreadCounts - Rooms data`
3. Verify unread counts are calculated: `useDoctorUnreadCounts - Unread counts by doctor`
4. Check that doctor IDs match between:
   - Room data (doctorA/doctorB fields)
   - Doctor cards (doctor.\_id)

**Common Issues:**

- Doctor ID format mismatch (string vs ObjectId)
- Room data not including unread counts
- API endpoint `/api/v1/messages/:roomId/unread-count` not working
- Network request failing (check Network tab)

## API Endpoints

### Get Unread Count for a Room

```
GET /api/v1/messages/:roomId/unread-count
Authorization: Bearer <token>

Response:
{
  "success": true,
  "unreadCount": 5
}
```

### Get All Rooms

```
GET /api/v1/rooms/my-rooms
Authorization: Bearer <token>

Response:
{
  "rooms": [
    {
      "_id": "room_id",
      "doctorA": { "_id": "...", "firstName": "...", ... },
      "doctorB": { "_id": "...", "firstName": "...", ... },
      "patient": { "_id": "...", "firstName": "...", ... },
      "updatedAt": "2026-01-11T..."
    }
  ]
}
```

## Debug Commands

### Check Socket.IO Connections

```javascript
// In browser console on any page
localStorage.debug = "socket.io-client:*";
// Reload page to see Socket.IO debug messages
```

### Check Notification Socket Registration

```javascript
// In browser console after login
// Look for "User registered with socket" in backend logs
```

### Test Notification API

```javascript
// Get all notifications
fetch("/api/v1/notifications", {
  headers: { Authorization: "Bearer " + yourToken },
})
  .then((r) => r.json())
  .then(console.log);

// Get unread count
fetch("/api/v1/notifications/unread-count", {
  headers: { Authorization: "Bearer " + yourToken },
})
  .then((r) => r.json())
  .then(console.log);
```

## Next Steps

If issues persist after checking the above:

1. **Enable verbose logging:**

   - Add more console.log statements in the specific areas failing
   - Check both frontend (browser console) and backend (terminal) logs

2. **Check database:**

   - Verify Room documents have correct structure
   - Verify Doctor documents have `userId` field
   - Verify Appointment documents exist with correct statuses

3. **Check Socket.IO:**

   - Verify both frontend and backend are using same Socket.IO version
   - Check for CORS issues
   - Verify authentication middleware is working

4. **Test step-by-step:**
   - Test prescription creation alone (does it save to DB?)
   - Test notification creation alone (does it save to DB?)
   - Test Socket.IO emission alone (does recipient receive it?)
