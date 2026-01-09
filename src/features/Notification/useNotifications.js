import { useQuery } from "@tanstack/react-query";
import { fetchNotifications } from "../../services/apiNotification";
import { notificationKeys } from "./notificationKeys";

export function useNotifications(enabled = true) {
  return useQuery({
    queryKey: notificationKeys.all,
    queryFn: fetchNotifications,
    enabled,
  });
}
