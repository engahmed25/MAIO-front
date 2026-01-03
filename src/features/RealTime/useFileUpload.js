import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { uploadChatFiles } from "../../services/apiChat.js";
import { chatSocket } from "../RealTime/socket.js";

export const useFileUpload = (roomId) => {
  const [isUploading, setIsUploading] = useState(false);
  const queryClient = useQueryClient();

  const uploadFiles = async (files, message = "") => {
    if (!files || files.length === 0) return;

    setIsUploading(true);

    try {
      const response = await uploadChatFiles(roomId, files, message);

      console.log("📤 File upload response:", response);

      // The backend should emit via socket, so we don't need to emit here
      // Just update local cache with the properly formatted message
      queryClient.setQueryData(["chat-messages", roomId], (old = []) => {
        // Check if message already exists to prevent duplicates
        const messageId = response.data.id || response.data._id;
        const exists = old.some((m) => (m.id || m._id) === messageId);

        if (exists) {
          console.log("⚠️ Message already exists in cache, skipping");
          return old;
        }

        // Format the message to match the expected structure
        const formattedMessage = {
          _id: response.data.id || response.data._id,
          id: response.data.id || response.data._id,
          roomId: response.data.roomId,
          sender: response.data.sender,
          senderId: response.data.sender?._id || response.data.sender,
          content: response.data.content,
          createdAt: response.data.createdAt,
          isRead: response.data.isRead,
          attachments: response.data.attachments,
          messageType: response.data.messageType,
        };

        console.log("✅ Adding file message to cache:", formattedMessage);
        return [...old, formattedMessage];
      });

      return response;
    } catch (error) {
      console.error("File upload failed:", error);
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  return { uploadFiles, isUploading };
};
