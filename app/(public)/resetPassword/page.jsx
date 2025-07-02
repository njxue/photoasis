"use client";
import { resetPassword } from "@actions/resetPassword";
import Input from "@app/common/Input";
import SubmitButton from "@app/common/SubmitButton";
import { useSearchParams } from "@node_modules/next/navigation";
import { confirmPasswordSchema } from "@zodSchema/confirmPasswordSchema";
import { useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import FormContainer from "../components/FormContainer";
import Link from "next/link";
import { PAGE_ROUTE_LOGIN } from "@utils/pageRoutes";

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [state, formAction] = useFormState(async (_prevState, formData) => {
    const password = formData.get("password");
    const res = await resetPassword(token, password);
    if (res.success) {
      toast.success("Your password has been reset");
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

    const result = confirmPasswordSchema.safeParse(data);
    if (!result.success) {
      e.preventDefault();
      setErrors(result.error.flatten().fieldErrors);
    } else {
      setErrors({});
    }
  };

  return (
    <FormContainer>
      <h1 className="text-2xl font-semibold">Reset password</h1>

      <form onSubmit={handleSubmit} action={formAction} className="mt-6">
        <Input
          type="password"
          name="password"
          placeholder="New Password"
          label="New Password"
          error={state?.validationError || errors?.password?.[0]}
          required
        />
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirm new password"
          label="Confirm new password"
          error={errors?.confirmPassword?.[0]}
          required
        />
        <SubmitButton
          text={state?.success ? "Password has been reset" : "Reset password"}
          disabled={state?.success}
        />
      </form>
      <Link
        href={PAGE_ROUTE_LOGIN}
        className="text-center text-sm font-semibold text-sky-600 hover:text-sky-800 hover:underline transition-all mt-6">
        Back to login
      </Link>
    </FormContainer>
  );
};

export default ResetPassword;
