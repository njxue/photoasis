import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import ImageFit from "./ImageFit";
const Page = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return (
    <div className="">
      <div className="page-heading">Settings</div>
      <div className="flex flex-col gap-5 p-3">
        <div className="flex items-center justify-start gap-5 mt-5">
          <img src={user?.image} className="rounded-full" />
          <div>
            <p className="text-2xl font-semibold">{user?.name}</p>
            <p className="text-md">{user?.email}</p>
          </div>
        </div>
        <ImageFit />
      </div>
    </div>
  );
};

export default Page;
