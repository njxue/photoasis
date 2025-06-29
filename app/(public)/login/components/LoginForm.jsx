"use client";
import Input from "@app/common/Input";
import SubmitButton from "@app/common/SubmitButton";
import ProviderSignInButton from "@app/(public)/components/ProviderSignInButton";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
        setError(res.error);
      } else {
        toast.error(res.error);
      }
      return;
    }
    router.push("/dashboard");
  };

  return (
    <div>
      <form action={handleLogin}>
        <Input
          type="email"
          name="email"
          label="Email"
          placeholder="Email"
          error={error}
        />
        <Input
          type="password"
          name="password"
          label="Password"
          placeholder="Password"
        />
        <SubmitButton text="Sign in" />
      </form>
      <div className="mt-10 w-full">
        {thirdPartyProviders.map((provider) => (
          <ProviderSignInButton provider={provider} key={provider.id} />
        ))}
      </div>
    </div>
  );
};

export default LoginForm;
