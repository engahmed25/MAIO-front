import { useMutation } from "@tanstack/react-query";
import { patientSignUp } from "../../services/apiAuth";
import { useSignIn } from "react-auth-kit";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useSignUpPatient() {
    const signIn = useSignIn();

    const navigate = useNavigate();

    const mustation = useMutation({
        mutationFn: patientSignUp,

        onSuccess: (data) => {
            //! now after signup we need to signIn the user directly as we get the token from the signup API this will done using react-auth-kit's signIn function

            const signedin = signIn({
                token: data.accessToken,
                expiresIn: 3600, // 1 hour
                tokenType: "Bearer",
                //! this is the user object we get from the API so lately we can do const auth = useAuthUser(); const user = auth()?.user; yo get his data
                //? so this authState is where the user data that comes from the API will be stored in react-auth-kit
                authState: {
                    user: data.data,
                },
            });

            if (signedin) {
                toast.success(
                    "Account successfully created! Please verify the new account from the user's email address."
                );
                navigate("/");
                console.log("Signup successful from API:", data.data);
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
        signUpAsync: mustation.mutateAsync,
        isLoading: mustation.isPending,
    };
}
