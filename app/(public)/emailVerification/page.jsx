import verifyUser from "@actions/verifyUser";
import jwt from "jsonwebtoken";
import Link from "next/link";
import ResendEmailVerificationForm from "./components/ResendEmailVerificationForm";

const EmailVerification = async ({ searchParams }) => {
  const { token } = searchParams;

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const { email } = payload;

    const res = await verifyUser(email);

    if (!res?.success) {
      return <ResendEmailVerificationForm />;
    }

    return (
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold">Account activated!</h1>
        <p>
          Click&nbsp;
          <Link href="/login">
            <span className="font-semibold text-sky-600 hover:text-sky-800 hover:underline transition-all ">
              here
            </span>
          </Link>
          &nbsp;to log in
        </p>
      </div>
    );
  } catch (err) {
    console.log(err);
    return <ResendEmailVerificationForm />;
  }
};

export default EmailVerification;
