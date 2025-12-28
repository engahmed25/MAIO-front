import { useSearchParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Button from "../ui/Button";
import FormInput from "../features/Authentication/FormInput";
import { useResetPassword } from "../features/Authentication/useResetPassword";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  const { resetPasswordAsync, isLoading } = useResetPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const password = watch("newPassword");

  const onSubmit = async (data) => {
    if (!token) {
      toast.error("Invalid or missing reset token");
      return;
    }

    try {
      await resetPasswordAsync({
        token,
        newPassword: data.newPassword,
      });
    } catch (error) {
      console.error("Reset password error:", error);
    }
  };

  if (!token) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-4">
            Invalid Reset Link
          </h2>
          <p>The password reset link is invalid or has expired.</p>
          <Button
            onClick={() => navigate("/forgot-password")}
            className="mt-4 bg-main-color px-4 py-2 rounded-lg text-white"
          >
            Request New Link
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md">
        <form
          className="shadow-[0px_5px_15px_rgba(0,0,0,0.35)] p-8 md:p-12 rounded-2xl"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="mb-6 font-bold text-3xl text-center">
            Reset Password
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Enter your new password below
          </p>

          <div className="mb-4">
            <FormInput
              label="New Password"
              name="newPassword"
              type="password"
              placeholder="Enter new password"
              register={register}
              error={errors.newPassword}
              validation={{
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                  message:
                    "Password must contain uppercase, lowercase, and number",
                },
              }}
            />
          </div>

          <div className="mb-6">
            <FormInput
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              placeholder="Confirm new password"
              register={register}
              error={errors.confirmPassword}
              validation={{
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              }}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-main-color text-white py-3 rounded-lg hover:bg-opacity-90 transition-all"
            disabled={isLoading}
          >
            {isLoading ? "Resetting Password..." : "Reset Password"}
          </Button>

          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-main-color hover:underline"
            >
              Back to Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
