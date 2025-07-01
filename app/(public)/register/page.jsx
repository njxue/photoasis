import { getProviders } from "next-auth/react";
import RegisterForm from "./components/RegisterForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import FormContainer from "../components/FormContainer";

const Register = async () => {
  const session = await getServerSession(authOptions);

  const isLoggedIn = !!session?.user;

  if (isLoggedIn) {
    redirect("/dashboard");
  }

  const providers = await getProviders();
  return (
    <FormContainer>
      <h1 className="font-bold text-3xl font-inter mb-10">Register</h1>
      <RegisterForm providers={providers} />
    </FormContainer>
  );
};

export default Register;
