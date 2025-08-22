import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


const LoginPage = () => {

  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = `${BACKEND_URL}/auth/login`;
      const user = { email, password };

      const res = await axios.post(url, user);

      // The backend should return a access_token
      const { access_token } = res.data.session;
      // console.log(res.data);
     const owner_id =res.data.user.id;
      // Store the access_token in localStorage
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('owner_id',owner_id)
      // console.log(user_id);
      // console.log(access_token);

      console.log('Login successful');
      alert('Login successful!');
      setError('');
      navigate('/fileManager')
      

      // You can now redirect the user to a dashboard or home page
      // window.location.href = '/dashboard';

    } catch (err) {
      console.error(err.response.data);
      alert("please register")
      setError(err.response.data.msg || 'Invalid Credentials');
      navigate("/signup");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-96">

        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <input type="email" placeholder="Email" name='email' value={email} onChange={onChange} required className="border p-2 rounded" />
          <input type="password" placeholder="Password" className="border p-2 rounded" name='password' value={password} onChange={onChange} required  />
          <button className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          Don’t have an account? <a href="/signup" className="text-blue-600">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage