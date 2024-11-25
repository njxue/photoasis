export const formatFormData = (formData, fileList) => {
  formData.delete("photos");
  fileList.forEach((file) => {
    formData.append("photos", file);
  });
  return formData;
};
