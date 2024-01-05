import ExifReader from "exifreader";
import { compress } from "./compress";
const compressAndReadFileExif = async (file) => {
  let aperture = null;
  let iso = null;
  let shutterspeed = null;
  let date = null;
  try {
    const metadata = await ExifReader.load(file);
    aperture = metadata["FNumber"]
      ? metadata["FNumber"].value[0] / metadata["FNumber"].value[1]
      : null;
    iso = metadata["ISOSpeedRatings"]?.value;
    shutterspeed = metadata["ShutterSpeedValue"]?.value;
    const dateTimeStr = metadata["DateTimeOriginal"]?.value;
    if (dateTimeStr != null) {
      date = dateTimeStr?.split(" ")[0].replaceAll(":", "-");
    }
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
    name: file.name,
    url: URL.createObjectURL(compressed),
  };
};
export default compressAndReadFileExif;
