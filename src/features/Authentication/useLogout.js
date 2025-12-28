import { useMutation } from "@tanstack/react-query";
import { logout } from "../../services/apiAuth";
import { useSignOut, useAuthHeader } from "react-auth-kit";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogout() {
    const signOut = useSignOut();
    const authHeader = useAuthHeader();
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: () => {
            const token = authHeader()?.split(" ")[1]; // Extract token from "Bearer <token>"
            if (!token) {
                throw new Error("No authentication token found");
            }
            return logout(token);
        },
        onSuccess: () => {
            signOut();
            localStorage.removeItem("pendingDoctor");
            toast.success("Logged out successfully!");
            navigate("/login");
        },
        onError: (error) => {
            console.error("Logout error:", error);
            // Still sign out locally even if API call fails
            signOut();
            localStorage.removeItem("pendingDoctor");
            toast.error("Logged out locally");
            navigate("/login");
        },
    });

    return {
        logoutAsync: mutation.mutateAsync,
        logout: mutation.mutate,
        isLoading: mutation.isPending,
    };
}
