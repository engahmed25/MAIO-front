import { useQuery } from "@tanstack/react-query";
import { fetchUnreadCount } from "../../services/apiNotification";
import { notificationKeys } from "./notificationKeys";

export function useUnreadNotificationsCount(enabled = true) {
  return useQuery({
    queryKey: notificationKeys.unreadCount,
    queryFn: fetchUnreadCount,
    enabled,
    staleTime: 30_000,
  });
}
