function FormInput({
  label,
  type = "text",
  placeholder,
  name,
  register,
  error,
  validation,
  className,
  disabled,
  ...rest
}) {
  return (
    <div className={`flex flex-col  items-start gap-1 ${className}`}>
      <label className="ml-0.5">{label}</label>
      <input
        className={`border-[1px] border-gray-300 rounded-lg p-2 w-full ${
          disabled ? "bg-gray-100 text-gray-500 cursor-not-allowed" : "bg-white"
        }`}
        type={type}
        {...register(name, validation)}
        placeholder={placeholder || label}
        disabled={disabled}
        {...rest}
      />
      {error && <span className="text-red-500 text-sm">{error.message}</span>}
    </div>
  );
}

export default FormInput;
