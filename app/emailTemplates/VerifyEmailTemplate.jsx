import { BASE_URL } from "@app/configs/emailConfigs";
import { PAGE_ROUTE_EMAIL_VERIFICATION } from "@utils/pageRoutes";

const VerifyEmailTemplate = (token) => {
  const activationLink = `${BASE_URL}${PAGE_ROUTE_EMAIL_VERIFICATION}?token=${token}`;
  return (
    <div>
      <h1>Welcome to Photoasis!</h1>
      <p>
        Thank you for joining Photoasis. To activate your account, please click
        on the button below to verify your email address
      </p>
      <a
        href={activationLink}
        className="bg-zinc-900 text-white mt-2 py-2 px-10 rounded-sm inline-block">
        Activate account
      </a>
    </div>
  );
};

export default VerifyEmailTemplate;
