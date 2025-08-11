import React from 'react';
import { Link } from 'react-router-dom';
import { FaPaw, FaListAlt, FaUserClock } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Welcome, {user?.fullName}!</h2>
          <p className="text-gray-600">
            This is your central hub for managing the PetCare platform. Use the links in the sidebar or below to navigate.
          </p>
        </div>

        <Link to="/admin/rescue-list" className="bg-blue-100 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow flex items-center gap-4">
            <FaPaw className="text-3xl text-blue-500" />
            <div>
                <h2 className="text-xl font-semibold text-blue-800">Pending Rescues</h2>
                <p className="text-blue-600">Review new pet submissions.</p>
            </div>
        </Link>
        
        <Link to="/admin/adoption-list" className="bg-green-100 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow flex items-center gap-4">
            <FaListAlt className="text-3xl text-green-500" />
            <div>
                <h2 className="text-xl font-semibold text-green-800">Adoption Applications</h2>
                <p className="text-green-600">Approve new homes for pets.</p>
            </div>
        </Link>

        {user?.role === 'superadmin' && (
            <Link to="/admin/admin-pending-list" className="bg-purple-100 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow flex items-center gap-4">
                <FaUserClock className="text-3xl text-purple-500" />
                <div>
                    <h2 className="text-xl font-semibold text-purple-800">Admin Requests</h2>
                    <p className="text-purple-600">Manage new admin applications.</p>
                </div>
            </Link>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
