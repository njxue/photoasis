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

export { capitalize, parseDate, METERING_MODES, EXPOSURE_MODES };
