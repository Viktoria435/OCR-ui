import "./App.css";
import { FileUploadProvider } from "./context/fileContext";
import MainPage from "./pages/MainPage";

function App() {
   return (
      <FileUploadProvider>
         <MainPage />
      </FileUploadProvider>
   );
}

export default App;
