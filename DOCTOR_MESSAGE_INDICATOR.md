# Doctor Message Indicator Implementation

## ✅ Feature Implemented

When you view the "Consulting Doctors" page (`/doctor/consulting-doctors`), each doctor card now shows:

- **Red badge counter** on the "Message" button
- **Displays number of unread messages** from that doctor
- **Updates automatically** every 30 seconds
- **Same styling** as the notification counter badge (Facebook-style)

---

## 🎨 Visual Appearance

The "Message" button on each doctor card will show:

```
┌─────────────────────────┐
│  💬 Message          [3]│  ← Red badge with white border
└─────────────────────────┘
```

The badge:

- Red background (#EF4444)
- White text
- White border for contrast
- Shows "99+" for counts over 99
- Only appears when unread messages > 0

---

## 🔧 How It Works

### Frontend Implementation (✅ Complete)

1. **API Function** (`apiChat.js`):

   - `getUnreadMessagesCount(roomId)` - Get unread count for a specific room
   - `getMyRoomsWithUnreadCounts()` - Get all rooms with their unread counts

2. **Custom Hook** (`useDoctorUnreadCounts.js`):

   - Fetches all chat rooms with unread counts
   - Creates a map of `doctorId -> unreadCount`
   - Auto-refreshes every 30 seconds
   - Returns total unread count across all conversations

3. **Component Updates**:
   - `ConsultingDoctors.jsx` - Fetches unread counts and passes to cards
   - `PatientDoctorCard.jsx` - Displays red badge on Message button

---

## ⚠️ Backend Requirements

The frontend expects these API endpoints:

### 1. Get Unread Message Count for a Room

```
GET /api/v1/messages/{roomId}/unread-count
```

**Response:**

```json
{
  "unreadCount": 3
}
```

**Logic:**

- Count messages in the room where `senderId !== currentUserId` and `seen === false`
- Current user is identified from JWT token

---

### 2. Room Structure

The rooms returned from `GET /api/v1/rooms/my-rooms` should include participant information:

**Option A: Include doctor IDs in room object**

```json
{
  "_id": "room_doctorA_doctorB_patientId",
  "doctorAId": "doctor_id_1",
  "doctorBId": "doctor_id_2",
  "patientId": "patient_id",
  "lastMessage": {...},
  "createdAt": "2026-01-09T..."
}
```

**Option B: Use room ID format**

```
room_{doctorAId}_{doctorBId}_{patientId}
```

The frontend can parse this format to extract doctor IDs.

---

## 🧪 Testing

### Test Scenario:

1. **As Doctor A**: Log in and view "Consulting Doctors" page
2. **As Doctor B**: Send a message to Doctor A
3. **As Doctor A**: Refresh or wait 30 seconds
4. **Expected**: Doctor B's card shows red badge with "1"
5. **As Doctor A**: Click "Message" button, read the message
6. **Expected**: Badge disappears

---

## 🔌 Real-Time Updates (Optional Enhancement)

For real-time badge updates without waiting 30 seconds:

### Backend: Emit Socket Event When Message Sent

```javascript
// When a message is sent from Doctor B to Doctor A
io.to(`user_${receiverId}`).emit("new_message", {
  roomId: roomId,
  senderId: senderId,
  unreadCount: newUnreadCount,
});
```

### Frontend: Listen for Event

The frontend can listen for this event and update the unread counts immediately:

```javascript
socket.on("new_message", (data) => {
  // Invalidate the query to refetch unread counts
  queryClient.invalidateQueries(["chat-rooms-unread"]);
});
```

This is already implemented in the notification system and can be added to the chat system for instant updates.

---

## 📊 Backend Query Example

Here's how to implement the unread count endpoint:

```javascript
// GET /api/v1/messages/:roomId/unread-count
async getUnreadCount(req, res) {
  try {
    const { roomId } = req.params;
    const currentUserId = req.user.id; // From JWT token

    // Count messages where:
    // - Room matches
    // - Sender is not current user
    // - Message is not seen
    const unreadCount = await Message.countDocuments({
      roomId: roomId,
      senderId: { $ne: currentUserId },
      seen: false
    });

    res.json({ unreadCount });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get unread count' });
  }
}
```

---

## 🎯 Summary

### ✅ Frontend (Complete):

- Red badge indicator on Message button
- Fetches unread counts from backend
- Auto-refreshes every 30 seconds
- Facebook-style badge design

### ⚠️ Backend (Required):

- Implement `GET /api/v1/messages/:roomId/unread-count` endpoint
- Return count of unread messages for current user
- Optionally: Emit Socket.IO event for real-time updates

### 🚀 User Experience:

- Doctor sees how many unread messages from each consulting doctor
- Badge encourages timely responses
- Visual indicator improves communication flow
- Consistent with notification badge design

---

## 📁 Files Modified

1. `src/services/apiChat.js` - Added unread count API functions
2. `src/features/RealTime/useDoctorUnreadCounts.js` - New hook for unread counts
3. `src/pages/ConsultingDoctors.jsx` - Fetch and pass unread counts
4. `src/features/Doctors/PatientDoctorCard.jsx` - Display red badge

All frontend work is complete and ready for backend API implementation! 🎉
