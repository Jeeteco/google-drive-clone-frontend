import React, { useEffect, useState } from "react";
import axios from "axios";
import { List, Grid, Trash2, Edit, Download, Folder } from "lucide-react";

import { useNavigate } from "react-router-dom";
import FileUpload from "./FileUpload";
import Sidebar from "./Sidebar.jsx";
import FolderSidebar from "./FolderSidebar.jsx";
import FolderManager from "./FolderManager.jsx";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const FileManager = () => {

  const navigate = useNavigate();

  const [files, setFiles] = useState([]);
  const [view, setView] = useState("grid");

  // Fetch files
  const fetchFiles = async () => {
    const access_token = localStorage.getItem("access_token"); //  auth access_token
    // console.log(access_token);
    if (!access_token) {
      alert("Not authenticated. Please login.");
      navigate("/login")
      return;
    }
    const owner_id = localStorage.getItem("owner_id");
    try {
      const res = await axios.get(`${BACKEND_URL}/files/getFiles/${owner_id}`, {
        headers: {
          Authorization: `Bearer ${access_token}`, // send access_token
          "Content-Type": "multipart/form-data"
        },
      });
      setFiles(res.data);

    } catch (error) {
      alert(error);

    }
  };

  useEffect(() => {

    fetchFiles();
  }, []);

  // Delete file
  const deleteFile = async (id) => {
    const access_token = localStorage.getItem("access_token"); //  auth access_token
    // console.log(access_token);
    if (!access_token) {
      alert("Not authenticated. Please login.");
      navigate("/login")
      return;
    }

    try {
      // console.log(id);
      await axios.delete(`${BACKEND_URL}/files/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${access_token}`, // send access_token
          "Content-Type": "multipart/form-data"
        },
      });
      fetchFiles();
    } catch (error) {
      console.error(error.message)
      alert("Plaese Login ");
      navigate('/login')

    }
  };

  // Rename file
  const renameFile = async (id) => {
    const newName = prompt("Enter new name:");
    if (!newName) return;
    const access_token = localStorage.getItem("access_token"); //  auth access_token
    // console.log(access_token);
    if (!access_token) {
      alert("Not authenticated. Please login.");
      navigate("/login")
      return;
    }
    await axios.put(`${BACKEND_URL}/files/rename/${id}`, { newName }, {
      headers: {
        Authorization: `Bearer ${access_token}`, // send access_token
        "Content-Type": "application/json"
      },
    });
    fetchFiles();
  };

  return (

    <div className="flex h-full  gap-4">
    
      <div className="w-1/4  h-9/10">
        <Sidebar />
      </div>

    
      <div className="w-3/5 mt-2 h-fit flex flex-col gap-4">
        {/* Top bar: Upload + My Files + View toggle */}
        <h1  className="text-xl font-extrabold flex m-2 justify-center">FILE MANAGER</h1>
        <div className="flex flex-wrap justify-between items-center mb-4">
          <div className="w-full h-2/3 mb-4 border-1"> 
            <FolderManager/>
          </div>
          <FileUpload onUploadSuccess={fetchFiles} />

          <h2 className="text-xl font-extrabold">My Files</h2>

          <div className="flex gap-2 overflow-y-auto">
            <button
              onClick={() => setView("list")}
              className="p-2 border h-10 rounded"
            >
              <List size={18} />
            </button>
            <button
              onClick={() => setView("grid")}
              className="p-2 h-10 border rounded"
            >
              <Grid size={18} />
            </button>
          </div>
        </div>

        {/* File list/grid */}
        
        <div
          className={
            view === "grid"
              ? "grid grid-cols-2 md:grid-cols-4 gap-4"
              : "flex flex-col gap-3"
          }
        >
          {files.map((file) => (
            <div
              key={file.id}
              className="border rounded-lg p-3 shadow hover:shadow-md flex flex-row justify-between"
            >
             
              <p className="truncate font-medium">FileName: {file.name}</p>
              <p className="truncate font-medium">Size: {file.size} Bytes</p>
              <p className="truncate font-medium">Size: {file.mime_type} Bytes</p>

              <div className="flex justify-between mt-2 text-gray-600">
               
                <button
                  onClick={() => renameFile(file.id)}
                  className="hover:text-green-500"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => deleteFile(file.id)}
                  className="hover:text-red-500"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
       

      </div>

      {/* Optional spacer (10%) */}
      <div className="w-1/10"></div>
    </div>

  );
};

export default FileManager;
