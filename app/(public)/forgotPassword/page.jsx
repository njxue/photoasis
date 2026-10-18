import ForgotPassword from "./ForgotPassword";

export const metadata = {
  title: "Reset Password",
  robots: {
    index: false,
    follow: true,
  },
};

export default function Page() {
  return <ForgotPassword />;
}
