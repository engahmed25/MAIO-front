import { Form, useForm } from "react-hook-form";
import Button from "../../ui/Button";
import FormInput from "./FormInput";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { use } from "react";
import { useLogin } from "./useLogin";

function LoginForm() {
  const { loginAsync, isLoading } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      console.log("Register data:", data);
      const res = await loginAsync(data); // Assume login is an imported function that handles login API call
      console.log("Login successful:", res);
    } catch (err) {
      console.error(err);
    }
  };
  // ▶ Google login handler
  const handleGoogleLogin = () => {
    console.log("Google login triggered");
    // Example: window.location.href = "/auth/google"
  };

  // ▶ Sign up navigation
  const handleSignUp = () => {
    console.log("SignUp triggered");
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-[90%] md:w-[50%] lg:w-[40%]">
        <h2 className="mb-5 font-bold text-3xl text-center">Welcome Back</h2>
        <form
          className="shadow-[0px_5px_15px_rgba(0,0,0,0.35)] p-12 rounded-2xl h-auto  overflow-auto  "
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-2">
            <FormInput
              label="Email"
              name="email"
              type="email"
              placeholder="Email"
              register={register}
              error={errors.email}
              validation={{
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email",
                },
              }}
            />
          </div>
          <div className="mb-2">
            <FormInput
              label="Password"
              name="password"
              type="password"
              placeholder="Password"
              register={register}
              error={errors.password}
              validation={{
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
              }}
            />
          </div>
          <Link
            to="/forgot-password"
            className="text-sm mt-2 cursor-pointer underline transition-colors duration-500 hover:text-(--main-color) text-right block "
            dir="rtl"
          >
            ?Forget Password
          </Link>
          {/* Login Button */}
          <Button
            type="submit"
            className="w-full p-2.5 mt-2.5"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Forwarding..." : "Login"}
          </Button>
          {/* Divider */}
          <div className="flex items-center gap-3 my-2">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-sm text-gray-500">Or</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>
          {/* Google Button */}
          <Button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 p-2.5 mt-2.5 bg-white hover:bg-(--main-color) font-semibold! text-black! border border-(--main-color) hover:text-white!  "
            disabled={isSubmitting}
          >
            <FcGoogle className="text-[20px]" />
            {isSubmitting ? "Forwarding..." : "Continue with Google"}
          </Button>
          {/* Sign Up */}
          <article className="text-center text-gray-500 text-sm mt-5">
            Don't have and MAIO account?
          </article>

          <Link to="/register">
            <Button
              type="button"
              onClick={handleSignUp}
              className="w-full p-2.5 mt-2.5 bg-white text-black! font-semibold!  border border-(--main-color) hover:bg-(--main-color) hover:text-white!"
            >
              Sign Up
            </Button>
          </Link>
        </form>
      </div>
    </div>
  );
}
export default LoginForm;
