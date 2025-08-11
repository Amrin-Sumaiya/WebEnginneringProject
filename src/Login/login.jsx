import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/petrescue/login', { email, password })
      .then(result => {
        console.log(result.data);
        if (result.data.status === "Success") {
         if (result.data.role === "admin"){
           navigate('/admin');
         } else {
          navigate('/')
         }
        } else {
          navigate(result.data.redirect || '/');
        }
      })
      .catch(err => {
        console.error(err);
        alert("Login failed. Please check your server and try again.");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-50 p-4">
      <div className="md:w-1/2 w-full p-8 bg-gradient-to-br from-blue-100 to-purple-100 flex flex-col justify-center">
        <h2 className="text-3xl font-bold text-blue-900 mb-4 text-center">Welcome to Join With Us</h2>
        <p className="text-gray-700 mb-6 text-center">Log in to your account to continue</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 p-2 rounded"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 p-2 rounded"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition mt-2"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-gray-700">
          Don't have an account?{' '}
          <button
            onClick={() => navigate('/signup')}
            className="text-blue-600 font-semibold hover:underline"
          >
            Create Account
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;