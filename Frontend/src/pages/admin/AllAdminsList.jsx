import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { toast } from 'react-toastify';

const AllAdminsList = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const response = await api.get('/admins/all');
      setAdmins(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'You may not have permission to view this page.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleRemove = async (adminId, adminName) => {
    if (!window.confirm(`Are you sure you want to remove ${adminName}? This action cannot be undone.`)) return;
    try {
      await api.delete(`/admins/remove/${adminId}`);
      toast.success("Admin removed successfully.");
      fetchAdmins(); // Refresh the list
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to remove admin.");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Manage All Admins</h1>
      {loading ? <p>Loading...</p> : error ? <p className="text-red-500">{error}</p> : (
        <div className="bg-white p-4 rounded-lg shadow-md">
          {admins.length > 0 ? admins.map(admin => (
            <div key={admin._id} className="flex justify-between items-center border-b p-3">
              <div>
                <p className="font-bold text-lg">{admin.fullName}</p>
                <p className="text-sm text-gray-500">{admin.email}</p>
              </div>
              <button 
                onClick={() => handleRemove(admin._id, admin.fullName)} 
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Remove
              </button>
            </div>
          )) : <p>No other admins found.</p>}
        </div>
      )}
    </div>
  );
};

export default AllAdminsList;
