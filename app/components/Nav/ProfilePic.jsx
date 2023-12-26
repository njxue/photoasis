"use client";

import OptimisedImage from "@app/common/OptimisedImage";
import { useSession } from "next-auth/react";
const ProfilePic = () => {
  const { data: session } = useSession();
  return (
    <OptimisedImage
      src={session?.user.image}
      width={0}
      height={0}
      className="rounded-full w-7 h-7"
      alt="profile-pic"
    />
  );
};

export default ProfilePic;
