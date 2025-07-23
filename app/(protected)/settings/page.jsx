import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import Settings from "./Settings";
const Page = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return (
    <div className="h-full flex flex-col p-3">
      <header className="page-heading">
        <h1>Settings</h1>
      </header>
      <Settings user={user} />
    </div>
  );
};

export default Page;
