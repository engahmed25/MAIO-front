import { QueryClient, useMutation } from "@tanstack/react-query";
import { login } from "../../services/apiAuth";
import { useSignIn } from "react-auth-kit";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";




export function useLogin() {
    const siginIn = useSignIn();
    const queryClient = new QueryClient();
    const navigate = useNavigate();
    const mustation = useMutation({
        mutationFn: login,

        onSuccess: (data) => {
            const user = data.data;

            if (user.role === "doctor" && user.status === "pending") {
                queryClient.setQueryData(["DoctorData"], user);
                localStorage.setItem("pendingDoctor", JSON.stringify(user));

                toast.success("Your account is still pending approval.");
                navigate("/");
                return;
            }
            //! this only for approved doctors and for any patient signin
            const signedin = siginIn({
                token: data.accessToken,
                expiresIn: 3600, // 1 hour
                tokenType: "Bearer",
                authState: {
                    user: user,
                },
            });

            if (signedin) {
                toast.success("Login successful!");
                // Clear pending doctor data if it exists
                localStorage.removeItem("pendingDoctor");
                queryClient.removeQueries(["DoctorData"]);
                console.log("Login successful from API:", user);
                user.role === "doctor" ? navigate("/doctor/dashboard") : navigate("/");
            } else toast.error("Login persistence failed");
        },
        onError: (error) => {
            toast.error(
                error.response?.data?.message ||
                "Failed to create account. Please try again."
            );
        },
    });
    return {
        loginAsync: mustation.mutateAsync,
        isLoading: mustation.isPending,
    };
}
