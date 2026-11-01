"use client";
import {
  MAX_SIZE_BYTES,
  IMAGE_SIZE_RESTRICTION_ENABLED,
} from "@app/configs/imageConfigs";
import { processFiles, type ProcessedFile } from "@utils/imageUploadUtils";
import { createContext, useContext, useState, type ReactNode } from "react";
import { toast } from "react-toastify";

interface ImageUploadContextValue {
  isLoading: boolean;
  handleAddFiles: (newFiles: File[]) => Promise<void>;
  handleRemoveFile: (fileId: string) => void;
  handleClickImagePreview: (fileId: string) => void;
  selectedFile: ProcessedFile | null;
  files: ProcessedFile[];
  resetFiles: () => void;
  hasFileError: boolean;
}
interface ImageUploadProviderProps {
  children: ReactNode;
}
const ImageUploadContext = createContext<ImageUploadContextValue | null>(null);

export const useImageUploadContext = () => {
  const context = useContext(ImageUploadContext);
  if (!context) throw new Error("useImageUploadContext must be used within ImageUploadProvider");
  return context;
};

const ImageUploadProvider = ({ children }: ImageUploadProviderProps) => {
  const [files, setFiles] = useState<ProcessedFile[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<ProcessedFile | null>(null);

  const hasFileError =
    IMAGE_SIZE_RESTRICTION_ENABLED &&
    files.some((file) => file.fileData.size > MAX_SIZE_BYTES);

  const handleAddFiles = async (newFiles: File[]) => {
    setIsLoading(true);
    try {
      const processedFiles = await processFiles(newFiles);
      setFiles([...files, ...processedFiles]);
      if (files.length === 0) {
        setSelectedFile(processedFiles[0]);
      }
    } catch (err) {
      console.error(err);
      toast.error("Unable to process images");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveFile = (fileId: string) => {
    setFiles((currentFiles) => currentFiles.filter((file) => file.fileData.id !== fileId));

    if (selectedFile?.fileData.id === fileId) {
      if (files.length === 1) {
        // No more files
        setSelectedFile(null);
      } else {
        /**
         * Removed file that is currently selected
         * - If file is rightmost: select left file
         * - If file is not rightmost: select right file
         */
        const idx = files.findIndex((file) => file.fileData.id === fileId);
        if (idx === files.length - 1) {
          setSelectedFile(files[idx - 1]);
        } else {
          setSelectedFile(files[idx + 1]);
        }
      }
    }
  };

  const handleClickImagePreview = (fileId: string) => {
    setSelectedFile(files.find((file) => file.fileData.id === fileId) ?? null);
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
    hasFileError,
  };

  return (
    <ImageUploadContext.Provider value={value}>
      {children}
    </ImageUploadContext.Provider>
  );
};

export default ImageUploadProvider;
