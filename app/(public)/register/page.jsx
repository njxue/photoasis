import { getProviders } from "next-auth/react";
import RegisterForm from "./components/RegisterForm";
import FormContainer from "../components/FormContainer";

export const metadata = {
  title: "Register",
};

const Register = async () => {
  const providers = await getProviders();
  return (
    <FormContainer>
      <h1 className="font-bold text-3xl font-inter mb-10">Register</h1>
      <RegisterForm providers={providers} />
    </FormContainer>
  );
};

export default Register;
