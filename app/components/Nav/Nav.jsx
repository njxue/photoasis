import Tab from "./Tab";
import Logout from "./Logout";
import ProfilePic from "./ProfilePic";

const Nav = ({}) => {
  return (
    <div className="flex flex-row justify-between items-center w-full h-full bg-white p-2 shadow-gray-300 shadow-md md:flex-col md:border-b-black">
      <Tab path="/" icon="home" />
      <div className="flex flex-row gap-5 md:flex-col md:justify-between md:h-1/2">
        <div className="flex flex-row gap-3 md:flex-col">
          <Tab path="/album/new" icon="add-album" />
          <Tab path="/gallery" icon="gallery" />
        </div>
        <div className="flex flex-row justify-between items-center gap-3 md:flex-col">
          <ProfilePic />
          <Logout />
        </div>
      </div>
    </div>
  );
};

export default Nav;
