import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import ImageFit from "./ImageFit";
import CancelButton from "@app/(protected)/components/CancelButton";
import Settings from "./Settings";
const Page = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return (
    <div className="h-full flex flex-col">
      <div className="page-heading">Settings</div>
      <Settings user={user} />
    </div>
  );
};

export default Page;
