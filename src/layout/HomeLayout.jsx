import React from 'react'
import { useNavigate } from 'react-router-dom'
import cloudImage from '../assets/2779585.jpg'

const HomeLayout = () => {
  const onclick=()=>{
    const token=localStorage.getItem("access_token");

    if(!token){
      navigate('/login');
    }else{
      navigate('/filemanager')
      // alert(token)
    }
  }
  const navigate = useNavigate();
  return (
    <div className='w-full  p-10 flex flex-wrap justify-centre bg-gradient-to-r from-blue-800/50  to-red-200/80 to-green-800/40  border-2 h-screen'>
      <div className='w-full h-fit  ' >

        <i> <h1 className=' gap-2 tracking-wider flex justify-center font-extrabold text-4xl text-shadow-l  rounded-xl  '> Welcome <u>GD</u> Drive Storage</h1></i>
      </div>
      <div>

        <div className='p-10 flex justify-between flex-wrap'>
          <div className="w-100 h-100 mt-40 ml-10 justify-center">
            <h1
              onClick={onclick}
              className="cursor-pointer gap-2 tracking-wider flex justify-center font-extrabold text-3xl 
                   shadow-lg shadow-green-400/40 p-6 bg-white rounded-xl 
                   bg-gradient-to-r from-blue-600/30 to-green-800/30 
                   hover:scale-105 transition-transform duration-300"
            >
              Cloud Storage
            </h1>

          </div>
          <div className="ml-100 mt-10 flex justify-center">
            <img 
              onClick={onclick}
              src={cloudImage}
              alt="Cloud Storage"
              className="w-[400px] h-[300px] object-contain drop-shadow-xl rounded-xl hover:scale-105 transition-transform duration-300 rounded" 
            />
           
          </div>
           <h1 className='m-auto flex justify-center align-center text-3xl border rounde text-brown-600 bg-gradient-to-r from-pink-400/40 to-yellow-300/40 w-fit'>“The cloud is your digital backpack — always with you, never heavy.”</h1>
        </div>
        
      </div>
    </div>
  )
}

export default HomeLayout