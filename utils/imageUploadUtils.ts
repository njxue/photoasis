import ExifReader from "exifreader";
import { compress } from "./compress";
import { b2GetUploadUrls } from "@actions/b2";
import { v4 as uuidv4 } from "uuid";
import { encode } from "blurhash";
import updateAlbum from "@actions/updateAlbum";
import type { EditablePhotoData } from "@/types/photos";
import {
  MAX_SIZE_BYTES,
  IMAGE_SIZE_RESTRICTION_ENABLED,
} from "@app/configs/imageConfigs";

const imageUploadConfigs = {
  batchSize: 10,
  maxRetries: 3,
  maxCompressedSize: 0.3, // in mb
  maxCompressedWidthOrHeight: 200,
};

export interface ProcessedFile {
  rawFile: File;
  fileData: EditablePhotoData & {
    id: string;
    name: string;
    size: number;
    url: string;
    blurhash: string;
    fileId?: string;
  };
}

interface UploadPhotosResult {
  status: number;
  message: string;
}

export const formatFormData = (formData: FormData, fileList: File[]) => {
  // Use the files in fileList instead of the files in the form, because we are manually keeping track of the files
  fileList.forEach((file) => {
    formData.append(FORM_FIELDS.FILES.name, file);
  });
  return formData;
};

// Batch process to reduce load on client and reduce lag
export const processFiles = async (files: File[]): Promise<ProcessedFile[]> => {
  const batchSize = imageUploadConfigs.batchSize;
  const processedFiles: ProcessedFile[] = [];

  for (let i = 0; i < files.length; i += batchSize) {
    const processedFilesInBatch = await Promise.all(
      files.slice(i, i + batchSize).map(processFile)
    );
    processedFilesInBatch.forEach((fileData, j) => {
      processedFiles.push({
        rawFile: files[i + j],
        fileData,
      });
    });
  }

  return processedFiles;
};

export const processFile = async (file: File) => {
  const [extractedMetadata, compressedWithBlurhash] = await Promise.all([
    extractFileMetadata(file),
    compressAndGenerateBlurhash(file),
  ]);
  const { compressed, blurhash } = compressedWithBlurhash;
  return {
    ...extractedMetadata,
    url: URL.createObjectURL(compressed),
    blurhash,
  };
};

export const extractFileMetadata = async (file: File) => {
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

    //const imageData = await getImageData(file);

    // Aperture
    const fNumber = getRationalTagValue(metadata["FNumber"]);
    const apertureValue = getTagDescription(metadata["ApertureValue"]);
    aperture = fNumber ?? (apertureValue ? parseFloat(apertureValue) : null);

    // ISO
    iso = getNumericTagValue(metadata["ISOSpeedRatings"]);

    // Shutterspeed
    shutterspeed =
      getTagDescription(metadata["ShutterSpeedValue"]) ||
      getTagDescription(metadata["ExposureTime"]);

    // Date
    const dateTimeStr = getTagDescription(metadata["DateTimeOriginal"]);
    if (dateTimeStr != null) {
      date = dateTimeStr?.split(" ")[0].replaceAll(":", "-");
    }

    // Focal length
    focalLength = getTagDescription(metadata["FocalLength"])?.split(" ")[0] ?? null;

    // Metering Mode
    meteringMode = getTagDescription(metadata["MeteringMode"]) ?? null;

    // Exposure Mode
    exposureMode = getTagDescription(metadata["ExposureProgram"]) ?? null;

    // Editing Software
    editingSoftware = getTagDescription(metadata["Software"]) ?? null;

    // Lens Model
    lensModel = getTagDescription(metadata["LensModel"]) ?? null;

    // Camera Model
    cameraModel = getTagDescription(metadata["Model"]) ?? null;
    // eslint-disable-next-line no-unused-vars
  } catch (err) {
    // No EXIF metadata
    console.log("Photo does not contain EXIF data");
  }

  return {
    id: uuidv4(),
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
    size: file.size,
  };
};

