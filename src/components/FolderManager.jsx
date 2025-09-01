import React, { useEffect, useState } from "react";
import axios from "axios";
import { List, Grid, Edit, Trash2 } from "lucide-react";
import { useNavigate, useNavigation } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function FolderManager({ currentFolder, onFolderCreated }) {

  const navigate = useNavigate();

  const [folders, setFolders] = useState([]);
  const [newName, setNewName] = useState("");
  const [view, setView] = useState("grid");

  const owner_id = localStorage.getItem("owner_id");

  const fetchRootFolders = async () => {
    const res = await axios.get(`${BACKEND_URL}/folders/getFolder/${owner_id}`); // parent=null roots
    setFolders(res.data);
    console.log(res);
  };

  useEffect(() => {
    fetchRootFolders();
  }, []);

  const onSelectFolder = async (id) => {
    navigate("/")
  };

  //   const createFolder = async () => {
  //     const access_token = localStorage.getItem("access_token"); //  auth access_token
  //     // console.log(access_token);
  //     if (!access_token) {
  //       alert("Not authenticated. Please login.");
  //       navigate("/login")
  //       return;
  //     }
  //     if (!newName.trim()) return;
  //     await axios.post(`${BACKEND_URL}/folders/create`, { name: newName }, {
  //       headers: {
  //         Authorization: `Bearer ${access_token}`, // send access_token
  //         // "Content-Type": "multipart/form-data"
  //       },
  //     });
  //     setNewName("");
  //     alert("new folder created Sucessfully ");
  //     // fetchRootFolders();
  //     onFolderCreated?.(); // let parent refetch folders if needed
  //   };
  const renameFolder = async (id) => {
    const newName = prompt("Enter new name:");
    if (!newName) return;
    const access_token = localStorage.getItem("access_token"); //  auth access_token
    // console.log(access_token);
    if (!access_token) {
      alert("Not authenticated. Please login.");
      navigate("/login")
      return;
    }
    await axios.put(`${BACKEND_URL}/folders/rename/${id}`, { newName }, {
      headers: {
        Authorization: `Bearer ${access_token}`, // send access_token
        "Content-Type": "application/json"
      },
    });
    fetchRootFolders();
  };

  const deleteFolder = async (id) => {
    const access_token = localStorage.getItem("access_token"); //  auth access_token
    // console.log(access_token);
    if (!access_token) {
      alert("Not authenticated. Please login.");
      navigate("/login")
      return;
    }

    try {
      // console.log(id);
      await axios.delete(`${BACKEND_URL}/folders/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${access_token}`, // send access_token
          "Content-Type": "multipart/form-data"
        },
      });
      fetchRootFolders();
    } catch (error) {
      console.error(error.message)
      alert("Plaese Login ");
      navigate('/login')

    }
  };


  return (
    <div className="  flex w-full flex-wrap   ">
      <h2 className=" flex justify-center font-bold w-full mb-3">My Folders</h2>
      <div className="flex">

        <div className=" flex  p-2 m-2 justify-center ">


          {folders.map((folder) => (
            <div key={folder.id} className="w-40  border-1 m-2 rounded hover:bg-green-300/20 shadow-md">
              <p className="truncate font-semibold text-l ml-2"   onClick={() => alert( "i work on it ")}>{folder.name}</p>
              <div className="flex justify-between mt-2 text-gray-600">

                <button
                  onClick={() => renameFolder(folder.id)}
                  className="hover:text-green-500 ml-2"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => deleteFolder(folder.id)}
                  className="hover:text-red-500 mr-2"
                >
                  <Trash2 size={18} />
                </button>
              </div>

            </div>
          ))}


        </div>


      </div>




    </div>



  );
}
