import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { chatSocket } from "../RealTime/socket.js";

/**
 * Custom hook for managing Socket.io chat connection
 * Handles room joining, message listening, and cleanup
 */
export const useChatSocket = (roomId, currentUserId) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!roomId || !currentUserId) return;

    // Connect if not already connected
    if (!chatSocket.connected) {
      chatSocket.connect();
    }

    console.log("🔌 Connecting to chat socket...");

    // Join room when connected
    const handleConnect = () => {
      console.log("✅ Socket connected");
      chatSocket.emit("join_room", { roomId });
    };

    // Handle successful room join
    const handleJoinedRoom = (data) => {
      console.log("✅ Joined room:", data);
    };

    // Listen for new messages
    const handleNewMessage = (msg) => {
      console.log("📨 New message received:", msg);

      // Update React Query cache
      queryClient.setQueryData(["chat-messages", roomId], (old = []) => {
        // Avoid duplicates - check both id and _id
        const messageId = msg.id || msg._id;
        const exists = old.some((m) => {
          const existingId = m.id || m._id;
          return existingId === messageId;
        });

        if (exists) {
          console.log("⚠️ Message already exists, skipping duplicate:", messageId);
          return old;
        }

        console.log("✅ Adding new message to cache:", msg);
        return [...old, msg];
      });

      // Auto-mark as seen if from peer (not from current user)
      if (msg.sender?._id !== currentUserId && msg.sender?.id !== currentUserId) {
        chatSocket.emit("message_seen", { roomId });
      }
    };

    // Listen for messages seen events
    const handleMessagesSeen = ({ roomId: seenRoomId }) => {
      console.log("👁️ Messages seen in room:", seenRoomId);

      queryClient.setQueryData(["chat-messages", roomId], (old = []) =>
        old.map((m) => ({
          ...m,
          isRead: true,
        }))
      );
    };

    // Handle errors
    const handleError = (error) => {
      console.error("❌ Socket error:", error);
    };

    // Handle disconnect
    const handleDisconnect = () => {
      console.log("🔌 Socket disconnected");
    };

    // Register event listeners
    if (chatSocket.connected) {
      handleConnect();
    } else {
      chatSocket.on("connect", handleConnect);
    }

    chatSocket.on("joined_room", handleJoinedRoom);
    chatSocket.on("new_message", handleNewMessage);
    chatSocket.on("messages_seen", handleMessagesSeen);
    chatSocket.on("error", handleError);
    chatSocket.on("disconnect", handleDisconnect);

    // Cleanup function
    return () => {
      console.log("🔌 Cleaning up socket listeners for room:", roomId);

      chatSocket.off("connect", handleConnect);
      chatSocket.off("joined_room", handleJoinedRoom);
      chatSocket.off("new_message", handleNewMessage);
      chatSocket.off("messages_seen", handleMessagesSeen);
      chatSocket.off("error", handleError);
      chatSocket.off("disconnect", handleDisconnect);

      // Leave room
      if (chatSocket.connected) {
        chatSocket.emit("leave_room", { roomId });
      }
    };
  }, [roomId, currentUserId, queryClient]);

  return {
    isConnected: chatSocket.connected,
  };
};
