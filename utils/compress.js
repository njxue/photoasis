import imageCompression from "browser-image-compression";

const defaultOptions = {
  maxSizeMB: 0.3,
  useWebWorker: true,
  maxIteration: 10,
  preserveExif: true,
};

const compress = async (file, options = defaultOptions) => {
  const compressed = await imageCompression(file, {
    ...options,
    defaultOptions,
  });
  return compressed;
};
const compressMany = async (files, options = defaultOptions) => {
  files = files.map((file) => compress(file, options));
  const compressedFiles = await Promise.all(files);
  return compressedFiles;
};

export { compressMany, compress };
