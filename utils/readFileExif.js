import ExifReader from "exifreader";
const readFileExif = async (file) => {
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
  return {
    aperture,
    shutterspeed,
    iso,
    name: file.name,
    url: URL.createObjectURL(file),
  };
};
export default readFileExif;
