import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


const createAcc = () => {
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:3001/petrescue', {name, email, password})
    .then(result => console.log(result))
    navigate('/login')
    .catch(err=> console.log(err))
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100 p-4">
      <div className="max-w-md w-full p-6 rounded-2xl shadow-xl bg-white">
        <h1 className="text-2xl font-bold text-center mb-4 text-blue-800">
          Create Your Account
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full border border-gray-300 p-2 rounded"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 p-2 rounded"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 p-2 rounded"
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex items-center space-x-2">
            <input type="checkbox" id="terms" />
            <label htmlFor="terms" className="text-sm text-gray-600">
              I agree to the Terms and Privacy Policy
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-gray-700 text-white p-2 rounded"
          >
            Create Account
          </button>

        </form>
      </div>
    </div>
  );
};

export default createAcc;
