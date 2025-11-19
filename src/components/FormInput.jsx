import { useField } from "formik";
import {
  HiOutlineUser,
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineLockOpen,
} from "react-icons/hi";

const iconMap = {
  username: <HiOutlineUser className="w-5 h-5" />,
  email: <HiOutlineMail className="w-5 h-5" />,
  password: <HiOutlineLockClosed className="w-5 h-5" />,
  confirmPassword: <HiOutlineLockClosed className="w-5 h-5" />,
};

function FormInput ({ id, name, placeholder, className = "", ...rest }) {
  const icon = iconMap[name] || null;

  const [data, meta] = useField(name);
  const { value, onBlur, onChange } = data;
  const { touched, error } = meta;

  return (
    <div>
      <div className="relative flex items-center">
        {icon && (
          <span className="left-3 absolute opacity-80 w-5 h-5 pointer-events-none">
            {icon}
          </span>
        )}
        <label htmlFor={id} className="sr-only">
          {placeholder}
        </label>
        <input
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className={`w-full p-3 pl-10 border ${
            touched && error ? "border-primary-medium" : "border-white"
          } transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent rounded placeholder-white bg-transparent ${className}`}
          {...rest}
        />
      </div>
      {touched && error && (
        <p className="mt-1 pl-1 text-primary-medium text-sm">{error}</p>
      )}
    </div>
  );
};

export default FormInput;
