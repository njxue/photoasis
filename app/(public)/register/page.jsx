import { getProviders } from "next-auth/react";
import RegisterForm from "./components/RegisterForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const Register = async () => {
  const session = await getServerSession(authOptions);

  const isLoggedIn = !!session?.user;

  if (isLoggedIn) {
    redirect("/dashboard");
  }

  const providers = await getProviders();
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex flex-col w-[400px] border border-black p-4 rounded">
        <h1 className="font-bold text-3xl font-inter mb-10">Register</h1>
        <RegisterForm providers={providers} />
      </div>
    </div>
  );
};

export default Register;
