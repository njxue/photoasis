import imageCompression from "browser-image-compression";

const compress = async (files)  => {
  files = files.map(async (file) => {
    const compressed = await imageCompression(file, {
      maxSizeMB: 0.3,
    });
    return compressed;
  });
  const compressedFiles = await Promise.all(files);
  return compressedFiles;
};

export default compress;
