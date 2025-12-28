import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import { toast } from "react-hot-toast";

// export function useSignup() {
//     const { mutate: signup, isLoading } = useMutation({
//         mutationFn: signupApi,
//         onSuccess: (data) => {
//             console.log("dataaaaaaaa", data);
//             toast.success(
//                 "Account successfully created! Please verufy the new account from the user's email address."
//             );
//         }, onError: (error) => {
//             toast.error(error.response?.data?.message || "Failed to create account. Please try again.");
//         }
//     });

//     return { signup, isLoading };
// }


//! we cahnge the above code to use mutateAsync instead of mutate to be able to use async/await syntax so that we can use the onNext()
//! function after the signup is successful in the DoctorRegisterForm.jsx file so that we go to step 2 only after the signup is successfull
//! without mutateAsync we cant use the onNext(); as the signup that we used in the onSubmit is async and onNext is sync so it will be called immediately and this doesn't work

//? this mutation gives us both the mutate and mutateAsync functions so we can use either of them   
export function useSignup() {
    const mutation = useMutation({
        mutationFn: signupApi,
        onSuccess: (data) => {
            console.log("dataaaaaaaa", data);
            toast.success(
                "Account successfully created! Please verufy the new account from the user's email address."
            );
        }, onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to create account. Please try again.");
        }
    });

    return mutation;
}

/*
! another solution for this onNext issue was onSettled but it's problem it will run in both cases success and error so we cant use it to go to the next step ass we need it only on success
! so the other solution is onSuccess do this       if (onSuccessCallback) {
        onSuccessCallback(data); // call the onNext() from your component
      }

      so this ueSignup will recieve onSuccessCallback as a parameter
      and then we do this 

    ! const { signup, isLoading } = useSignup(() => {
    ! onNext(); // called after signup succeeds
  !});

  ! function onSubmit(data) {
  ! signup({ ...data, username: data.username.toLowerCase(), role: "user" });
  }

*/
