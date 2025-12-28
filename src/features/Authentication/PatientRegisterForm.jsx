import { useForm } from "react-hook-form";
import FormRow from "./FormRow";
import FormInput from "./FormInput";
import Button from "../../ui/Button";
import Select from "./Select";
import UploadFilesInput from "./UploadFilesInput";
import UploadPicture from "./UploadPicture";
import { usePatientRegister } from "../../Context/PatientRegisterContext";
function PatientRegisterForm({ onNext }) {
  const { updatePatientFormData, patientFormData } = usePatientRegister();
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: patientFormData.step1,
  });

  function onSubmit(data) {
    updatePatientFormData("step1", data);
    onNext();
  }

  return (
    <div className="w-full h-[100vh] flex items-center justify-center flex-col">
      <h2 className="mb-5 flex items-center justify-center font-bold text-3xl">
        WELCOME PATIENT😷
      </h2>
      <form
        className="shadow-[0px_5px_15px_RGBA(0,0,0,0.35)] p-12 rounded-2xl h-[77%] overflow-auto w-[90%] md:w-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <UploadPicture
          register={register}
          errors={errors}
          setValue={setValue}
        />
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
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
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
            label="Age"
            name="age"
            type="number"
            placeholder="Age"
            register={register}
            error={errors.age}
            validation={{
              required: "Age is required",
              min: { value: 0, message: "Age cannot be negative" },
            }}
          />
          <FormInput
            label="Emergency Contact Number"
            name="emergencyContactNumber"
            type="number"
            placeholder="Emergency Contact Number"
            register={register}
            error={errors.emergencyContactNumber}
            validation={{
              required: "Emergency Contact Number is required",
              min: {
                value: 0,
                message: "Emergency Contact Number cannot be negative",
              },
            }}
          />
        </FormRow>
        <FormInput
          label="Reason for seeing doctor"
          name="reasonForSeeingDoctor"
          type="text"
          placeholder="Reason for seeing doctor"
          register={register}
          error={errors.reasonForSeeingDoctor}
          validation={{
            required: "Reason for seeing doctor is required",
          }}
          className="mb-4"
        />
        <Select
          register={register}
          errors={errors}
          watch={watch}
          options={["male", "female"]}
          label="Gender"
          name="gender"
          validation={{ required: "Gender is required" }}
        />
        <Button type="submit" className="w-full p-2.5 " disabled={isSubmitting}>
          {isSubmitting ? "Forwarding..." : "Medical History"}
        </Button>
      </form>
    </div>
  );
}
export default PatientRegisterForm;
