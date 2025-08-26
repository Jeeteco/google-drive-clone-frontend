import React, { useEffect, useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_BACKEND_URL; 

export default function FolderSidebar({ currentFolder, onSelectFolder, onFolderCreated }) {
  const [folders, setFolders] = useState([]);
  const [newName, setNewName] = useState("");

  const owner_id=localStorage.getItem("owner_id");

  const fetchRootFolders = async () => {
    const res = await axios.get(`${API}/folders/getFolder/${owner_id}`); // parent=null roots
    setFolders(res.data);
  };

  useEffect(() => {
    fetchRootFolders();
  }, []);

  const createFolder = async () => {
     const access_token = localStorage.getItem("access_token"); //  auth access_token
    // console.log(access_token);
    if (!access_token) {
      alert("Not authenticated. Please login.");
      navigate("/login")
      return;
    }
    if (!newName.trim()) return;
    await axios.post(`${API}/folders/create`, { name: newName },{
      headers: {
        Authorization: `Bearer ${access_token}`, // send access_token
        "Content-Type": "multipart/form-data"
      },
    });
    setNewName("");
    // fetchRootFolders();
    // onFolderCreated?.(); // let parent refetch files if needed
  };

  return (
    <div className="w-64 p-4 bg-gray-50 border-r">
      <h2 className="font-semibold mb-3">Folders</h2>

      <div className="flex gap-2 mb-3">
        <input
          className="border rounded px-2 py-1 flex-1"
          placeholder="New folder"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <button onClick={createFolder} className="bg-blue-600 text-white px-3 rounded">
          Create
        </button>
      </div>

      <ul className="space-y-1">
        {folders.map(f => (
          <li key={f._id}>
            <button
              className={`w-full text-left px-2 py-1 rounded hover:bg-gray-100 ${currentFolder===f._id ? "bg-blue-100" : ""}`}
              onClick={() => onSelectFolder(f._id)}
            >
              📁 {f.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
