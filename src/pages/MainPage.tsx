import FileHistory from "../components/FileHistory";
import FileUploader from "../components/FileUploader";
import Loading from "../components/Loading";
import OriginalDataComponent from "../components/OriginalDataComponent";
import OutputComponent from "../components/OutputComponent";
import { useFileUpload } from "../context/fileContext";

const MainPage = () => {
   const { isLoading } = useFileUpload();
   return (
      <div className="grid grid-cols-[1fr_2fr] w-full h-screen overflow-hidden">
         {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center z-50 bg-black/20 ">
               <Loading />
            </div>
         )}
         <div className="flex flex-col p-8 gap-y-5 overflow-hidden flex-grow">
            <p className="text-[#434343] font-bold text-xl underline">
               Query & Upload
            </p>
            <FileUploader />
            <p className="text-[#434343] font-bold text-xl underline">
               History
            </p>
            <FileHistory />
         </div>
         <div className="flex flex-col p-8 gap-y-5 overflow-hidden">
            <p className="text-[#434343] font-bold text-xl underline">Original Data</p>
            <div className="flex-grow overflow-auto h-full">
               <OutputComponent />
            </div>
            <p className="text-[#434343] font-bold text-xl underline">
               Cleaned Data
            </p>
            <div className="flex-grow overflow-auto h-full">
               <OriginalDataComponent />
            </div>
         </div>
      </div>
   );
};

export default MainPage;
