import FormInput from "./FormInput";

function FormRow({ children }) {
  return (
    <div className="flex flex-col md:flex-row gap-2.5 mb-3.5">{children}</div>
  );
}

export default FormRow;
