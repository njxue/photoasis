"use client";
import signUp from "@actions/signUp";
import ProviderSignInButton from "../../components/ProviderSignInButton";
import SubmitButton from "@app/common/SubmitButton";
import { useFormState } from "react-dom";
import { registerSchema } from "../../../../zodSchema/registerSchema";
import { useState } from "react";
import Input from "@app/common/Input";
import { toast } from "react-toastify";
import Link from "next/link";
import { PAGE_ROUTE_LOGIN } from "@utils/pageRoutes";

const RegisterForm = ({ providers }) => {
  const thirdPartyProviders = Object.values(providers).filter(
    (provider) => provider.id !== "credentials"
  );
  const [state, formAction] = useFormState(async (_prevState, formData) => {
    const res = await signUp(_prevState, formData);
    if (res.success) {
      toast.success("User created");
    } else {
      toast.error(res.error);
    }
    return res;
  }, {});

  // Client-side validation errors
  const [errors, setErrors] = useState();

  const handleSubmit = (e) => {
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    const result = registerSchema.safeParse(data);
    if (!result.success) {
      e.preventDefault();
      setErrors(result.error.flatten().fieldErrors);
    } else {
      setErrors({});
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <form
        action={formAction}
        onSubmit={handleSubmit}
        noValidate
        className="w-full">
        <Input
          type="email"
          name="email"
          defaultValue={state.form?.email}
          label="Email"
          placeholder="Email"
          error={state.validationErrors?.email?.[0] || errors?.email?.[0]}
          required
        />

        <Input
          type="password"
          name="password"
          defaultValue={state.form?.password}
          label="Password"
          placeholder="Password (at least 8 characters)"
          error={state.validationErrors?.password?.[0] || errors?.password?.[0]}
          required
        />
        <SubmitButton text="Sign up" />
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
        Already have an account?&nbsp;
        <Link
          href={PAGE_ROUTE_LOGIN}
          className="font-semibold text-sky-600 hover:text-sky-800 hover:underline transition-all">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
