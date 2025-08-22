import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

import Trash from "./components/Trash.jsx";
import FileManager from "./components/FileManager.jsx";
import HomeLayout from "./layout/HomeLayout.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<HomeLayout/>}/>
        <Route path="/trash" element={<Trash/>} />
        <Route path='/fileManager' element={<FileManager/>}/>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
