import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
const ProfilePic = async () => {
  const session = await getServerSession(authOptions);
  return (
    <img
      src={session?.user.image}
      width={0}
      height={0}
      className="rounded-full w-7 h-7"
      name="profile-pic"
    />
  );
};

export default ProfilePic;
