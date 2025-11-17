import { useMemo, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaAmazon } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { useFormik } from "formik";
import * as Yup from "yup";

function ForgotPasswordPage() {
  const navigate = useNavigate();
  const callForgotPasswordApi = useCallback(
    (values) => {
      console.log("Password reset requested for:", values.email);
      alert(`Password reset link sent to ${values.email}`);
      navigate("/login");
    },
    [navigate]
  );

  const validationSchema = useMemo(
    () =>
      Yup.object({
        email: Yup.string()
          .required("Email is required")
          .email("Invalid email format"),
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
      email: "",
    },
    onSubmit: callForgotPasswordApi,
    validationSchema: validationSchema,
  });

  return (
    <div
      className="h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{
        backgroundImage: 'url("/images/loginbg.svg")',
      }}
    >
      <div className="w-full max-w-md flex flex-col px-4 gap-6 text-white">
        <FaAmazon className="text-9xl mb-6 mx-auto" />
        <h1 className="text-2xl font-bold text-center">Reset your password</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-center text-sm">
            Enter your email address and we'll send you a link to reset your
            password.
          </p>

          <div>
            <div className="relative flex items-center">
              <HiOutlineMail className="absolute left-3 w-5 h-5 pointer-events-none opacity-80" />
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

          <button
            type="submit"
            disabled={!isValid}
            className="w-full bg-white text-[#38A5FF] py-3 rounded font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
          >
            Send Link
          </button>

          <div className="text-sm text-center">
            Remember your password?{" "}
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

export default ForgotPasswordPage;
