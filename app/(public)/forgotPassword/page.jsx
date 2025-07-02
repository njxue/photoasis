"use client";
import sendPasswordResetEmail from "@actions/sendPasswordResetEmail";
import Input from "@app/common/Input";
import SubmitButton from "@app/common/SubmitButton";
import { toast } from "react-toastify";
import FormContainer from "../components/FormContainer";
import Link from "next/link";
import { PAGE_ROUTE_LOGIN } from "@utils/pageRoutes";

const ForgotPassword = () => {
  const handleSubmit = async (formData) => {
    const email = formData.get("email");

    const res = await sendPasswordResetEmail(email);
    if (res.success) {
      toast.success("A password reset link has been sent to your email");
    } else {
      toast.error(res.error);
    }
  };

  return (
    <FormContainer>
      <h1 className="text-2xl font-semibold">Forgot your password?</h1>
      <p className="text-sm mt-1 text-neutral-500">
        Enter your email and we'll send you a link to reset your password
      </p>
      <form action={handleSubmit} className="mt-6">
        <Input
          type="email"
          name="email"
          placeholder="Email"
          label="Email"
          required
        />
        <SubmitButton text="Reset my password" disableDuration={30} />
      </form>
      <Link
        href={PAGE_ROUTE_LOGIN}
        className="text-center text-sm font-semibold text-sky-600 hover:text-sky-800 hover:underline transition-all mt-6">
        Back to login
      </Link>
    </FormContainer>
  );
};

export default ForgotPassword;
