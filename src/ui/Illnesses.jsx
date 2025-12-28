function Illnesses({
  register,
  errors,
  name,
  watch,
  options = [],
  validation = {},
  otherFieldName = "otherIllness",

  label,
}) {
  const selectedIllnesses = watch("illnesses") || [];

  return (
    <div className="flex flex-col gap-2 mb-4">
      {label && <label className="font-medium">{label}</label>}
      <div className="flex flex-col gap-1">
        {options.map((option) => (
          <div key={option} className="flex items-center gap-2">
            <input
              type="checkbox"
              value={option}
              {...register(name, validation)}
              id={`${name}-${option}`}
            />
            <label htmlFor={`${name}-${option}`}>{option}</label>
          </div>
        ))}
        {errors[name] && (
          <span className="text-red-500 text-sm">
            {errors[name]?.message || "This field is required"}
          </span>
        )}
      </div>

      {/* Conditional Input - Shows when "Other" is selected */}
      {selectedIllnesses.includes("Other") && (
        <div className="mb-6 flex flex-col items-start gap-1">
          <label className="ml-0.5">Please List all of your illnesses</label>
          <input
            className="border-[1px] border-gray-300 rounded-lg p-2 w-full"
            type="text"
            {...register(otherFieldName, {
              validate: (value) =>
                selectedIllnesses.includes("Other") && !value
                  ? "Please specify your other illnesses"
                  : true,
            })}
            placeholder="Enter your specialization"
          />
          {errors.otherIllness && (
            <span className="text-red-500 text-sm">
              {errors.otherIllness.message}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default Illnesses;
