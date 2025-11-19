import { useMemo, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaAmazon } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import FormInput from "../components/FormInput";

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
          <FormInput
            id="username"
            name="username"
            type="text"
            placeholder="Username"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.username}
            touched={touched.username}
          />

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

          <FormInput
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.password}
            touched={touched.password}
          />

          <FormInput
            id="confirm-password"
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.confirmPassword}
            touched={touched.confirmPassword}
          />

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
