import { SEO_NO_INDEX_META } from "@app/configs/seoConfigs";
import ResetPassword from "./ResetPassword";

export const metadata = {
  ...SEO_NO_INDEX_META,
  title: "Reset Password",
};
export default function Page() {
  return <ResetPassword />;
}
