import { BASE_URL } from "@app/configs/emailConfigs";
import { PAGE_ROUTE_RESET_PASSWORD } from "@utils/pageRoutes";

const ResetPasswordTemplate = (token) => {
  const resetLink = `${BASE_URL}${PAGE_ROUTE_RESET_PASSWORD}?token=${token}`;
  return (
    <div>
      <h1>Welcome to Photoasis!</h1>
      <p>
        We received a request to reset your password for your Photoasis account.
        Click the button below to set a new password. This link will expire in
        <strong> 5 minutes</strong>.
      </p>

      <a
        href={resetLink}
        className="bg-zinc-900 text-white mt-2 py-2 px-10 rounded-sm inline-block">
        Reset Password
      </a>
    </div>
  );
};

export default ResetPasswordTemplate;
