"use client";

import Photo from "@app/(protected)/components/Cards/Photo";

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
        <Photo
          src="/assets/images/placeholder.jpg"
          objectFit={objectFit}
          isLocal
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
