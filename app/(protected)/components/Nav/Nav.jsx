import Tab from "./Tab";
import AvatarMenu from "./AvatarMenu";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import {
  PAGE_ROUTE_DASHBOARD,
  PAGE_ROUTE_GALLERY,
  PAGE_ROUTE_NEW_ALBUM,
} from "@utils/pageRoutes";
import Link from "next/link";

const Nav = async () => {
  const session = await getServerSession(authOptions);
  return (
    <nav className="flex h-full w-full items-center justify-around bg-white px-3 md:flex-col md:items-stretch md:justify-start md:px-5 md:py-7">
      <Link
        href={PAGE_ROUTE_DASHBOARD}
        className="mb-12 hidden items-center gap-3 md:flex"
        aria-label="Photoasis home">
        <span className="flex h-8 w-8 items-center justify-center bg-black text-xs font-black tracking-tighter text-white">
          P
        </span>
        <span className="text-sm font-black tracking-[0.18em]">PHOTOASIS</span>
      </Link>

      <div className="flex grow items-center justify-around gap-1 md:block md:grow-0 md:space-y-1">
        <Tab path={PAGE_ROUTE_DASHBOARD} icon="home" label="Library" />
        <Tab path={PAGE_ROUTE_GALLERY} icon="gallery" label="Gallery" />
        <Tab path={PAGE_ROUTE_NEW_ALBUM} icon="add-album" label="New album" />
      </div>

      <div className="md:mt-auto md:border-t md:border-black/10 md:pt-5">
        <AvatarMenu avatar={session?.user.image} name={session?.user.name} />
      </div>
    </nav>
  );
};

export default Nav;
