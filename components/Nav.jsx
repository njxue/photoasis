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
    <div className="w-full bg-teal-500 h-10 text-white p-2 flex flex-row justify-between">
      <h1>Photoapp</h1>
      {session?.user ? (
        <>
          <Image
            src={session?.user.image}
            width={30}
            height={30}
            className="rounded-full"
            alt="profile-pic"
          />
          <button onClick={signOut}>Sign out</button>
        </>
      ) : (
        <>
          {providers &&
            Object.values(providers).map((provider) => (
              <button onClick={() => signIn(provider.id)}>
                Sign in using {provider.id}
              </button>
            ))}
        </>
      )}
    </div>
  );
};

export default Nav;
