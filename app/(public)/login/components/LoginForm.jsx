"use client";
import Input from "@app/common/Input";
import SubmitButton from "@app/common/SubmitButton";
import ProviderSignInButton from "@app/(public)/components/ProviderSignInButton";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginForm = ({ providers }) => {
  const [error, setError] = useState("");
  const router = useRouter();

  const thirdPartyProviders = Object.values(providers).filter(
    (provider) => provider.id !== "credentials"
  );

  const handleLogin = async (formData) => {
    setError("");
    const res = await signIn("credentials", {
      redirect: false,
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (!res.ok) {
      if (res.status === 401) {
        setError("Invalid email and/or password");
      } else {
        toast.error(res.error);
      }
      return;
    }
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <form action={handleLogin} className="w-full">
        <Input
          type="email"
          name="email"
          label="Email"
          placeholder="Email"
          error={error}
          required
        />
        <Input
          type="password"
          name="password"
          label="Password"
          placeholder="Password"
          required
        />
        <div className="flex flex-col items-end gap-2">
          <SubmitButton text="Sign in" />
          <Link
            href="/forgotPassword"
            className="text-xs text-neutral-500 hover:text-black hover:underline transition-all">
            Forgot password
          </Link>
        </div>
      </form>
      <div className="flex items-center w-full gap-6 text-neutral-500">
        <hr className="bg-gray-300 h-[1px] w-full" />
        <p>or</p>
        <hr className="bg-gray-300 h-[1px] w-full" />
      </div>
      <div className="w-full">
        {thirdPartyProviders.map((provider) => (
          <ProviderSignInButton provider={provider} key={provider.id} />
        ))}
      </div>{" "}
      <p className="text-sm text-neutral-500">
        Don't have an account?&nbsp;
        <Link
          href="/register"
          className="font-semibold text-sky-600 hover:text-sky-800 hover:underline transition-all">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
