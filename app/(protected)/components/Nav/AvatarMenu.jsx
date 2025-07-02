"use client";

import { useRef } from "react";
import Logout from "./Logout";
import Link from "next/link";
import useClickOutside from "@app/common/hooks/useClickOutside";
import { PAGE_ROUTE_SETTINGS } from "@utils/pageRoutes";

const AvatarMenu = ({ avatar }) => {
  const menuRef = useRef(null);
  const { isVisible, setIsVisible } = useClickOutside(menuRef);

  return (
    <div className="relative flex-col items-center justify-center">
      <img
        src={avatar}
        width={0}
        height={0}
        className="rounded-full w-7 h-7 cursor-pointer"
        name="avatar"
        alt="profile avatar"
        onClick={() => setIsVisible(true)}
      />
      {isVisible && (
        <div
          className="absolute shadow-lg bg-white border border-gray-400 rounded-sm w-[150px] p-1 top-full mt-3 right-0 md:top-auto md:mt-0 md:right-auto md:bottom-full md:mb-3"
          ref={menuRef}>
          <div className="w-full hover:bg-gray-200 p-2 rounded-md">
            <Link href={PAGE_ROUTE_SETTINGS}>
              <button
                onClick={() => setIsVisible(false)}
                className="flex items-center gap-2 w-full">
                <img
                  width={22}
                  src="/assets/icons/settings.svg"
                  alt="settings"
                />
                <p className="font-semibold text-sm">Settings</p>
              </button>
            </Link>
          </div>
          <div className="w-full hover:bg-gray-200 p-2 rounded-md">
            <Logout />
          </div>
        </div>
      )}
    </div>
  );
};

export default AvatarMenu;
