<!-- # Backend Fix for File Upload Error

## Problem

Message validation fails when uploading files without text because `content` field is required.

## Solution

Update the file upload route to handle empty content for file messages:

```javascript
// Upload files endpoint
router.post("/upload", protect, upload.array("files", 10), async (req, res) => {
  try {
    const { roomId, message } = req.body;

    // Get doctor profile
    const doctorProfile = await Doctor.findOne({ userId: req.user._id });
    if (!doctorProfile) {
      return res.status(404).json({ error: "Doctor profile not found" });
    }

    // Verify doctor is part of the room
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }

    const doctorId = doctorProfile._id.toString();
    if (
      room.doctorA.toString() !== doctorId &&
      room.doctorB.toString() !== doctorId
    ) {
      return res.status(403).json({ error: "Access denied" });
    }

    // Process uploaded files
    const attachments = req.files.map((file) => {
      const fileType = file.mimetype.startsWith("image/")
        ? "image"
        : "document";

      return {
        type: fileType,
        url: `/uploads/${file.filename}`,
        filename: file.originalname,
        size: file.size,
      };
    });

    // FIX: Provide default content for file-only messages
    const messageContent =
      message && message.trim() !== "" ? message : "📎 Attachment"; // Default text for file-only messages

    // Create message with attachments
    const newMessage = await Message.create({
      room: roomId,
      sender: doctorProfile._id,
      content: messageContent, // Use the processed content
      isRead: false,
      attachments,
      messageType: "file",
    });

    const populatedMessage = await newMessage.populate(
      "sender",
      "firstName lastName"
    );

    res.status(201).json({
      message: "Files uploaded successfully",
      data: {
        id: populatedMessage._id,
        roomId: populatedMessage.room,
        sender: populatedMessage.sender,
        content: populatedMessage.content,
        createdAt: populatedMessage.createdAt,
        isRead: populatedMessage.isRead,
        attachments: populatedMessage.attachments,
        messageType: populatedMessage.messageType,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

## Alternative Solution (Better)

Make `content` optional in the Message model when there are attachments:

In your Message model:

```javascript
const messageSchema = new Schema(
  {
    room: { type: Schema.Types.ObjectId, ref: "Room", required: true },
    sender: { type: Schema.Types.ObjectId, ref: "Doctor", required: true },
    content: {
      type: String,
      required: function () {
        // Content is required only if there are no attachments
        return !this.attachments || this.attachments.length === 0;
      },
    },
    attachments: [
      {
        type: { type: String, enum: ["image", "document"] },
        url: String,
        filename: String,
        size: Number,
      },
    ],
    messageType: { type: String, enum: ["text", "file"], default: "text" },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);
```

This way, content is only required when there are no attachments. -->
