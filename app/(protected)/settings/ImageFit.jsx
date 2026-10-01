"use client";

import { PLACEHOLDER_BLURHASH } from "@app/configs/imageConfigs";
import { Blurhash } from "react-blurhash";

const FitOption = ({
  objectFit = "object-cover",
  newUserPreferences,
  handleClick,
}) => {
  const selectedStyles = "border-black bg-black text-white";
  const isSelected = newUserPreferences?.objectFit === objectFit;

  return (
    <figure
      className={`flex h-[190px] w-1/2 max-w-[320px] cursor-pointer flex-col items-center border border-black/15 p-2 transition hover:border-black sm:h-[250px] ${
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
      <figcaption className="py-2 text-[10px] font-bold uppercase tracking-[0.16em]">
        {objectFit === "object-cover" ? "Cover" : "Contain"}
      </figcaption>
    </figure>
  );
};
const ImageFit = ({ newUserPreferences, setNewUserPreferences }) => {
  return (
    <section className="image-fit flex flex-col items-start">
      <p className="eyebrow">Display</p>
      <h2 className="mt-1 text-xl font-semibold sm:text-2xl">Image fit</h2>
      <p className="mt-2 max-w-lg text-sm leading-6 text-black/50">
        Choose how photographs sit inside album and gallery tiles.
      </p>
      <div className="mt-5 flex w-full flex-row items-center justify-start gap-3">
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
    </section>
  );
};

export default ImageFit;
