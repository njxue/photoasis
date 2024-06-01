import ExifReader from "exifreader";
import { compress } from "./compress";
const compressAndReadFileExif = async (file) => {
  let aperture = null;
  let iso = null;
  let shutterspeed = null;
  let date = null;
  let focalLength = null;
  let meteringMode = null;
  let exposureMode = null;
  let editingSoftware = null;
  let lensModel = null;
  let cameraModel = null;

  try {
    const metadata = await ExifReader.load(file);
    // Aperture
    aperture = metadata["FNumber"]
      ? metadata["FNumber"].value[0] / metadata["FNumber"].value[1]
      : null;

    // ISO
    iso = metadata["ISOSpeedRatings"]?.value;

    // Shutterspeed
    shutterspeed =
      metadata["ShutterSpeedValue"]?.description ||
      metadata["ExposureTime"]?.description;

    // Date
    const dateTimeStr = metadata["DateTimeOriginal"]?.description;
    if (dateTimeStr != null) {
      date = dateTimeStr?.split(" ")[0].replaceAll(":", "-");
    }

    // Focal length
    focalLength = metadata["FocalLength"]?.description.split(" ")[0];

    // Metering Mode
    meteringMode = metadata["MeteringMode"]?.description;

    // Exposure Mode
    exposureMode = metadata["ExposureProgram"]?.description;

    // Editing Software
    editingSoftware = metadata["Software"]?.description;

    // Lens Model
    lensModel = metadata["LensModel"]?.description;

    // Camera Model
    cameraModel = metadata["Model"]?.description;
  } catch (err) {
    // No EXIF metadata
  }

  const compressed = await compress(file, {
    maxSizeMB: 0.3,
    maxWidthOrHeight: 100,
  });

  return {
    aperture,
    shutterspeed,
    iso,
    date,
    focalLength,
    meteringMode,
    exposureMode,
    editingSoftware,
    lensModel,
    cameraModel,
    name: file.name,
    url: URL.createObjectURL(compressed),
  };
};
export default compressAndReadFileExif;
