import { verifyEmailApi } from "../../services/apiAuth";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";


export function useVerifyEmail() {
  const { mutate: verifyEmail, isLoading } = useMutation({
    mutationFn: verifyEmailApi,
    onSuccess: (data) => {
      toast.success("Email verification successful!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to verify email");
    },
  });

  return {
    verifyEmailAsync: verifyEmail,
    isLoading: isLoading,
  };
}
