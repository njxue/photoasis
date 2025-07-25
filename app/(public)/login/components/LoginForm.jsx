"use client";
import Input from "@app/common/Input";
import SubmitButton from "@app/common/SubmitButton";
import ProviderSignInButton from "@app/(public)/components/ProviderSignInButton";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  PAGE_ROUTE_DASHBOARD,
  PAGE_ROUTE_FORGOT_PASSWORD,
  PAGE_ROUTE_REGISTER,
} from "@utils/pageRoutes";

const LoginForm = ({ providers }) => {
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");
  const registrationFlow = searchParams.get("registrationFlow");

  const redirectedFromRegistration = registrationFlow === "true";

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

    const redirectUrl = redirectTo ?? PAGE_ROUTE_DASHBOARD;
    router.push(redirectUrl);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {redirectedFromRegistration && (
        <div
          className={`bg-green-100 p-2 rounded-sm border border-green-300 text-green-800`}>
          <p className="font-semibold">A link has been sent to your email</p>
          <p className="text-sm">
            Please click on the link in the email to verify and activate your
            account
          </p>
        </div>
      )}
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
            href={PAGE_ROUTE_FORGOT_PASSWORD}
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
      </div>
      <p className="text-sm text-neutral-500">
        Don&apos;t have an account?&nbsp;
        <Link
          href={PAGE_ROUTE_REGISTER}
          className="font-semibold text-sky-600 hover:text-sky-800 hover:underline transition-all">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
