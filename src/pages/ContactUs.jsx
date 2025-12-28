import { useForm } from "react-hook-form";
import FormInput from "../features/Authentication/FormInput.jsx";
import Button from "../ui/Button.jsx";

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-3xl mx-auto flex flex-col gap-6 px-4 py-10"
    >
      {/* -------- Header -------- */}
      <div className="text-center mb-4">
        <h3 className="text-sm text-gray-500">Get In Touch</h3>
        <h1 className="text-3xl font-bold mt-1">Contact Us</h1>
      </div>

      {/* -------- First + Last Name -------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          label="First name"
          name="firstName"
          placeholder="Enter your first name"
          register={register}
          error={errors.firstName}
          validation={{ required: "First name is required" }}
        />

        <FormInput
          label="Last name"
          name="lastName"
          placeholder="Enter your last name"
          register={register}
          error={errors.lastName}
          validation={{ required: "Last name is required" }}
        />
      </div>

      {/* -------- Email + Phone -------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          label="Email"
          type="email"
          name="email"
          placeholder="Enter your email"
          register={register}
          error={errors.email}
          validation={{
            required: "Email is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Invalid email format",
            },
          }}
        />

        <FormInput
          label="Phone number"
          name="phone"
          placeholder="Enter your phone number"
          register={register}
          error={errors.phone}
          validation={{ required: "Phone number is required" }}
        />
      </div>

      {/* -------- Topic Dropdown -------- */}
      <div className="flex flex-col gap-1">
        <label>Choose a topic</label>
        <select
          className="border border-gray-300 rounded-lg p-2 w-full"
          {...register("topic", { required: "Please choose a topic" })}
        >
          <option value="">Select one...</option>
          <option value="support">Support</option>
          <option value="sales">Sales</option>
          <option value="feedback">Feedback</option>
        </select>
        {errors.topic && (
          <span className="text-red-500 text-sm">{errors.topic.message}</span>
        )}
      </div>

      {/* -------- Message Textarea -------- */}
      <div className="flex flex-col gap-1">
        <label>Message</label>
        <textarea
          placeholder="Type your message..."
          className="border border-gray-300 rounded-lg p-2 w-full min-h-[150px]"
          {...register("message", { required: "Message is required" })}
        />
        {errors.message && (
          <span className="text-red-500 text-sm">{errors.message.message}</span>
        )}
      </div>

      {/* -------- Terms Checkbox -------- */}
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" {...register("terms", { required: true })} />I
        accept the terms
      </label>
      {errors.terms && (
        <span className="text-red-500 text-sm">You must accept the terms.</span>
      )}

      {/* -------- Submit Button -------- */}
      <Button type="submit" className="w-full py-3 text-center">
        Submit
      </Button>
    </form>
  );
}
