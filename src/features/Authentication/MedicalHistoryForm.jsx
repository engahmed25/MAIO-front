import { useForm } from "react-hook-form";
import FormRow from "./FormRow";
import FormInput from "./FormInput";
import Button from "../../ui/Button";
import Select from "./Select";
import Illnesses from "../../ui/Illnesses";
import { useNavigate } from "react-router-dom";
import { usePatientRegister } from "../../Context/PatientRegisterContext";
import { useSignUpPatient } from "./useSignUpPatient";
import { toast } from "react-hot-toast";

const illnesses = [
  "Diabetes",
  "Hypertension",
  "Asthma",
  "Heart Disease",
  "Cancer",
  "Kidney Disease",
  "Other",
];
function MedicalHistoryForm({ onNext }) {
  const { updatePatientFormData, patientFormData } = usePatientRegister();
  const { signUpAsync: patientRegister, isLoading } = useSignUpPatient();

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: patientFormData.step2,
  });

  const navigate = useNavigate();
  const selectedIllnesses = watch("illnesses");

  async function onSubmit(data) {
    updatePatientFormData("step2", data);
    // Get the picture from step1 data
    const step1Data = patientFormData.step1;

    const formDataToSend = new FormData();

    // Handle the picture specifically (accept File or FileList/array)
    if (step1Data.profilePicture) {
      const pictureFile =
        step1Data.profilePicture[0] &&
        !(step1Data.profilePicture instanceof File)
          ? step1Data.profilePicture[0]
          : step1Data.profilePicture;
      if (pictureFile) formDataToSend.append("profilePicture", pictureFile);
    }

    // Add all other step1 fields (excluding picture to avoid duplication)
    for (const key in step1Data) {
      if (key !== "picture") {
        formDataToSend.append(key, step1Data[key]);
      }
    }

    // Add all step2 fields
    for (const key in data) {
      if (Array.isArray(data[key])) {
        data[key].forEach((item) => {
          formDataToSend.append(key, item);
        });
      } else {
        formDataToSend.append(key, data[key]);
      }
    }
    // Debug: Log FormData contents
    console.log("=== FormData Contents ===");
    for (let [key, value] of formDataToSend.entries()) {
      console.log(key, value);
    }
    try {
      const res = await patientRegister(formDataToSend);
      console.log("Patient registered:", res);
      // Only navigate on successful registration
      navigate("/");
    } catch (error) {
      console.error("Registration failed:", error);
      // Don't navigate on error - stay on the form
    }
  }

  return (
    <div className="w-full h-[100vh] flex items-center justify-center flex-col">
      <h2 className="mb-5 flex items-center justify-center font-bold text-3xl">
        MEDICAL HISTORY 🏥
      </h2>
      <form
        className="shadow-[0px_5px_15px_RGBA(0,0,0,0.35)] p-12 rounded-2xl h-[77%] overflow-auto w-[90%] md:w-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* text area for allergies */}
        <div>
          <label className="mb-2">Please List any Drugs allergies</label>
          <textarea
            className="w-full  border-[1px] border-gray-300 rounded-lg p-2 "
            rows={4}
            {...register("drugAllergies", {
              required: "This field is required",
            })}
          />
          {errors.drugAllergies && (
            <span className="text-red-500 text-sm mb-4">
              {errors.drugAllergies.message}
            </span>
          )}
        </div>
        {/* text area for operations */}

        <Illnesses
          label="Have you ever had (Please check all that apply)"
          register={register}
          errors={errors}
          name="illnesses"
          options={illnesses}
          validation={{ required: "This field is required" }}
          selectedIllnesses={selectedIllnesses}
          watch={watch}
        />
        <div>
          <label className="mb-2">
            Please list any Operations and Dates of Each
          </label>
          <textarea
            className="w-full  border-[1px] border-gray-300 rounded-lg p-2 "
            rows={4}
            {...register("operations", {
              required: "This field is required",
            })}
          />
          {errors.operations && (
            <span className="text-red-500 text-sm mb-4">
              {errors.operations.message}
            </span>
          )}
        </div>
        <div>
          <label className="mb-2">Please list Your Current Medications</label>
          <textarea
            className="w-full  border-[1px] border-gray-300 rounded-lg p-2 "
            rows={4}
            {...register("currentMedications", {
              required: "This field is required",
            })}
          />
          {errors.currentMedications && (
            <span className="text-red-500 text-sm mb-4">
              {errors.currentMedications.message}
            </span>
          )}
        </div>

        <div className="flex flex-col mb-4">
          <label className="font-medium">Do You Smoke?</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-1">
              <input
                type="radio"
                value="yes"
                {...register("smoking", { required: "This field is required" })}
              />
              Yes
            </label>
            <label className="flex items-center gap-1">
              <input type="radio" value="no" {...register("smoking")} />
              No
            </label>
          </div>
          {errors.smoking && (
            <span className="text-red-500 text-sm mt-1">
              {errors.smoking.message}
            </span>
          )}
        </div>

        <Button type="submit" className="w-full p-2.5 " disabled={isSubmitting}>
          {isSubmitting ? "Registering..." : "Register"}
        </Button>
      </form>
    </div>
  );
}
export default MedicalHistoryForm;
