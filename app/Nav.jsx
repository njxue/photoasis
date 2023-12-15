"use client";

import { getProviders, signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import AddAlbum from "./components/AddAlbum";

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
    <div className="flex flex-row justify-between items-center w-full h-full bg-white p-2 shadow-gray-300 shadow-md md:flex-col md:border-b-black">
      <Link href="/">
        <img
          src="/assets/icons/home.svg"
          className="hover:opacity-50"
          width={30}
        />
      </Link>
      <AddAlbum />
      <div className="flex flex-row justify-between items-center gap-3 md:flex-col">
        <Image
          src={session?.user.image}
          width={0}
          height={0}
          className="rounded-full w-7 h-7"
          alt="profile-pic"
        />
        <button onClick={signOut}>
          <img width={30} src="/assets/icons/logout.svg" />
        </button>
      </div>
    </div>
  );
};

export default Nav;
