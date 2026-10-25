import { getServerSession } from "next-auth";
import { authOptions } from "@auth/options";
import Settings from "./Settings";

export const metadata = {
  title: "Settings",
};

const Page = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return (
    <div className="protected-page flex min-h-screen flex-col">
      <header className="mb-8 border-b border-black/15 pb-5">
        <p className="eyebrow">Preferences</p>
        <h1 className="page-title">Settings</h1>
      </header>
      <Settings user={user} />
    </div>
  );
};

export default Page;
