"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Tab = ({ path, icon }) => {
  const pathName = usePathname();
  const activeStyles = "filter invert hue-rotate-180 brightness-200";
  return (
    <Link href={path}>
      <img
        src={`/assets/icons/${icon}.svg`}
        alt={icon}
        className={`${
          pathName === path && activeStyles
        } hover:opacity-50 w-[25px] md:w-[30px]`}
      />
    </Link>
  );
};

export default Tab;
