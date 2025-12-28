import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doctorSignUp } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useSignUpDoctor() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: doctorSignUp,
        onSuccess: (response) => {
            toast.success("Doctor registration successful. Wait for admin approval.");

            // Save the doctor info in the cache
            // queryClient.setQueryData(["DoctorData", response.data.doctorId], response.data);
            queryClient.setQueryData(["DoctorData"], response.data);
            localStorage.setItem("pendingDoctor", JSON.stringify(response.data));

            navigate("/wait");
        },
        onError: (error) => {
            toast.error(
                error.response?.data?.message ||
                "Failed to create account. Please try again."
            );
        },
    });
    return {
        signUpAsync: mutation.mutateAsync,
        isLoading: mutation.isPending,
    };
}
