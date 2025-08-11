import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import api from '../api/axios';
import { toast } from 'react-toastify';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post('/admins/login', { email, password });
      login(response.data.data.accessToken);
      toast.success("Login successful!");
      navigate('/admin/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-50 p-4">
      <div className="w-full max-w-md p-8 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-blue-900 mb-4 text-center">Admin Portal</h2>
        <p className="text-gray-700 mb-6 text-center">Log in to your account to continue</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 transition"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 transition"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition mt-2 font-semibold disabled:bg-gray-400"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="mt-6 text-center text-gray-700">
          Want to become an admin?{' '}
          <Link
            to="/apply-for-admin"
            className="text-blue-600 font-semibold hover:underline"
          >
            Apply Here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AdminLoginPage;
