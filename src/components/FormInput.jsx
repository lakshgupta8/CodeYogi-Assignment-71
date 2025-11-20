import { useField } from "formik";
import Input from "./Input";

function FormInput({ name, className = "", ...rest }) {
  const [data, meta] = useField(name);
  const { value, onBlur, onChange } = data;
  const { touched, error } = meta;

  const borderClass =
    touched && error ? "border-primary-medium" : "border-white";

  const combinedClassName =
    `${className} ${borderClass} ${"focus:ring-white placeholder-white"}`.trim();

  return (
    <div>
      <Input
        name={name}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        className={combinedClassName}
        {...rest}
      />
      {touched && error && (
        <p className="mt-1 pl-1 text-primary-medium text-sm">{error}</p>
      )}
    </div>
  );
}

export default FormInput;
