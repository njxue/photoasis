"use client";

import { useRef } from "react";
import Logout from "./Logout";
import Link from "next/link";
import useClickOutside from "@app/common/hooks/useClickOutside";
import { PAGE_ROUTE_SETTINGS } from "@utils/pageRoutes";

const AvatarMenu = ({ avatar, name }) => {
  const menuRef = useRef(null);
  const { isVisible, setIsVisible } = useClickOutside(menuRef);

  return (
    <div className="relative flex items-center justify-center md:block">
      <button
        onClick={() => setIsVisible(true)}
        className="flex items-center gap-3 md:w-full md:px-2 md:py-2"
        aria-label="Open account menu">
        {avatar ? (
          <img
            src={avatar}
            width={32}
            height={32}
            className="h-8 w-8 rounded-full object-cover ring-1 ring-black/10"
            name="avatar"
            alt="profile avatar"
          />
        ) : (
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-xs font-bold text-white">
            {name?.charAt(0)?.toUpperCase() ?? "P"}
          </span>
        )}
        <span className="hidden min-w-0 text-left md:block">
          <span className="block truncate text-xs font-semibold">
            {name ?? "Account"}
          </span>
          <span className="block text-[10px] uppercase tracking-[0.14em] text-black/45">
            Account
          </span>
        </span>
      </button>
      {isVisible && (
        <menu
          className="absolute bottom-full right-0 mb-3 w-44 border border-black bg-white p-1 shadow-[6px_6px_0_rgba(0,0,0,0.12)] md:bottom-0 md:left-full md:right-auto md:mb-0 md:ml-4"
          ref={menuRef}>
          <li>
            <div className="w-full p-2 hover:bg-black/[0.05]">
              <Link href={PAGE_ROUTE_SETTINGS}>
                <div
                  onClick={() => setIsVisible(false)}
                  className="flex w-full items-center gap-2">
                  <img
                    width={22}
                    src="/assets/icons/settings.svg"
                    alt="settings"
                  />
                <p className="text-xs font-semibold">Settings</p>
                </div>
              </Link>
            </div>
          </li>
          <li>
            <div className="w-full p-2 hover:bg-black/[0.05]">
              <Logout />
            </div>
          </li>
        </menu>
      )}
    </div>
  );
};

export default AvatarMenu;
