import React from "react";

function ChatTypingIndicator({ typingUsers }) {
  if (typingUsers.length === 0) return null;

  const displayName =
    typingUsers.length === 1
      ? `Dr. ${typingUsers[0].doctorName}`
      : `${typingUsers.length} doctors`;

  return (
    <div className="flex gap-2 mb-4">
      <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
        {typingUsers[0]?.doctorName?.charAt(0)?.toUpperCase() || "D"}
      </div>

      <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm border border-gray-200">
        <div className="flex items-center gap-1">
          <span className="text-xs text-gray-500 mr-2">
            {displayName} typing
          </span>
          <div className="flex gap-1">
            <div
              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
              style={{ animationDelay: "0ms" }}
            />
            <div
              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
              style={{ animationDelay: "150ms" }}
            />
            <div
              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
              style={{ animationDelay: "300ms" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatTypingIndicator;
