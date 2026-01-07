import { useMutation, useQueryClient } from "@tanstack/react-query";
import { markNotificationRead } from "../../services/apiNotification";
import { notificationKeys } from "./notificationKeys";

export function useMarkNotificationRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notificationId) => markNotificationRead(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.all });
      queryClient.invalidateQueries({ queryKey: notificationKeys.unreadCount });
    },
  });
}
