import { useForm } from "react-hook-form";
import FormRow from "./FormRow";
import FormInput from "./FormInput";
import Button from "../../ui/Button";
import Select from "./Select";
import Illnesses from "../../ui/Illnesses";
import { useNavigate } from "react-router-dom";

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
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();
  const selectedIllnesses = watch("illnesses");

  const onSubmit = async (data) => {
    try {
      console.log("Register data:", data);
      // TODO: integrate with auth API (e.g., call register service)
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

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
