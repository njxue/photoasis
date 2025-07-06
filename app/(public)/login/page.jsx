import { getProviders } from "next-auth/react";

import LoginForm from "./components/LoginForm";
import FormContainer from "../components/FormContainer";

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
