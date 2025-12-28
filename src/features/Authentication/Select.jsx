function Select({
  register,
  errors,
  selectedSpecialization,
  label,
  name,
  validation,
  options = [],
}) {
  //! this watch comes from react hook form to watch the specialization field
  // const selectedSpecialization = watch("specialization", ""); // default = ""
  return (
    <>
      {/* we will make it combo box as a feature */}
      {/* Specialization Select */}
      <div className="mb-6 flex flex-col items-start gap-1">
        <label className="ml-0.5">{label}</label>
        <select
          className="border-[1px] border-gray-300 rounded-lg p-2 w-full bg-white"
          {...register(name, validation)}
        >
          <option disabled value="">
            Select your specialization
          </option>
          {options.map((spec) => (
            <option key={spec} value={spec}>
              {spec}
            </option>
          ))}
        </select>
        {errors[name] && (
          <span className="text-red-500 text-sm">This field is required</span>
        )}
      </div>
      {/* Conditional Input - Shows when "Other" is selected */}

      {selectedSpecialization === "Other" && (
        <div className="mb-6 flex flex-col items-start gap-1">
          <label className="ml-0.5">Please specify your specialization</label>
          <input
            className="border-[1px] border-gray-300 rounded-lg p-2 w-full"
            type="text"
            {...register("otherSpecialization", {
              required:
                selectedSpecialization === "Other"
                  ? "Please specify your specialization"
                  : false,
            })}
            placeholder="Enter your specialization"
          />
          {errors.otherSpecialization && (
            <span className="text-red-500 text-sm">
              {errors.otherSpecialization.message}
            </span>
          )}
        </div>
      )}
    </>
  );
}

export default Select;
