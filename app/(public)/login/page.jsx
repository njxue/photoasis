import { getProviders } from "next-auth/react";

import LoginForm from "./components/LoginForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import FormContainer from "../components/FormContainer";

const Login = async () => {
  const session = await getServerSession(authOptions);

  const isLoggedIn = !!session?.user;

  if (isLoggedIn) {
    redirect("/dashboard");
  }

  const providers = await getProviders();
  return (
    <FormContainer>
      <h1 className="font-bold text-3xl font-inter mb-10">Welcome back</h1>
      <LoginForm providers={providers} />
    </FormContainer>
  );
};

export default Login;
