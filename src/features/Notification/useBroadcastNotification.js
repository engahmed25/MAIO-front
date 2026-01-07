import { useMutation } from "@tanstack/react-query";
import { broadcastNotification } from "../../services/apiNotification";

export function useBroadcastNotification() {
  return useMutation({
    mutationFn: (payload) => broadcastNotification(payload),
  });
}
