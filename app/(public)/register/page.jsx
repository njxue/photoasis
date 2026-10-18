import { getProviders } from "next-auth/react";
import RegisterForm from "./components/RegisterForm";
import FormContainer from "../components/FormContainer";
import { PAGE_ROUTE_REGISTER } from "@utils/pageRoutes";

export const metadata = {
  title: "Register",
  alternates: {
    canonical: PAGE_ROUTE_REGISTER,
  },
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
