"use client";

import { PLACEHOLDER_BLURHASH } from "@app/configs/imageConfigs";
import { Blurhash } from "react-blurhash";

const FitOption = ({
  objectFit = "object-cover",
  newUserPreferences,
  handleClick,
}) => {
  const selectedStyles = "border-black";
  const isSelected = newUserPreferences?.objectFit === objectFit;

  return (
    <div
      className={`flex flex-col items-center cursor-pointer hover:opacity-50 transition-opacity w-1/2 max-w-[300px] h-[170px] sm:h-[220px] p-2 border-2 ${
        isSelected && selectedStyles
      }`}
      onClick={handleClick}>
      <div className="relative w-full h-full">
        <Blurhash
          width="100%"
          height="100%"
          hash={PLACEHOLDER_BLURHASH}
          punch={1}
          resolutionX={32}
          resolutionY={32}
        />
        <img
          src="/assets/images/placeholder.jpg"
          className={`h-full w-full absolute top-0 ${objectFit}`}
          alt={`${objectFit} option`}
        />
      </div>
      <p className="mt-2 font-semibold text-sm">
        {objectFit === "object-cover" ? "Cover" : "Contain"}
      </p>
    </div>
  );
};
const ImageFit = ({ newUserPreferences, setNewUserPreferences }) => {
  return (
    <div className="flex flex-col items-start">
      <p className="text-base sm:text-xl">Image fit</p>
      <div className="flex flex-row items-center justify-start gap-1 mt-2 w-full">
        <FitOption
          objectFit="object-contain"
          handleClick={() =>
            setNewUserPreferences({
              ...newUserPreferences,
              objectFit: "object-contain",
            })
          }
          newUserPreferences={newUserPreferences}
        />
        <FitOption
          objectFit="object-cover"
          handleClick={() =>
            setNewUserPreferences({
              ...newUserPreferences,
              objectFit: "object-cover",
            })
          }
          newUserPreferences={newUserPreferences}
        />
      </div>
    </div>
  );
};

export default ImageFit;
