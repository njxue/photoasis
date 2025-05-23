const capitalize = (str) => {
  if (!str || str.length === 0) {
    return str;
  }

  return str.charAt(0).toUpperCase() + str.slice(1);
};

const parseDate = (str) => {
  if (!str) {
    return;
  }
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const dateObj = new Date(str);
  if (dateObj === "Invalid Date") {
    return;
  }
  return dateObj.toLocaleDateString("en-SG", options);
};

const METERING_MODES = [
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

const EXPOSURE_MODES = [
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

const arrayToFileList = (filesArray) => {
  const dataTransfer = new DataTransfer();

  filesArray.forEach((file) => {
    dataTransfer.items.add(file);
  });

  return dataTransfer.files;
};

const isEqualDeep = (obj1, obj2) => {
  if (
    typeof obj1 !== "object" ||
    typeof obj2 !== "object" ||
    obj1 === null ||
    obj2 === null
  ) {
    return obj1 === obj2;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  return keys1.every((key) => isEqualDeep(obj1[key], obj2[key]));
};

const formatPhotoData = (photo) => {
  const formattedPhotoData = {};
  const unFormattedFields = [
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
      formattedPhotoData[field] = photo[field];
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

export {
  capitalize,
  parseDate,
  arrayToFileList,
  isEqualDeep,
  formatPhotoData,
  METERING_MODES,
  EXPOSURE_MODES,
};
