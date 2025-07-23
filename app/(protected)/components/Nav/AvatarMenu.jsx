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
      <button onClick={() => setIsVisible(true)}>
        <img
          src={avatar}
          width={28}
          height={28}
          className="rounded-full w-7 h-7"
          name="avatar"
          alt="profile avatar"
        />
      </button>
      {isVisible && (
        <menu
          className="absolute shadow-lg bg-white border border-gray-400 rounded-sm w-[150px] p-1 top-full mt-3 right-0 md:top-auto md:mt-0 md:right-auto md:bottom-full md:mb-3"
          ref={menuRef}>
          <li>
            <div className="w-full hover:bg-gray-200 p-2 rounded-md">
              <Link href={PAGE_ROUTE_SETTINGS}>
                <div
                  onClick={() => setIsVisible(false)}
                  className="flex items-center gap-2 w-full">
                  <img
                    width={22}
                    src="/assets/icons/settings.svg"
                    alt="settings"
                  />
                  <p className="font-semibold text-sm">Settings</p>
                </div>
              </Link>
            </div>
          </li>
          <li>
            <div className="w-full hover:bg-gray-200 p-2 rounded-md">
              <Logout />
            </div>
          </li>
        </menu>
      )}
    </div>
  );
};

export default AvatarMenu;
