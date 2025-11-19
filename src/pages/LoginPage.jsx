import { useMemo, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaAmazon } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import FormInput from "../components/FormInput";

function LoginPage() {
  const navigate = useNavigate();
  const callLoginApi = useCallback(
    (values) => {
      console.log("Logging in with:", values.username, values.password);
      navigate("/");
    },
    [navigate]
  );

  const validationSchema = useMemo(
    () =>
      Yup.object({
        username: Yup.string().required("Username is required"),
        password: Yup.string()
          .required("Password is required")
          .min(8, "Password must be at least 8 characters long"),
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
      password: "",
    },
    onSubmit: callLoginApi,
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
        <h1 className="text-2xl font-bold text-center">
          Login to Your Account
        </h1>

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

          <div className="text-sm text-center">
            <Link to="/forgot-password" className="hover:underline">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={!isValid}
            className="w-full bg-white text-[#38A5FF] py-3 rounded font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
          >
            LOGIN
          </button>

          <div className="text-sm text-center">
            Don't have an account?
            <Link
              to="/signup"
              className="underline hover:underline-offset-2 ml-1"
            >
              SignUp
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
