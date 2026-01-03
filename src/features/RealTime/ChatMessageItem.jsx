import React, { useState } from "react";
import { Check, CheckCheck, Download, X } from "lucide-react";
import { formatFullTime } from "../../utils/formatTime.js";

function ChatMessageItem({ message, peerDoctor, currentDoctor }) {
  const [imageError, setImageError] = useState(false);
  const isRead = message.isRead;

  // Get current doctor ID - prioritize _id from database over userId from JWT
  const currentDoctorId =
    currentDoctor?._id || currentDoctor?.userId || currentDoctor?.id;

  const messageSenderId = message.sender?._id || message.senderId;

  // Debug logging
  console.log("========================================");
  console.log("🔍 ChatMessageItem - Message Sender Check");
  console.log("========================================");
  console.log("📧 Message Sender ID:", messageSenderId);
  console.log("👤 Current Doctor ID:", currentDoctorId);
  console.log("📝 Message Content:", message.content?.substring(0, 50));
  console.log("👨‍⚕️ Message Sender Object:", message.sender);
  console.log("👤 Current Doctor Object:", currentDoctor);
  console.log("🔍 Current Doctor ID Sources:", {
    _id: currentDoctor?._id,
    userId: currentDoctor?.userId,
    id: currentDoctor?.id,
  });
  console.log("✅ Is Own Message:", messageSenderId === currentDoctorId);
  console.log("========================================");

  const isOwnMessage = messageSenderId === currentDoctorId;
  const sender = isOwnMessage ? currentDoctor : peerDoctor;
  const hasAttachment = message.attachments && message.attachments.length > 0;

  // Get doctor name from firstName and lastName or fallback to name field
  const getDoctorName = (doctor) => {
    if (doctor?.firstName && doctor?.lastName) {
      return `${doctor.firstName} ${doctor.lastName}`;
    }
    return doctor?.name || "Unknown";
  };

  // Get profile picture URL
  const getProfilePicture = (doctor) => {
    const picture = doctor?.profilePicture;
    if (picture) {
      // If it's already a full URL, use it
      if (picture.startsWith("http://") || picture.startsWith("https://")) {
        return picture;
      }
      // Otherwise, construct the URL from backend
      return `${
        import.meta.env.VITE_API_BASE_URL ||
        "https://tjdlts3w-5000.uks1.devtunnels.ms"
      }/${picture.replace(/\\/g, "/")}`;
    }
    return null;
  };

  const senderProfilePic = getProfilePicture(sender);

  // Get attachment URL with full path
  const getAttachmentUrl = (url) => {
    if (!url) return null;
    // If it's already a full URL, use it
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }
    // Otherwise, construct the URL from backend
    const baseUrl =
      import.meta.env.VITE_API_BASE_URL ||
      "https://tjdlts3w-5000.uks1.devtunnels.ms";
    // Remove leading slash if present to avoid double slashes
    const cleanUrl = url.startsWith("/") ? url.substring(1) : url;
    return `${baseUrl}/${cleanUrl}`;
  };

  return (
    <div
      className={`flex gap-2 mb-4 ${
        isOwnMessage ? "flex-row-reverse" : "flex-row"
      }`}
    >
      {/* Avatar - Show for both own and peer messages */}
      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden bg-gradient-to-br from-blue-400 to-blue-600">
        {senderProfilePic ? (
          <img
            src={senderProfilePic}
            alt={getDoctorName(sender)}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to initials if image fails to load
              e.target.style.display = "none";
              e.target.parentElement.innerHTML = `<span class="text-white text-xs font-semibold">${
                sender?.firstName?.charAt(0)?.toUpperCase() ||
                sender?.name?.charAt(0)?.toUpperCase() ||
                "D"
              }</span>`;
            }}
          />
        ) : (
          <span className="text-white text-xs font-semibold">
            {sender?.firstName?.charAt(0)?.toUpperCase() ||
              sender?.name?.charAt(0)?.toUpperCase() ||
              "D"}
          </span>
        )}
      </div>

      {/* Message Bubble */}
      <div
        className={`flex flex-col ${
          isOwnMessage ? "items-end" : "items-start"
        } max-w-[70%] md:max-w-md`}
      >
        {/* Sender Name - Show for all messages */}
        <span className="text-xs text-gray-500 mb-1 px-1">
          Dr. {getDoctorName(sender)}
        </span>

        {/* Message Content */}
        <div
          className={`rounded-2xl px-4 py-2 shadow-sm ${
            isOwnMessage
              ? "bg-blue-500 text-white rounded-br-sm"
              : "bg-white text-gray-900 border border-gray-200 rounded-bl-sm"
          }`}
        >
          {/* Image Attachments */}
          {hasAttachment &&
            message.attachments.map((attachment, idx) => {
              if (attachment.type === "image" && !imageError) {
                const imageUrl = getAttachmentUrl(attachment.url);
                return (
                  <div
                    key={idx}
                    className="mb-2 rounded-lg overflow-hidden max-w-xs"
                  >
                    <img
                      src={imageUrl}
                      alt={attachment.filename || "attachment"}
                      className="max-w-full h-auto rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => window.open(imageUrl, "_blank")}
                      onError={(e) => {
                        console.error("Image failed to load:", imageUrl);
                        setImageError(true);
                      }}
                    />
                  </div>
                );
              }

              if (
                attachment.type === "file" ||
                attachment.type === "document"
              ) {
                const fileUrl = getAttachmentUrl(attachment.url);
                return (
                  <a
                    key={idx}
                    href={fileUrl}
                    download={attachment.filename}
                    className={`flex items-center gap-2 mb-2 p-2 rounded-lg ${
                      isOwnMessage ? "bg-blue-600" : "bg-gray-100"
                    }`}
                  >
                    <Download className="w-4 h-4" />
                    <span className="text-sm truncate">
                      {attachment.filename || "File"}
                    </span>
                  </a>
                );
              }
              return null;
            })}

          {/* Text Content */}
          {message.content && message.content.trim() !== "" && (
            <p className="text-[15px] leading-relaxed whitespace-pre-wrap break-words">
              {message.content}
            </p>
          )}

          {/* Timestamp & Status */}
          <div
            className={`flex items-center justify-end gap-1 mt-1 text-[11px] ${
              isOwnMessage ? "text-blue-100" : "text-gray-500"
            }`}
          >
            <span>{formatFullTime(message.createdAt)}</span>
            {isOwnMessage && (
              <span>
                {isRead ? (
                  <CheckCheck className="w-4 h-4 text-blue-200" />
                ) : (
                  <Check className="w-4 h-4" />
                )}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatMessageItem;