export const uploadPhotos = async (
  aid: number,
  uid: number,
  files: ProcessedFile[],
  onUploaded?: () => void,
): Promise<UploadPhotosResult> => {
  // Validate file sizes
  if (
    IMAGE_SIZE_RESTRICTION_ENABLED &&
    files.some((file) => file.rawFile.size > MAX_SIZE_BYTES)
  ) {
    return {
      status: 400,
      message: `Contains file(s) that exceed ${MAX_SIZE_BYTES} bytes`,
    };
  }
  return new Promise<UploadPhotosResult>((resolve, reject) => {
    (async () => {
      try {
        const b2Folder = `${uid}/${aid}/`; // Folder to upload the photos to

        let num_tries = 0;
        let unuploadedFiles = [...files];

        while (
          unuploadedFiles.length > 0 &&
          num_tries < imageUploadConfigs.maxRetries
        ) {
          if (process.env.NODE_ENV === "development") {
            console.log(
              `Attempt #${num_tries + 1} with ${unuploadedFiles.length} files`
            );
          }

          const failedUploads: ProcessedFile[] = [];

          const uploadUrlsAndTokens = await b2GetUploadUrls(
            unuploadedFiles.length
          );

          const unuploadedFilesWithToken = unuploadedFiles.map((file, i) => ({
            ...file,
            b2data: {
              b2name: `${b2Folder}${encodeURIComponent(file.fileData.name)}`,
              url: uploadUrlsAndTokens[i].url,
              token: uploadUrlsAndTokens[i].token,
            },
          }));

          // Attempt to upload
          let b2Ids = await Promise.all(
            unuploadedFilesWithToken.map(async (file) => {
              const fileId = await uploadFile(file);
              if (fileId) onUploaded?.();
              return fileId;
            })
          );

          // Success
          unuploadedFiles.forEach((file, i) => {
            if (b2Ids[i] != null) {
              file.fileData.fileId = b2Ids[i];
            } else {
              failedUploads.push(file);
            }
          });

          unuploadedFiles = failedUploads;
          num_tries++;
        }

        // Did not manage to upload all
        if (unuploadedFiles.length > 0) {
          return resolve({
            status: 503,
            message:
              "Server experiencing high load. Please try again later, or upload your images in smaller batches",
          });
        }

        const photos = files.map(({ fileData }) => {
          if (!fileData.fileId) {
            throw new Error(`Missing uploaded file ID for ${fileData.name}`);
          }
          return {
            ...fileData,
            date:
              fileData.date instanceof Date
                ? fileData.date.toISOString()
                : fileData.date,
            fileId: fileData.fileId,
          };
        });
        await updateAlbum({ aid, photos });
        resolve({ status: 200, message: "Successfully uploaded photos" });
      } catch (err) {
        reject({ status: 500, message: err });
      }
    })();
  });
};

const uploadFile = async (
  file: ProcessedFile & {
    b2data: { url: string; token: string; b2name: string };
  },
) => {
  if (IMAGE_SIZE_RESTRICTION_ENABLED && file.rawFile.size > MAX_SIZE_BYTES) {
    throw new Error(`File size exceeded ${MAX_SIZE_BYTES}`);
  }
  const b2data = file.b2data;
  const res = await fetch(b2data.url, {
    method: "POST",
    headers: {
      Authorization: b2data.token,
      "X-Bz-File-Name": b2data.b2name,
      "Content-Type": "b2/x-auto",
      "X-Bz-Content-Sha1": "do_not_verify",
      //"X-Bz-Info-b2-content-disposition": "attachment",
    },
    body: file.rawFile,
  });
  const data: { fileId?: string } = await res.json();

  return res.status === 200 ? (data.fileId ?? null) : null;
};

const compressAndGenerateBlurhash = async (
  file: File,
  componentX = 4,
  componentY = 4
) => {
  const compressed = await compress(file, {
    maxSizeMB: imageUploadConfigs.maxCompressedSize,
    maxWidthOrHeight: imageUploadConfigs.maxCompressedWidthOrHeight,
  });

  const imageData = await getImageData(compressed);
  const blurhash = encode(
    imageData.data,
    imageData.width,
    imageData.height,
    componentX,
    componentY
  );
  return { compressed, blurhash };
};

const getImageData = async (file: Blob) => {
  const dataURL = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = dataURL;
  });

  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Unable to create image canvas context");
  }
  ctx.drawImage(img, 0, 0);
  const imageData = ctx.getImageData(0, 0, img.width, img.height);

  return imageData;
};

export const FORM_FIELDS = {
  ALBUM_NAME: { label: "Album Name", name: "albumName" },
  FILES: { label: "Files", name: "files" },
  APERTURE: { label: "Aperture", name: "aperture" },
  SHUTTER_SPEED: { label: "Shutter Speed", name: "shutterspeed" },
  ISO: { label: "ISO", name: "iso" },
  DATE: { label: "Date", name: "date" },
  FOCAL_LENGTH: { label: "Focal Length", name: "focalLength" },
  METERING_MODE: { label: "Metering Mode", name: "meteringMode" },
  EXPOSURE_MODE: { label: "Exposure Mode", name: "exposureMode" },
  LENS_MODEL: { label: "Lens Model", name: "lensModel" },
  CAMERA_MODEL: { label: "Camera Model", name: "cameraModel" },
  EDITING_SOFTWARE: { label: "Editing Software", name: "editingSoftware" },
  DESCRIPTION: { label: "Description", name: "description" },
} as const;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const getTagDescription = (tag: unknown): string | undefined => {
  if (!isRecord(tag)) return;
  return typeof tag.description === "string" ? tag.description : undefined;
};

const getTagValue = (tag: unknown): unknown =>
  isRecord(tag) ? tag.value : undefined;

const getRationalTagValue = (tag: unknown): number | null => {
  const value = getTagValue(tag);
  if (
    !Array.isArray(value) ||
    typeof value[0] !== "number" ||
    typeof value[1] !== "number" ||
    value[1] === 0
  ) {
    return null;
  }
  return value[0] / value[1];
};

const getNumericTagValue = (tag: unknown): number | null => {
  const value = getTagValue(tag);
  if (typeof value === "number") return value;
  if (!Array.isArray(value) || value.length === 0) return null;
  const first = value[0];
  if (typeof first === "number") return first;
  const nestedValue = getTagValue(first);
  return typeof nestedValue === "number" ? nestedValue : null;
};
