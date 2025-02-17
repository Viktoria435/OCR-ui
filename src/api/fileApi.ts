import api from ".";

export interface UploadFileResponse {
   data: {
      text: string;
      originalText: string;
   };
   successful: boolean;
   error: {
      message: string;
   };
}

export const uploadFileRequest = async (
   file: File
): Promise<UploadFileResponse> => {
   const formData = new FormData();
   formData.append("file", file);

   try {
      const response = await api.post<UploadFileResponse>(
         "/api/ocr/parse",
         formData,
         {
            headers: {
               "Content-Type": "multipart/form-data",
            },
         }
      );

      return response.data;
   } catch (error: unknown) {
      if (error instanceof Error) {
         console.error("Error uploading file:", error.message);
      } else {
         console.error("Unknown error:", error);
      }
      throw new Error("File upload failed");
   }
};
