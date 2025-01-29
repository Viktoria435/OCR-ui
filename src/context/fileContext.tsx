import { createContext, useContext, ReactNode, useState } from "react";
import { uploadFileRequest } from "../api/fileApi";

interface FileUploadContextType {
   uploadFile: (file: File) => void;
   uploadedData: string | null;
   error: string | null;
   uploadedFiles: string[];
   isLoading: boolean;
}

const FileUploadContext = createContext<FileUploadContextType | undefined>(
   undefined
);

export const FileUploadProvider = ({ children }: { children: ReactNode }) => {
   const [uploadedData, setUploadedData] = useState<string | null>(null);
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
            setUploadedData(null);
         } else {
            setUploadedData(response.data.text);
            setError(null);
         }
      } catch (err: unknown) {
         if (err instanceof Error) {
            console.error("Error uploading file:", err.message);
         } else {
            console.error("Unknown error:", err);
         }
         setError("File upload failed");
         setUploadedData(null);
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <FileUploadContext.Provider
         value={{ uploadFile, uploadedData, error, uploadedFiles, isLoading }}
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
