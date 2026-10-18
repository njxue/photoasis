import { getProviders } from "next-auth/react";

import LoginForm from "./components/LoginForm";
import FormContainer from "../components/FormContainer";
import { PAGE_ROUTE_LOGIN } from "@utils/pageRoutes";

export const metadata = {
  title: "Login",
  alternates: {
    canonical: PAGE_ROUTE_LOGIN,
  },
};

const Login = async () => {
  const providers = await getProviders();
  return (
    <FormContainer>
      <h1 className="font-bold text-3xl font-inter mb-5">Welcome back</h1>
      <LoginForm providers={providers} />
    </FormContainer>
  );
};

export default Login;
