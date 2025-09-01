import React, { useEffect, useState } from "react";
import axios from "axios";

import { useNavigate, useNavigation } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function FolderSidebar({ currentFolder, onFolderCreated }) {

  const navigate = useNavigate();

  const [folders, setFolders] = useState([]);
  const [newName, setNewName] = useState("");
  const [view, setView] = useState("grid");

  const owner_id = localStorage.getItem("owner_id");

  const fetchRootFolders = async () => {
    const res = await axios.get(`${BACKEND_URL}/folders/getFolder/${owner_id}`); // parent=null roots
    setFolders(res.data);
    // console.log(res.data);
  };

  useEffect(() => {
    fetchRootFolders();
  }, []);

  const onSelectFolder = async (id) => {
    navigate("/")
  };

  const createFolder = async () => {
    console.log(newName)
    const access_token = localStorage.getItem("access_token"); //  auth access_token
    // console.log(access_token);
    if (!access_token) {
      alert("Not authenticated. Please login.");
      navigate("/login")
      return;
    }
    if (!newName.trim()) return;
    await axios.post(`${BACKEND_URL}/folders/create`, { name: newName }, {
      headers: {
        Authorization: `Bearer ${access_token}`, // send access_token
        // "Content-Type": "multipart/form-data"
      },
    });
    setNewName("");
    alert("new folder created Sucessfully ");
    // fetchRootFolders();
    // onFolderCreated?.(); // let parent refetch files if needed
  };


  return (
    <div className="  bg-gray-50 ">
      <h2 className="font-bold mb-3">New Folder</h2>
      <div>
        <input
          className="border w-50 rounded px-2 py-1 flex-1"
          placeholder="New folder"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <button onClick={createFolder} className="bg-blue-600 text-white px-4 py-1 mt-4 rounded-xl">
          Create
        </button>
      </div>


      

    </div>


   
  );
}
