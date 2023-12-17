import ExifReader from "exifreader";
import { compress } from "./compress";
const compressAndReadFileExif = async (file) => {
  let aperture = null;
  let iso = null;
  let shutterspeed = null;
  try {
    const metadata = await ExifReader.load(file);
    aperture = metadata["FNumber"]
      ? metadata["FNumber"].value[0] / metadata["FNumber"].value[1]
      : null;
    iso = metadata["ISOSpeedRatings"]?.value;
    shutterspeed = metadata["ShutterSpeedValue"]?.value;
  } catch (err) {
    // No EXIF metadata
  }

  try {
    const compressed = await compress(file, {
      maxSizeMB: 0.3,
      maxWidthOrHeight: 100,
    });

    return {
      aperture,
      shutterspeed,
      iso,
      name: file.name,
      url: URL.createObjectURL(compressed),
    };
  } catch (err) {
    console.log(err);
  }
};
export default compressAndReadFileExif;
