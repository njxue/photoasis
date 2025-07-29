"use client";

import { useRef } from "react";
import Logout from "./Logout";
import Link from "next/link";
import useClickOutside from "@app/common/hooks/useClickOutside";
import { PAGE_ROUTE_ARCHIVED, PAGE_ROUTE_SETTINGS } from "@utils/pageRoutes";

const AvatarMenu = ({ avatar }) => {
  const menuRef = useRef(null);
  const { isVisible, setIsVisible } = useClickOutside(menuRef);
  const menuItemClassNames = "w-full hover:bg-gray-200 p-2 rounded-md";

  const handleClickMenuItem = () => setIsVisible(false);

  return (
    <div className="relative flex-col items-center justify-center">
      <button
        onClick={() => setIsVisible(true)}
        className="flex justify-center">
        <img
          src={avatar}
          width={28}
          height={28}
          className="rounded-full"
          name="avatar"
          alt="profile avatar"
        />
      </button>
      {isVisible && (
        <menu
          className="absolute shadow-lg bg-white border border-gray-400 rounded-sm w-[150px] p-1 top-full mt-3 right-0 md:top-auto md:mt-0 md:right-auto md:bottom-full md:mb-3"
          ref={menuRef}>
          <li>
            <div className={menuItemClassNames} onClick={handleClickMenuItem}>
              <Link href={PAGE_ROUTE_SETTINGS}>
                <div className="flex items-center gap-2 w-full">
                  <img
                    width={22}
                    src="/assets/icons/settings.svg"
                    alt="settings"
                  />
                  <span className="font-semibold text-sm">Settings</span>
                </div>
              </Link>
            </div>
          </li>
          <li>
            <div className={menuItemClassNames} onClick={handleClickMenuItem}>
              <Link href={PAGE_ROUTE_ARCHIVED}>
                <div className="flex items-center gap-2 w-full">
                  <img
                    width={22}
                    src="/assets/icons/archive-down.svg"
                    alt="archive"
                  />
                  <span className="font-semibold text-sm">Archived</span>
                </div>
              </Link>
            </div>
          </li>
          <li>
            <div className={menuItemClassNames} onClick={handleClickMenuItem}>
              <Logout />
            </div>
          </li>
        </menu>
      )}
    </div>
  );
};

export default AvatarMenu;
