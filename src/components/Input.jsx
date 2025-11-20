import { memo } from "react";
import FormikHOC from "./FormikHOC";
import {
  HiOutlineUser,
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineLockOpen,
  HiOutlineSearch,
} from "react-icons/hi";

const iconMap = {
  username: <HiOutlineUser className="w-5 h-5" />,
  email: <HiOutlineMail className="w-5 h-5" />,
  password: <HiOutlineLockOpen className="w-5 h-5" />,
  confirmPassword: <HiOutlineLockClosed className="w-5 h-5" />,
  search: <HiOutlineSearch className="w-5 h-5" />,
};

export const Input = memo(
  ({ id, name, placeholder, className = "", ...rest }) => {
    const icon = iconMap[name] || null;

    return (
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
          placeholder={placeholder}
          className={`w-full p-3 pl-10 border transition-colors duration-200 focus:outline-none focus:ring-2 focus:border-transparent rounded ${className}`}
          {...rest}
        />
      </div>
    );
  }
);

const FormInput = FormikHOC(Input);

export default FormInput;
