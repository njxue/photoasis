"use client";

import sendEmailVerification from "@actions/sendEmailVerification";
import Input from "@app/common/Input";
import SubmitButton from "@app/common/SubmitButton";
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
    <div className="border border-black p-3">
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
    </div>
  );
};

export default ResendEmailVerificationForm;
