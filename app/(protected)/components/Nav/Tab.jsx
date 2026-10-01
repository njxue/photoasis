"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Tab = ({ path, icon, label }) => {
  const pathName = usePathname();
  const isActive = pathName === path;

  return (
    <Link
      href={path}
      aria-current={isActive ? "page" : undefined}
      className={`group flex min-w-[64px] flex-col items-center gap-1 px-3 py-2 text-[9px] font-bold uppercase tracking-[0.14em] transition-colors md:min-w-0 md:flex-row md:gap-3 md:px-3 md:py-3 md:text-xs md:normal-case md:tracking-normal ${
        isActive
          ? "bg-black text-white"
          : "text-black/55 hover:bg-black/[0.04] hover:text-black"
      }`}>
      <img
        src={`/assets/icons/${icon}.svg`}
        alt=""
        className={`h-5 w-5 object-contain transition ${
          isActive ? "invert" : "opacity-65 group-hover:opacity-100"
        }`}
      />
      <span>{label}</span>
    </Link>
  );
};

export default Tab;
