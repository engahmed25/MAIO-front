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

      // Update local cache
      queryClient.setQueryData(["chat-messages", roomId], (old = []) => [
        ...old,
        response.data,
      ]);

      // Emit via socket for real-time delivery to other users
      chatSocket.emit("send_message", {
        roomId,
        content: message,
        attachments: response.data.attachments,
        messageType: "file",
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
