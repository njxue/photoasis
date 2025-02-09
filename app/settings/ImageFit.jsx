"use client";

import updateUserPreferences from "@actions/updateUserPreferences";
import Photo from "@app/common/Cards/Photo";
import { useUserPreferences } from "@app/UserPreferencesContext";

const FitOption = ({
  objectFit = "object-cover",
  userPreferences,
  setUserPreferences,
}) => {
  const selectedStyles = "border-black";
  const isSelected = userPreferences?.objectFit === objectFit;

  const handleClick = async () => {
    setUserPreferences({ ...userPreferences, objectFit: objectFit });
    await updateUserPreferences({ objectFit });
  };

  return (
    <div
      className={`flex flex-col items-center cursor-pointer hover:opacity-50 transition-opacity w-1/2 max-w-[300px] h-[120px] xs:h-[170px] sm:h-[220px] p-2 border-2 ${
        isSelected && selectedStyles
      }`}
      onClick={handleClick}>
      <div className="relative w-full h-full">
        <Photo src="/assets/images/placeholder.jpg" objectFit={objectFit} />
      </div>
      <p className="mt-2 font-semibold text-lg">
        {objectFit === "object-cover" ? "Cover" : "Contain"}
      </p>
    </div>
  );
};
const ImageFit = () => {
  const { userPreferences, setUserPreferences } = useUserPreferences();
  console.log(userPreferences);

  return (
    <div className="flex flex-col items-start">
      <p className="text-xl">Image fit</p>
      <div className="flex flex-row items-center justify-start gap-3 xs:gap-5 mt-5 w-full">
        <FitOption
          objectFit="object-contain"
          userPreferences={userPreferences}
          setUserPreferences={setUserPreferences}
        />
        <FitOption
          objectFit="object-cover"
          userPreferences={userPreferences}
          setUserPreferences={setUserPreferences}
        />
      </div>
    </div>
  );
};

export default ImageFit;
