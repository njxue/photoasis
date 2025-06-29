"use client";
import signUp from "@actions/signUp";
import ProviderSignInButton from "../../components/ProviderSignInButton";
import SubmitButton from "@app/common/SubmitButton";
import { useFormState } from "react-dom";
import { registerSchema } from "../../../../zodSchema/registerSchema";
import { useState } from "react";
import Input from "@app/common/Input";
import { toast } from "react-toastify";

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
    <div>
      <form
        action={formAction}
        onSubmit={handleSubmit}
        noValidate
        className="flex flex-col gap-2">
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

      <div className="mt-10 w-full">
        {thirdPartyProviders.map((provider) => (
          <ProviderSignInButton provider={provider} key={provider.id} />
        ))}
      </div>
    </div>
  );
};

export default RegisterForm;
