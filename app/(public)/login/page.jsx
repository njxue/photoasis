import { getProviders } from "next-auth/react";

import LoginForm from "./components/LoginForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const Login = async () => {
  const session = await getServerSession(authOptions);

  const isLoggedIn = !!session?.user;

  if (isLoggedIn) {
    redirect("/dashboard");
  }

  const providers = await getProviders();
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex flex-col w-[400px] border border-black p-4 rounded">
        <h1 className="font-bold text-3xl font-inter mb-10">Welcome back</h1>
        <LoginForm providers={providers} />
      </div>
    </div>
  );
};

export default Login;
