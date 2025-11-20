import { useMemo, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaAmazon } from "react-icons/fa";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormInput from "../components/Input";

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

  const initialValues = {
    username: "",
    password: "",
  };

  return (
    <div
      className="flex justify-center items-center bg-cover bg-no-repeat bg-center w-full h-screen"
      style={{
        backgroundImage: 'url("/images/loginbg.svg")',
      }}
    >
      <div className="top-4 right-4 absolute">
        <Link
          to="/"
          className="text-white focus:text-gray-800 text-sm hover:underline"
        >
          Continue without login
        </Link>
      </div>

      <div className="flex flex-col gap-6 px-4 w-full max-w-md text-white">
        <FaAmazon className="mx-auto mb-6 text-9xl" />
        <h1 className="font-bold text-2xl text-center">
          Login to Your Account
        </h1>

        <Formik
          initialValues={initialValues}
          onSubmit={callLoginApi}
          validationSchema={validationSchema}
          validateOnMount
        >
          {({ isValid, isSubmitting }) => (
            <Form className="space-y-4">
              <FormInput
                id="username"
                name="username"
                type="text"
                placeholder="Username"
                autoComplete="username"
              />

              <FormInput
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                autoComplete="current-password"
              />

              <div className="text-sm text-center">
                <Link to="/forgot-password" className="hover:underline">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={!isValid || isSubmitting}
                className="bg-white disabled:opacity-60 py-3 rounded w-full font-semibold text-[#38A5FF] disabled:cursor-not-allowed"
              >
                LOGIN
              </button>

              <div className="text-sm text-center">
                Don't have an account?
                <Link
                  to="/signup"
                  className="ml-1 underline hover:underline-offset-2"
                >
                  SignUp
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default LoginPage;
