import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNotification } from "../../services/apiNotification";
import { notificationKeys } from "./notificationKeys";

export function useDeleteNotification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notificationId) => deleteNotification(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.all });
      queryClient.invalidateQueries({ queryKey: notificationKeys.unreadCount });
    },
  });
}
