"use client";

import sendEmailVerification from "@actions/sendEmailVerification";
import FormContainer from "@app/(public)/components/FormContainer";
import Input from "@app/common/Input";
import SubmitButton from "@app/common/SubmitButton";
import Link from "next/link";
import { toast } from "react-toastify";

const ResendEmailVerificationForm = () => {
  const handleSubmit = async (formData) => {
    const email = formData.get("email");

    const res = await sendEmailVerification(email);
    if (res.success) {
      toast.success("A link has been sent to your email");
    } else {
      toast.error(res.error);
    }
  };

  return (
    <FormContainer>
      <div
        className={`bg-red-100 p-2 rounded-sm border border-red-300 text-red-800`}>
        <p className="font-semibold">Link is invalid or has expired</p>
        <p className="text-sm">
          Enter your email to request for a new verification link
        </p>
      </div>

      <form action={handleSubmit} className="mt-6">
        <Input
          type="email"
          name="email"
          placeholder="Email"
          label="Email"
          required
        />
        <SubmitButton text="Resend" disableDuration={30} />
      </form>
      <Link
        href="/login"
        className="text-center text-sm font-semibold text-sky-600 hover:text-sky-800 hover:underline transition-all mt-6">
        Back to login
      </Link>
    </FormContainer>
  );
};

export default ResendEmailVerificationForm;
