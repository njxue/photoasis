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
      rawFile: newFiles[i],
      fileData: file,
    }));

    setFiles([...files, ...processedFiles]);
    if (files.length === 0) {
      setSelectedFile(processedFiles[0]);
    }
    setIsLoading(false);
  };

  const handleRemoveFile = (fileId) => {
    setFiles((files) => files.filter((file) => file.fileData.id !== fileId));

    if (selectedFile.fileData.id === fileId) {
      if (files.length === 1) {
        // No more files
        setSelectedFile(null);
      } else {
        /**
         * Removed file that is currently selected
         * - If file is rightmost: select left file
         * - If file is not rightmost: select right file
         */
        const idx = files.findIndex((f) => f.fileData.id === fileId);
        if (idx === files.length - 1) {
          setSelectedFile(files[idx - 1]);
        } else {
          setSelectedFile(files[idx + 1]);
        }
      }
    }
  };

  const handleClickImagePreview = (fileId) => {
    setSelectedFile(files.find((f) => f.fileData?.id === fileId));
  };

  const resetFiles = () => {
    setFiles([]);
  };

  const value = {
    isLoading,
    handleAddFiles,
    handleRemoveFile,
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
