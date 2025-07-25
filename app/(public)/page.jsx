import Link from "next/link";
import TrialDroppableFileInput from "./components/TrialDroppableFileInput";
import Tooltip from "@app/common/Tooltip";
import { PAGE_ROUTE_REGISTER } from "@utils/pageRoutes";

const Landing = async () => {
  return (
    <div className="flex items-center justify-between h-full w-full px-8">
      <section className="flex flex-col items-start px-8 md:w-1/2">
        <h1 className="font-bold text-3xl lg:text-4xl animate-fadeIn">
          Photos that show the{" "}
          <span className="bg-gradient-to-r from-[#6366f1] via-[#06b6d4] to-[#3b82f6] animate-bg-gradient bg-clip-text text-transparent">
            whole picture
          </span>
        </h1>
        <p className="mt-3 text-lg animate-fadeIn">
          Upload, organize, and view your photos with their camera settings.
        </p>
        <span>
          <Tooltip tooltip="Upload and download photos without losing any quality">
            <strong className="underline decoration-dotted">
              No compression
            </strong>
          </Tooltip>
          <span>, no loss!</span>
        </span>

        <Link
          href={PAGE_ROUTE_REGISTER}
          className="bg-zinc-900 text-white font-semibold text-lg py-2 px-6 rounded-sm shadow mt-5 hover:bg-teal-700 transition-all animate-fadeInAndSlideUp">
          Get started
        </Link>
      </section>

      <TrialDroppableFileInput />
    </div>
  );
};

export default Landing;
