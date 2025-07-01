import Link from "next/link";
import TrialDroppableFileInput from "./components/TrialDroppableFileInput";

const Landing = async () => {
  return (
    <div className="flex items-center justify-between h-full w-full px-8">
      <div className="flex flex-col items-start px-8 md:w-1/2">
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

      <TrialDroppableFileInput />
    </div>
  );
};

export default Landing;
