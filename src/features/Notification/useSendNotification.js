import { useMutation } from "@tanstack/react-query";
import { sendNotification } from "../../services/apiNotification";

export function useSendNotification() {
  return useMutation({
    mutationFn: (payload) => sendNotification(payload),
  });
}
