import { useMutation } from "@tanstack/react-query";
import { sendNotificationToRole } from "../../services/apiNotification";

export function useSendNotificationToRole() {
  return useMutation({
    mutationFn: (payload) => sendNotificationToRole(payload),
  });
}
