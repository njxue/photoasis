"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { PAGE_ROUTE_LOGIN, PAGE_ROUTE_REGISTER } from "@utils/pageRoutes";

const Nav = () => {
  const pathname = usePathname();

  const linkHref =
    pathname === PAGE_ROUTE_LOGIN ? PAGE_ROUTE_REGISTER : PAGE_ROUTE_LOGIN;
  const buttonText = pathname === PAGE_ROUTE_LOGIN ? "Sign up" : "Sign in";

  return (
    <header className="flex items-center justify-between w-full h-[70px] px-4 z-50">
      <Link href="/">
        <img
          src="/assets/images/logoNew.png"
          className="w-10 cursor-pointer"
          alt="photoasisLogo"
        />
      </Link>

      <Link
        href={linkHref}
        className="text-white font-semibold bg-zinc-900 py-2 px-6 rounded-sm shadow hover:bg-zinc-700 transition-all">
        {buttonText}
      </Link>
    </header>
  );
};

export default Nav;
