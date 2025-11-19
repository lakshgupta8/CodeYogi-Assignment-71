import { useMemo, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaAmazon } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import FormInput from "../components/FormInput";

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

          <FormInput
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.email}
            touched={touched.email}
          />

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
