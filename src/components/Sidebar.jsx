import { useNavigate } from "react-router-dom";
import { PlusCircle, Folder, Trash2, LogOut } from "lucide-react";

export default function Sidebar() {
  const navigate = useNavigate();
  const handleLogout=()=>{
    localStorage.removeItem("access_token");
    navigate("/login")
  }

  return (
    <div className="h-screen p-4">
        <aside className="h-9/10 w-56 bg-white shadow-xl p-4 mt-6 flex flex-col gap-4">
      <h1 
        onClick={() => navigate("/")}
        className="text-xl font-extrabold text-sky-600 cursor-pointer  mb-6"
      >
        GD Drive 
      </h1>

      <nav className="flex flex-col gap-3">
        <button
        
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-sky-100 text-gray-700 font-medium transition"
        >
          <PlusCircle className="text-sky-500" size={18} />
          New
        </button>

        <button
          onClick={() => navigate("/fileManager")}
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-sky-100 text-gray-700 font-medium transition"
        >
          <Folder className="text-green-500" size={18} />
          My Drive
        </button>

        <button
          onClick={() => navigate("/trash")}
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-100 text-gray-700 font-medium transition"
        >
          <Trash2 className="text-red-500" size={18} />
          Trash
        </button>

         <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-100 text-gray-700 font-medium transition"
        >
          <LogOut className="text-red-500" size={18} />
           logout

        </button>
      </nav>
    </aside>
    </div>
  );
}
