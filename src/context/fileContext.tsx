import { createContext, useContext, ReactNode, useState } from "react";
import { uploadFileRequest } from "../api/fileApi";

interface FileUploadContextType {
   uploadFile: (file: File) => void;
   outputData: string | null;
   originalData: string | null;
   error: string | null;
   uploadedFiles: string[];
   isLoading: boolean;
}

const FileUploadContext = createContext<FileUploadContextType | undefined>(
   undefined
);

export const FileUploadProvider = ({ children }: { children: ReactNode }) => {
   const [outputData, setOutputData] = useState<string | null>(null);
   const [originalData, setOriginalData] = useState<string | null>(null);
   const [error, setError] = useState<string | null>(null);
   const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
   const [isLoading, setIsLoading] = useState<boolean>(false);

   const uploadFile = async (file: File) => {
      setIsLoading(true);
      try {
         const response = await uploadFileRequest(file);
         const fileName = file.name;

         setUploadedFiles((prevFiles) => [...prevFiles, fileName]);
         if (!response.successful) {
            setError(response.error.message);
            setOutputData(null);
            setOriginalData(null);
         } else {
            setOutputData(response.data.text);
            setOriginalData(response.data.originalText);
            setError(null);
         }
      } catch (err: unknown) {
         if (err instanceof Error) {
            console.error("Error uploading file:", err.message);
         } else {
            console.error("Unknown error:", err);
         }
         setError("File upload failed");
         setOutputData(null);
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <FileUploadContext.Provider
         value={{
            uploadFile,
            outputData,
            error,
            uploadedFiles,
            isLoading,
            originalData,
         }}
      >
         {children}
      </FileUploadContext.Provider>
   );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useFileUpload = (): FileUploadContextType => {
   const context = useContext(FileUploadContext);
   if (!context) {
      throw new Error("useFileUpload must be used within a FileUploadProvider");
   }
   return context;
};
