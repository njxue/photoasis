"use client";

import { getProviders, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const Nav = ({}) => {
  const { data: session } = useSession();

  const path = usePathname();
  console.log(path);

  return (
    <div className="flex flex-row justify-between items-center w-full h-full bg-white p-2 shadow-gray-300 shadow-md md:flex-col md:border-b-black">
      <Link href="/">
        <img
          src="/assets/icons/home.svg"
          className={`${
            path === "/" && "filter invert hue-rotate-180 brightness-200"
          } hover:opacity-50`}
          width={30}
        />
      </Link>
      <div className="flex flex-row gap-5 md:flex-col md:justify-between md:h-1/2">
        <div className="flex flex-row gap-3 md:flex-col">
          <Link href="/album/new">
            <img
              src="/assets/icons/add-album.svg"
              className={`${
                path === "/album/new" &&
                "filter invert hue-rotate-180 brightness-200"
              } hover:opacity-50`}
              width={30}
            />
          </Link>
          <Link href="/photos">
            <img
              src="/assets/icons/gallery.svg"
              className={`${
                path === "/photos" &&
                "filter invert hue-rotate-180 brightness-200"
              } hover:opacity-50`}
              width={30}
            />
          </Link>
        </div>
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
    </div>
  );
};

export default Nav;
