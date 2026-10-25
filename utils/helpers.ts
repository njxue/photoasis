export const capitalize = (str: string): string => {
  if (!str || str.length === 0) {
    return str;
  }

  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const parseDate = (str: string | Date | null | undefined) => {
  if (!str) {
    return;
  }
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const dateObj = new Date(str);
  if (Number.isNaN(dateObj.getTime())) {
    return;
  }
  return dateObj.toLocaleDateString("en-SG", options);
};

export const METERING_MODES = [
  {
    label: "Matrix",
    value: "Pattern",
    icon: "matrix-metering.svg",
  },
  {
    label: "Partial",
    value: "Partial",
    icon: "partial-metering.svg",
  },
  {
    label: "Spot",
    value: "Spot",
    icon: "spot-metering.svg",
  },
  {
    label: "Center Weighted",
    value: "CenterWeightedAverage",
    icon: "cwa-metering.svg",
  },
];

export const EXPOSURE_MODES = [
  {
    label: "Program",
    value: "Normal program",
    icon: "P",
  },
  {
    label: "Aperture Priority",
    value: "Aperture priority",
    icon: "A/Av",
  },
  {
    label: "Shutter Priority",
    value: "Shutter priority",
    icon: "S/Tv",
  },
  {
    label: "Manual",
    value: "Manual",
    icon: "M",
  },
  {
    label: "Auto",
    value: "FullAuto",
    icon: "Auto",
  },
];

export const arrayToFileList = (filesArray: File[]): FileList => {
  const dataTransfer = new DataTransfer();

  filesArray.forEach((file) => {
    dataTransfer.items.add(file);
  });

  return dataTransfer.files;
};

export const isEqualDeep = (obj1: unknown, obj2: unknown): boolean => {
  if (
    typeof obj1 !== "object" ||
    typeof obj2 !== "object" ||
    obj1 === null ||
    obj2 === null
  ) {
    return obj1 === obj2;
  }

  const record1 = obj1 as Record<string, unknown>;
  const record2 = obj2 as Record<string, unknown>;
  const keys1 = Object.keys(record1);
  const keys2 = Object.keys(record2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  return keys1.every((key) => isEqualDeep(record1[key], record2[key]));
};

export interface PhotoDataInput {
  name?: string | null;
  shutterspeed?: string | null;
  description?: string | null;
  meteringMode?: string | null;
  exposureMode?: string | null;
  lensModel?: string | null;
  cameraModel?: string | null;
  editingSoftware?: string | null;
  aperture?: number | string | null;
  iso?: number | string | null;
  focalLength?: number | string | null;
  date?: string | null;
}

export interface FormattedPhotoData {
  name?: string;
  shutterspeed?: string;
  description?: string;
  meteringMode?: string;
  exposureMode?: string;
  lensModel?: string;
  cameraModel?: string;
  editingSoftware?: string;
  aperture?: number;
  iso?: number;
  focalLength?: number;
  date?: string;
}

type UnformattedPhotoField = keyof Pick<
  PhotoDataInput,
  | "name"
  | "shutterspeed"
  | "description"
  | "meteringMode"
  | "exposureMode"
  | "lensModel"
  | "cameraModel"
  | "editingSoftware"
>;

export const formatPhotoData = (photo: PhotoDataInput): FormattedPhotoData => {
  const formattedPhotoData: FormattedPhotoData = {};
  const unFormattedFields: UnformattedPhotoField[] = [
    "name",
    "shutterspeed",
    "description",
    "meteringMode",
    "exposureMode",
    "lensModel",
    "cameraModel",
    "editingSoftware",
  ];

  unFormattedFields.forEach((field) => {
    if (photo[field]) {
      formattedPhotoData[field] = photo[field] ?? undefined;
    }
  });

  if (photo.aperture) {
    let aperture = photo.aperture;
    if (typeof aperture === "string") {
      aperture = parseFloat(aperture);
    }
    if (isNaN(aperture)) {
      throw new Error("Aperture is not a valid float");
    }
    formattedPhotoData.aperture = parseFloat(aperture.toFixed(2));
  }

  if (photo.iso) {
    let iso = photo.iso;
    if (typeof iso === "string") {
      iso = parseInt(iso);
    }
    if (isNaN(iso)) {
      throw new Error("ISO is not a valid integer");
    }
    formattedPhotoData.iso = iso;
  }

  if (photo.focalLength) {
    let focalLength = photo.focalLength;
    if (typeof focalLength === "string") {
      focalLength = parseInt(focalLength);
    }
    if (isNaN(focalLength)) {
      throw new Error("Focal length is not a valid integer");
    }
    formattedPhotoData.focalLength = focalLength;
  }

  if (photo.date) {
    formattedPhotoData.date = photo.date + "T00:00:00Z";
  }

  return formattedPhotoData;
};

export const bytesToMegabytes = (bytes: number): number => {
  if (bytes < 0) {
    throw new Error("Bytes must be a non-negative integer");
  }
  if (!Number.isInteger(bytes)) {
    throw new Error("Bytes must be an integer");
  }
  return Math.floor(bytes / 1024 ** 2);
};
