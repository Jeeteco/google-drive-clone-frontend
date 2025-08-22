import { useNavigate } from 'react-router-dom';
import React , {useState} from 'react'
import axios from 'axios';
import FileManager from './FileManager';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const FileUpload = ({onUploadSuccess}) => {

    const  navigate = useNavigate();

    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    // Handle file selection
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    // Handle upload
    const handleUpload = async () => {
        if (!file) {
            alert("Please select a file first!");
            return;
        }

        const access_token = localStorage.getItem("access_token"); //  auth access_token
        // console.log(access_token);
        if (!access_token) {
            alert("Not authenticated. Please login.");
            navigate("/login")
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            setLoading(true);
            // console.log(access_token);
            const res = await axios.post(`${BACKEND_URL}/files/upload`,formData, {
               
                headers: {
                    Authorization: `Bearer ${access_token}`, // send access_token
                     "Content-Type": "multipart/form-data"
                },
               
            });

            // if (!res.ok) {
            //     throw new Error("Upload failed");
            // }

            const data = await res.data;
            alert(`File uploaded: ${data.fileName || file.name}`);
            setFile(null);
             if (onUploadSuccess) onUploadSuccess();

            

        } catch (err) {

            console.error("Upload error:", err.response?.data || err.message);
            
            alert("Upload error:", err.response?.data || err.message);

            navigate("/login");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <input
                type="file"
                accept="*/*"
                onChange={handleFileChange}
                className="mb-4 w-3/4 text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-600
          hover:file:bg-blue-100"
            />

            {file && (
                <p className="text-gray-600 text-sm mb-3">
                    Selected: <span className="font-medium">{file.name}</span>
                </p>
            )}

            <button
                onClick={handleUpload}
                disabled={loading}
                className="w-3/4 bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
            >
                {loading ? "Uploading..." : "Upload"}
            </button>
        </div>
    )
}

export default FileUpload