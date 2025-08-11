import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { toast } from 'react-toastify';

const AdminApplyPage = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState(''); 
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/admins/apply', { fullName, email, phone });
      toast.success("Application submitted! An admin will review it shortly.");
      navigate('/admin/login'); // Redirect to login page after applying
    } catch (err) {
      toast.error(err.response?.data?.message || "Application failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-50 p-4">
      <div className="w-full max-w-md p-8 bg-gradient-to-br from-green-100 to-teal-100 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-teal-900 mb-4 text-center">Apply for Admin Role</h2>
        <p className="text-gray-700 mb-6 text-center">Fill out the form to request access.</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-teal-500 transition"
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-teal-500 transition"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="tel" // Use type="tel" for phone numbers
            placeholder="Phone Number"
            className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-teal-500 transition"
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-teal-600 text-white py-3 rounded-md hover:bg-teal-700 transition mt-2 font-semibold disabled:bg-gray-400"
          >
            {loading ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>
        <p className="mt-6 text-center text-gray-700">
          Already have an account?{' '}
          <Link
            to="/admin/login"
            className="text-teal-600 font-semibold hover:underline"
          >
            Login Here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AdminApplyPage;