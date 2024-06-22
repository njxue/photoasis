import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { QUALITY_LOW } from "@app/common/Image/constants";
import OptimisedImage from "@app/common/Image/OptimisedImage";
import { getServerSession } from "next-auth";
const ProfilePic = async () => {
  const session = await getServerSession(authOptions);
  return (
    <OptimisedImage
      src={session?.user.image}
      width={0}
      height={0}
      className="rounded-full w-7 h-7"
      name="profile-pic"
      quality={QUALITY_LOW}
    />
  );
};

export default ProfilePic;
