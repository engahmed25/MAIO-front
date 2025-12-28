/*************  ✨ Windsurf Command ⭐  *************/
import { useParams } from "react-router-dom";
import { useVerifyEmail } from "../features/Authentication/useVerifyEmail";
import { useState } from "react";
import toast from "react-hot-toast";
import Button from "../ui/Button";
import { verifyEmailApi } from "../services/apiAuth";

export default function EmailConfirmation() {
  const { token } = useParams();
  const [loading, setLoading] = useState(false);

  const { mutate: verifyEmail } = useVerifyEmail();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.target);
    const email = formData.get("email");

    try {
      const response = await verifyEmailApi({ email });
      if (response.success) {
        toast.success("Email verification successful!");
        setLoading(false);
      } else {
        toast.error(response.message);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error verifying email");
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen flex-col gap-6">
      <form className="flex flex-col gap-3.5" onSubmit={handleSubmit}>
        <h2 className="text-center text-3xl font-bold">Forgot Password</h2>
        <p className="text-center">
          Enter your email address to receive a password reset link
        </p>
        <div className="flex flex-col items-center justify-center gap-3.5">
          <label className="sr-only" htmlFor="email">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            className="px-4 py-2 rounded-lg border border-main-color w-full"
            required
          />
          <Button
            type="submit"
            className="bg-main-color px-4 py-2 rounded-lg text-white"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </Button>
        </div>
      </form>
    </div>
  );
}
