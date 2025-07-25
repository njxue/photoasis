import Tab from "./Tab";
import AvatarMenu from "./AvatarMenu";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import {
  PAGE_ROUTE_DASHBOARD,
  PAGE_ROUTE_GALLERY,
  PAGE_ROUTE_NEW_ALBUM,
} from "@utils/pageRoutes";

const Nav = async () => {
  const session = await getServerSession(authOptions);
  return (
    <nav className="flex flex-row justify-between items-center gap-3 w-full h-full bg-white p-2 shadow-gray-300 shadow-md md:flex-col  md:border-b-black">
      <Tab path={PAGE_ROUTE_DASHBOARD} icon="home" />
      <div className="flex flex-row gap-5 items-center grow justify-end md:justify-center md:flex-col md:h-1/2">
        <div className="flex flex-row gap-3 md:flex-col">
          <Tab path={PAGE_ROUTE_NEW_ALBUM} icon="add-album" />
          <Tab path={PAGE_ROUTE_GALLERY} icon="gallery" />
        </div>
      </div>
      <AvatarMenu avatar={session?.user.image} />
    </nav>
  );
};

export default Nav;
