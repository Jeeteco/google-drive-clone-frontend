import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import dotenv from "dotenv"
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;





const SignupPage = () => {
  const navigate=useNavigate();
   
  // console.log(BACKEND_URL);  

  const [formData, setFormdata] = useState ({
    email: '',
    password: '',
    full_name: ''
  })
  //  const backend_Url = process.env.backend_url;

  const [error, setError] = useState('');

  const { email, password, full_name } = formData;

  const onChange = (e) => {
  setFormdata({
    ...formData,
    [e.target.name]: e.target.value
  });
};



  const onSubmit = async (e) => {
    e.preventDefault(); //avoid refresing

    try {

     
      const url=`${BACKEND_URL}/auth/register`
      // const url='http://localhost:5000/auth/register';
      const newUser = { full_name, email, password };

      const res = await axios.post(url, newUser);

      console.log('Registration successful:', res.data);
      alert('Registration successful! Please log in.');
      setError('');



    } catch (err) {

      alert("Confirm your Email and Login to app")

      setFormdata({
        email:'',
        password:'',
        full_name:''
      })

      navigate("/login");

      // console.error(err.response.data);
      setError(err.response.data.msg || "confirm your email");
    }

  };






  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        
        <form className="flex flex-col gap-4"  onSubmit={onSubmit}>

          <input type="text" placeholder="Fullname" name="full_name" value={full_name} onChange={onChange} required className="border p-2 rounded" />


          <input type="email" placeholder="Email" name="email" value={email} onChange={onChange} required className="border p-2 rounded" />


          <input type="password" placeholder="Password" name="password" value={password} onChange={onChange} required className="border p-2 rounded" />

          <button className="bg-green-600 text-white py-2 rounded hover:bg-green-700" type='submit'>
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          Already have an account? <a href="/login" className="text-blue-600">Login</a>
        </p>
      </div>
    </div>
  );
}

export default SignupPage