
import React, { useEffect, useState } from "react";
import axios from "axios";
import { List, Grid, Trash2,  RotateCcw, Download } from "lucide-react";

import { useNavigate } from "react-router-dom";

import Sidebar from "./Sidebar.jsx";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Trash = () => {

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
    const owner_id=localStorage.getItem("owner_id")
    try {
      const res = await axios.get(`${BACKEND_URL}/files/trash/getFiles/${owner_id}`, {
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
   const restoreFile = async (id) => {
   
    const access_token = localStorage.getItem("access_token"); //  auth access_token
    // console.log(access_token);
    if (!access_token) {
      alert("Not authenticated. Please login.");
      navigate("/login")
      return;
    }
    await axios.put(`${BACKEND_URL}/files/restore/${id}`, {
      headers: {
        Authorization: `Bearer ${access_token}`, // send access_token
        "Content-Type": "multipart/form-data"
      },
    });
    alert("file sucessfully restored");
    fetchFiles();
  };
 

  return (
    
    <div className="flex h-screen p-2 gap-2">
      {/* Sidebar - 25% width */}
      <div className="w-1/4  h-full">
        <Sidebar />
      </div>

      {/* Main Content / File Manager - 65% width */}
      <div className="w-3/5 mt-2  h-fit flex flex-col gap-4">
        {/* Top bar: Upload + My Files + View toggle */}
        <div className="flex justify-between items-center mb-4">
       

          <h2 className="text-xl font-semibold">My Trased  Files</h2>

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
              className="border rounded-lg p-3 shadow hover:shadow-md flex flex-col justify-between"
            >
              <p className="truncate font-medium">FileName: {file.name}</p>
              <p className="truncate font-medium">Size: {file.size} Bytes</p>

              <div className="flex justify-between mt-2 text-gray-600">
                <a
                  href={`${BACKEND_URL}${file.filePath}`}
                  download
                  className="hover:text-blue-500"
                >
                  <Download size={18} />
                </a>
                <button
                  onClick={() => restoreFile(file.id)}
                  className="hover:text-green-500"
                > <RotateCcw size={18} />
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




export default Trash