import { useMutation } from "@tanstack/react-query";
import { submitResetPassword } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useResetPassword() {
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: submitResetPassword,
        onSuccess: (data) => {
            toast.success("Password reset successful! Redirecting to login...");
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        },
        onError: (error) => {
            toast.error(
                error.response?.data?.message ||
                "Failed to reset password. Please try again."
            );
        },
    });

    return {
        resetPasswordAsync: mutation.mutateAsync,
        isLoading: mutation.isPending,
    };
}
