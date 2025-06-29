"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Nav = () => {
  const pathname = usePathname();

  const linkHref = pathname === "/login" ? "/register" : "/login";
  const buttonText = pathname === "/login" ? "Sign up" : "Sign in";

  return (
    <div className="flex items-center justify-between w-full h-[70px] px-4 z-50">
      <Link href="/">
        <img
          src="/assets/images/logoNew.png"
          className="w-10 cursor-pointer"
          alt="photoasisLogo"
        />
      </Link>

      <Link href={linkHref}>
        <button className="text-white font-semibold bg-zinc-900 py-2 px-6 rounded-sm shadow hover:bg-zinc-700 transition-all">
          {buttonText}
        </button>
      </Link>
    </div>
  );
};

export default Nav;
