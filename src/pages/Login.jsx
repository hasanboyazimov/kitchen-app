// rrd imports
import { Form, useActionData } from "react-router-dom";
import { Link } from "react-router-dom";

//components
import {} from "../components";
import FormInput from "../components/FormInput";
import { useEffect } from "react";

//action
export const action = async ({ request }) => {
  let formData = await request.formData();
  let email = formData.get("email");
  let pasword = formData.get("pasword");
  return { email, pasword };
};

//custom hooks
import { useRegister } from "../hooks/useRegister";
import { useLogin } from "../hooks/useLogin";

function Login() {
  const userData = useActionData();
  const { isPending, registerWithGoogle } = useRegister();
  const { isPending: isPendingLogin, signIn } = useLogin();

  useEffect(() => {
    if (userData) {
      signIn(userData.email, userData.pasword);
    }
  }, [userData]);
  return (
    <div className="auth-container">
      <div className="auth-left">
        <p className="text-7xl text-slate-100 text-center "></p>
      </div>
      <div className="auth-right">
        <Form
          method="post"
          className="flex flex-col gap-2 w-80 sm:w-96 md:w-96 lg:w-96 xl:w-96 bg-base-100 shadow-xl p-8"
        >
          <h1 className="text-3xl font-semibold text-center">Login</h1>
          <FormInput name="email" type="email" label="email" />
          <FormInput name="pasword" type="pasword" label="pasword" />
          <div className="mt-6">
            {isPendingLogin && (
              <button
                disabled
                type="button"
                className="btn btn-primary btn-block"
              >
                Loading...
              </button>
            )}
            {!isPendingLogin && (
              <button type="submit" className="btn btn-primary btn-block">
                Login
              </button>
            )}
          </div>
          <div className="w-full">
            {isPending && (
              <button type="button" className="btn btn-secondary btn-block">
                Loading...
              </button>
            )}
            {!isPending && (
              <button
                onClick={registerWithGoogle}
                className="btn btn-secondary btn-block"
              >
                Google
              </button>
            )}
          </div>
          <div className="text-center">
            <p className="text-slate-500">
              If you don't have an account,{" "}
              <Link className="link link-primary" to="/register">
                Registar
              </Link>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
