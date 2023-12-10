"use client";

import { getProviders, signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

const Nav = ({}) => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <div className="w-full bg-teal-500 h-10 text-white p-2 flex flex-row justify-between items-center">
      <h1>Photoapp</h1>
      <div className="flex flex-row justify-between items-center gap-3">
        <Image
          src={session?.user.image}
          width={0}
          height={0}
          className="rounded-full w-7 h-7"
          alt="profile-pic"
        />
        <button onClick={signOut}>
          <img width={25} src="/assets/icons/logout.svg" />
        </button>
      </div>
    </div>
  );
};

export default Nav;
