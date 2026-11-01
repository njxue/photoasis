import imageCompression, { type Options } from "browser-image-compression";

const defaultOptions: Options = {
  maxSizeMB: 0.3,
  useWebWorker: true,
  maxIteration: 10,
  preserveExif: true,
};

const compress = async (file: File, options: Options = defaultOptions) => {
  const compressed = await imageCompression(file, {
    ...defaultOptions,
    ...options,
  });
  return compressed;
};
const compressMany = async (files: File[], options: Options = defaultOptions) => {
  const compressionPromises = files.map((file) => compress(file, options));
  const compressedFiles = await Promise.all(compressionPromises);
  return compressedFiles;
};

export { compressMany, compress };
