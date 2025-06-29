import Link from "next/link";
import Nav from "./components/Nav";

const Landing = async () => {
  return (
    <div className="flex flex-col items-start z-50">
      <h1 className="font-bold text-3xl lg:text-4xl animate-fadeIn">
        Photos that show the whole picture
      </h1>
      <p className="mt-3 text-lg animate-fadeIn">
        Upload, organize, and view your photos with their camera settings — no
        compression, no loss.
      </p>
      <Link href="/register">
        <button className="bg-zinc-900  text-white font-semibold text-lg py-2 px-6 rounded-sm shadow mt-5 hover:bg-orange-500 transition-all animate-fadeInAndSlideUp">
          Get started
        </button>
      </Link>
    </div>
  );
};

export default Landing;
