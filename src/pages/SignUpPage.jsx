import { useMemo, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaAmazon } from "react-icons/fa";
import {
  HiOutlineUser,
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineLockOpen,
} from "react-icons/hi";
import { useFormik } from "formik";
import * as Yup from "yup";

function SignUpPage() {
  const navigate = useNavigate();
  const callSignInApi = useCallback(
    (values) => {
      console.log(
        "Signing up with:",
        values.username,
        values.email,
        values.password
      );
      alert(
        `Account created for ${values.username}.\nVerification link sent to ${values.email}`
      );
      navigate("/");
    },
    [navigate]
  );

  const validationSchema = useMemo(
    () =>
      Yup.object({
        username: Yup.string().required("Username is required"),
        email: Yup.string()
          .required("Email is required")
          .email("Invalid email format"),
        password: Yup.string()
          .required("Password is required")
          .min(8, "Password must be at least 8 characters long"),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("password"), null], "Passwords must match")
          .required("Confirm Password is required"),
      }),
    []
  );

  const {
    handleSubmit,
    values,
    handleChange,
    errors,
    handleBlur,
    touched,
    isValid,
  } = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: callSignInApi,
    validationSchema: validationSchema,
  });

  return (
    <div
      className="h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{
        backgroundImage: 'url("/images/loginbg.svg")',
      }}
    >
      <div className="absolute top-4 right-4">
        <Link
          to="/"
          className="text-white text-sm hover:underline focus:text-gray-800"
        >
          Continue without login
        </Link>
      </div>

      <div className="w-full max-w-md flex flex-col px-4 gap-6 text-white">
        <FaAmazon className="text-9xl mb-6 mx-auto" />
        <h1 className="text-2xl font-bold text-center">Create Your Account</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="relative flex items-center">
              <HiOutlineUser className="absolute left-3 w-5 h-5 pointer-events-none opacity-80" />
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                type="text"
                name="username"
                placeholder="Username"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full p-3 pl-10 border ${
                  touched.username && errors.username
                    ? "border-primary-medium"
                    : "border-white"
                } transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent rounded placeholder-white bg-transparent`}
              />
            </div>
            {touched.username && errors.username && (
              <p className="text-primary-medium text-sm mt-1 pl-1">
                {errors.username}
              </p>
            )}
          </div>
          <div>
            <div className="relative flex items-center">
              <HiOutlineUser className="absolute left-3 w-5 h-5 pointer-events-none opacity-80" />
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full p-3 pl-10 border ${
                  touched.email && errors.email
                    ? "border-primary-medium"
                    : "border-white"
                } transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent rounded placeholder-white bg-transparent`}
              />
            </div>
            {touched.email && errors.email && (
              <p className="text-primary-medium text-sm mt-1 pl-1">
                {errors.email}
              </p>
            )}
          </div>
          <div>
            <div className="relative flex items-center">
              <HiOutlineUser className="absolute left-3 w-5 h-5 pointer-events-none opacity-80" />
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full p-3 pl-10 border ${
                  touched.password && errors.password
                    ? "border-primary-medium"
                    : "border-white"
                } transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent rounded placeholder-white bg-transparent`}
              />
            </div>
            {touched.password && errors.password && (
              <p className="text-primary-medium text-sm mt-1 pl-1">
                {errors.password}
              </p>
            )}
          </div>
          <div>
            <div className="relative flex items-center">
              <HiOutlineUser className="absolute left-3 w-5 h-5 pointer-events-none opacity-80" />
              <label htmlFor="confirm-password" className="sr-only">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full p-3 pl-10 border ${
                  touched.confirmPassword && errors.confirmPassword
                    ? "border-primary-medium"
                    : "border-white"
                } transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent rounded placeholder-white bg-transparent`}
              />
            </div>
            {touched.confirmPassword && errors.confirmPassword && (
              <p className="text-primary-medium text-sm mt-1 pl-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={!isValid}
            className="w-full bg-white text-[#38A5FF] py-3 rounded font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
          >
            CREATE
          </button>

          <div className="text-sm text-center">
            Already have an account?
            <Link
              to="/login"
              className="underline hover:underline-offset-2 ml-1"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;
