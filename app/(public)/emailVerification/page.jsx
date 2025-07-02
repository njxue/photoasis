import jwt from "jsonwebtoken";
import prisma from "@prisma/prisma";
import Link from "next/link";
import ResendEmailVerificationForm from "./components/ResendEmailVerificationForm";
import { PAGE_ROUTE_LOGIN } from "@utils/pageRoutes";

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
          <Link href={PAGE_ROUTE_LOGIN}>
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

async function verifyUser(email) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return { success: false, error: "User not found" };
    }

    await prisma.user.update({
      where: {
        email,
      },
      data: {
        isVerified: true,
      },
    });

    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: String(error) };
  }
}

export default EmailVerification;
