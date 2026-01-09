import { useMutation, useQueryClient } from "@tanstack/react-query";
import { markAllNotificationsRead } from "../../services/apiNotification";
import { notificationKeys } from "./notificationKeys";

export function useMarkAllNotificationsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => markAllNotificationsRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.all });
      queryClient.invalidateQueries({ queryKey: notificationKeys.unreadCount });
    },
  });
}
