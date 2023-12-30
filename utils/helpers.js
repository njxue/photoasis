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

export { capitalize, parseDate };
