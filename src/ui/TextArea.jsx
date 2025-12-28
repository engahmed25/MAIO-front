function TextArea({
  register,
  errors,
  label,
  name,
  rows = 4,
  validation = {},
  className,
}) {
  return (
    <div className="flex flex-col mb-4">
      <label className="mb-2">{label}</label>
      <textarea
        className="w-full  border-[1px] border-gray-300 rounded-lg p-2 "
        rows={rows}
        {...register(name, validation)}
      />
      {errors && errors[name] && (
        <span className="text-red-500 text-sm mb-4">
          {errors[name].message}
        </span>
      )}
    </div>
  );
}

export default TextArea;
