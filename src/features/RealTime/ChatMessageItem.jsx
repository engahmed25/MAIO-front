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

  return (
    <div
      className={`flex gap-2 mb-4 ${
        isOwnMessage ? "flex-row-reverse" : "flex-row"
      }`}
    >
      {/* Avatar */}
      {!isOwnMessage && (
        <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
          {sender?.firstName?.charAt(0)?.toUpperCase() ||
            sender?.name?.charAt(0)?.toUpperCase() ||
            "D"}
        </div>
      )}

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
                return (
                  <div key={idx} className="mb-2 rounded-lg overflow-hidden">
                    <img
                      src={attachment.url}
                      alt="attachment"
                      className="max-w-full h-auto rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => window.open(attachment.url, "_blank")}
                      onError={() => setImageError(true)}
                    />
                  </div>
                );
              }

              if (attachment.type === "file") {
                return (
                  <a
                    key={idx}
                    href={attachment.url}
                    download
                    className={`flex items-center gap-2 mb-2 p-2 rounded-lg ${
                      isOwnMessage ? "bg-blue-600" : "bg-gray-100"
                    }`}
                  >
                    <Download className="w-4 h-4" />
                    <span className="text-sm truncate">
                      {attachment.name || "File"}
                    </span>
                  </a>
                );
              }
              return null;
            })}

          {/* Text Content */}
          {message.content && (
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
