import React from "react";
import { Form, useForm } from "react-hook-form";
import FormInput from "./FormInput";
import FormRow from "./FormRow";
import Button from "../../ui/Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import Select from "./Select";
import { useSignup } from "./useSignUp";
import { useDoctorRegister } from "../../Context/DoctorRegisterContext";
const specializations = [
  "Cardiology",
  "Dermatology",
  "Neurology",
  "Pediatrics",
  "Psychiatry",
  "Radiology",
  "Surgery",
  "Orthopedics",
  "Gynecology",
  "Oncology",
  "Anesthesiology",
  "Emergency Medicine",
  "Family Medicine",
  "Internal Medicine",
  "Ophthalmology",
  "Other",
];

const genderOptions = ["male", "female", "other"];

function DoctorRegisterForm({ onNext }) {
  const { updateFormData, formData } = useDoctorRegister();

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: formData.step1, //! this to pre-fill the form if the user goes back
  });

  //! this watch comes from react hook form to watch the specialization field
  const selectedSpecialization = watch("specialization");

  const selectedGender = watch("gender");

  function onSubmit(data) {
    updateFormData("step1", data);
    onNext();
  }

  return (
    <div className="w-full h-screen flex items-center justify-center flex-col">
      <h2 className="mb-5 flex  items-center justify-center font-bold text-3xl ">
        WELCOME DOCTOR 🥼
      </h2>
      <form
        className="shadow-[0px_5px_15px_rgba(0,0,0,0.35)] p-12 rounded-2xl h-[77%] overflow-auto w-[90%] md:w-auto "
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormRow>
          <FormInput
            label="First Name"
            name="firstName"
            type="text"
            placeholder="First Name"
            register={register}
            error={errors.firstName}
            validation={{ required: "First name is required" }}
          />

          <FormInput
            label="Last Name"
            name="lastName"
            type="text"
            placeholder="Last Name"
            register={register}
            error={errors.lastName}
            validation={{ required: "Last name is required" }}
          />
        </FormRow>
        <FormRow>
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
        </FormRow>
        <FormRow>
          <FormInput
            label="Years of Experience"
            name="yearsOfExperience"
            type="number"
            placeholder="Years of Experience"
            register={register}
            error={errors.yearsOfExperience}
            validation={{ required: "Years of Experience is required" }}
          />
          <FormInput
            label="Phone Number"
            name="phoneNumber"
            type="number"
            placeholder="Phone Number"
            register={register}
            error={errors.phoneNumber}
            validation={{ required: "Phone Number is required" }}
          />
        </FormRow>
        <FormRow>
          <FormInput
            label="Clinic Address"
            name="clinicAddress"
            type="text"
            placeholder="Clinic Address"
            register={register}
            error={errors.clinicAddress}
            validation={{ required: "Clinic Address is required" }}
          />
          {/* <FormInput
            label="Start Time"
            name="startTime"
            type="time"
            placeholder="Start Time"
            register={register}
            error={errors.startTime}
            validation={{ required: "Start time is required" }}
          />

          <FormInput
            label="Medical License Number"
            name="medicalLicenseNumber"
            type="text"
            placeholder="Medical License Number"
            register={register}
            error={errors.medicalLicenseNumber}
            validation={{ required: "Medical License Number is required" }}
          />
        </FormRow>
        {/* we will make it combo box as a feature */}

          <FormInput
            label="Professional Bio (Optional)"
            name="bio"
            type="textarea"
            placeholder="Tell us about your experience..."
            register={register}
            error={errors.bio}
          />
        </FormRow>
        {/* Specialization Select */}
        <Select
          register={register}
          errors={errors}
          watch={watch}
          trigger={trigger}
          DisableValue="Select Your Gender"
          selectedGender={selectedGender}
          label="Gender"
          name="gender"
          validation={{ required: "Gender is required" }}
          options={genderOptions}
        />
        <Select
          register={register}
          errors={errors}
          watch={watch}
          trigger={trigger}
          DisableValue="Select Your Specification"
          selectedSpecialization={selectedSpecialization}
          label="Specialization"
          name="specialization"
          validation={{ required: "Specialization is required" }}
          options={specializations}
        />

        <Button type="submit" className="w-full p-2.5" disabled={isSubmitting}>
          {isSubmitting ? "Forwarding..." : "Upload Files"}
        </Button>
      </form>
    </div>
  );
}

export default DoctorRegisterForm;
