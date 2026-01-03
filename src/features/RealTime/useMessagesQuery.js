import { useQuery } from "@tanstack/react-query";
import { getChatMessages } from "../../services/apiChat.js";

export const useMessagesQuery = (roomId) => {
  return useQuery({
    queryKey: ["chat-messages", roomId],
    queryFn: () => getChatMessages(roomId),
    enabled: !!roomId,
    staleTime: Infinity,
  });
};
