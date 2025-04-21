import ExifReader from "exifreader";
import { compress } from "./compress";
import { b2GetUploadUrls } from "@actions/b2";
import { v4 as uuidv4 } from "uuid";
import { encode } from "blurhash";
export const formatFormData = (formData, fileList) => {
  // Use the files in fileList instead of the files in the form, because we are manually keeping track of the files
  fileList.forEach((file) => {
    formData.append(FORM_FIELDS.FILES.name, file);
  });
  return formData;
};

export const processFile = async (file) => {
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

export const extractFileMetadata = async (file) => {
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
    maxWidthOrHeight: 200, // Intrinsic size
  });

  const blurhash = await compressAndGenerateBlurhash(compressed);

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
    blurhash,
    url: URL.createObjectURL(compressed),
  };
};

export const formUploadPhotos = async (aid, uid, formdata) => {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const b2Folder = `${uid}/${aid}/`; // Folder to upload the photos to

        let fileList = formdata
          .getAll(FORM_FIELDS.FILES.name)
          .map((file, i) => ({
            file: file,
            idx: i,
            name: file.name,
          }));
        const blurHash = formdata.getAll("blurhash");
        const aperture = formdata.getAll(FORM_FIELDS.APERTURE.name);
        const shutterspeed = formdata.getAll(FORM_FIELDS.SHUTTER_SPEED.name);
        const iso = formdata.getAll(FORM_FIELDS.ISO.name);
        const description = formdata.getAll(FORM_FIELDS.DESCRIPTION.name);
        const date = formdata.getAll(FORM_FIELDS.DATE.name);
        const focalLength = formdata.getAll(FORM_FIELDS.FOCAL_LENGTH.name);
        const meteringMode = formdata.getAll(FORM_FIELDS.METERING_MODE.name);
        const exposureMode = formdata.getAll(FORM_FIELDS.EXPOSURE_MODE.name);
        const lensModel = formdata.getAll(FORM_FIELDS.LENS_MODEL.name);
        const cameraModel = formdata.getAll(FORM_FIELDS.CAMERA_MODEL.name);
        const editingSoftware = formdata.getAll(
          FORM_FIELDS.EDITING_SOFTWARE.name
        );

        const MAX_RETRIES = 3;
        let num_tries = 0;
        const successfullyUploadedFiles = [];
        while (fileList.length > 0 && num_tries < MAX_RETRIES) {
          if (process.env.NODE_ENV === "development") {
            console.log(
              `Attempt #${num_tries + 1} with ${fileList.length} files`
            );
          }

          const uploadUrlsAndTokens = await b2GetUploadUrls(fileList.length);
          let files = fileList.map((file, i) => ({
            ...file,
            b2name: `${b2Folder}${encodeURIComponent(file.name)}`,
            url: uploadUrlsAndTokens[i].url,
            token: uploadUrlsAndTokens[i].token,
          }));

          // Attempt to upload
          let uploadFilesRes = await uploadFiles(files);

          // Success
          successfullyUploadedFiles.push(
            ...uploadFilesRes.filter((file) => file.uploadSuccessful)
          );

          // Failed
          fileList = uploadFilesRes.filter((file) => !file.uploadSuccessful);
          num_tries++;
        }

        // Did not manage to upload all
        if (fileList.length > 0) {
          return resolve({
            status: 503,
            message:
              "Server experiencing high load. Please try again later, or upload your images in smaller batches",
          });
        }

        // Assign photo settings
        const uploadedFiles = successfullyUploadedFiles.map((file) => ({
          name: file.name,
          aperture: aperture[file.idx],
          shutterspeed: shutterspeed[file.idx],
          iso: iso[file.idx],
          description: description[file.idx],
          date: date[file.idx] ? date[file.idx] + "T00:00:00Z" : null,
          focalLength: focalLength[file.idx],
          meteringMode: meteringMode[file.idx],
          exposureMode: exposureMode[file.idx],
          lensModel: lensModel[file.idx],
          cameraModel: cameraModel[file.idx],
          editingSoftware: editingSoftware[file.idx],
          fileId: file.fileId,
          blurhash: blurHash[file.idx],
        }));

        resolve({ status: 200, data: uploadedFiles });
      } catch (err) {
        reject({ status: 500, message: err });
      }
    })();
  });
};

const uploadFiles = async (files) => {
  return await Promise.all(files.map(uploadFile));
};

const uploadFile = async (file) => {
  const res = await fetch(file.url, {
    method: "POST",
    headers: {
      Authorization: file.token,
      "X-Bz-File-Name": file.b2name,
      "Content-Type": "b2/x-auto",
      "X-Bz-Content-Sha1": "do_not_verify",
    },
    body: file.file,
  });
  const data = await res.json();
  return {
    ...file,
    fileId: data.fileId,
    uploadSuccessful: res.status === 200, // Will return 503 if not successful
  };
};

const compressAndGenerateBlurhash = async (
  file,
  componentX = 4,
  componentY = 4
) => {
  const compressed = await compress(file, {
    maxSizeMB: 0.3,
    maxWidthOrHeight: 200,
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

const getImageData = async (file) => {
  const dataURL = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  const img = await new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = dataURL;
  });

  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext("2d");
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
};
