"use client";
import { processFile } from "@utils/imageUploadUtils";
import { createContext, useContext, useState } from "react";

const ImageUploadContext = createContext(null);

export const useImageUploadContext = () => {
  return useContext(ImageUploadContext);
};

const ImageUploadProvider = ({ children }) => {
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState();

  const handleAddFiles = async (newFiles) => {
    setIsLoading(true);
    let processedFiles = await Promise.all(newFiles.map(processFile));
    processedFiles = processedFiles.map((file, i) => ({
      file: newFiles[i],
      preview: file,
    }));
    setFiles([...files, ...processedFiles]);
    setIsLoading(false);
  };

  const handleRemoveFile = (fileId) => {
    setFiles((files) => files.filter((file) => file.preview.id !== fileId));
  };

  const handleClickImagePreview = (fileId) => {
    setSelectedFile(fileId);
  };

  const resetFiles = () => {
    setFiles([]);
  };

  const imagePreviews = files.map((file) => file.preview);
  const filesForUpload = files.map((file) => file.file);

  const value = {
    isLoading,
    handleAddFiles,
    handleRemoveFile,
    imagePreviews,
    filesForUpload,
    handleClickImagePreview,
    selectedFile,
    files,
    resetFiles,
  };

  return (
    <ImageUploadContext.Provider value={value}>
      {children}
    </ImageUploadContext.Provider>
  );
};

export default ImageUploadProvider;
