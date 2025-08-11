import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaTachometerAlt, FaPaw, FaListAlt, FaUserClock, FaUsersCog } from 'react-icons/fa'; // Added FaUsersCog
import { useAuth } from '../../hooks/useAuth';

const AdminLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  // Base navigation links available to all admins
  const navLinks = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <FaTachometerAlt /> },
    { name: 'Rescue List', path: '/admin/rescue-list', icon: <FaPaw /> },
    { name: 'Adoption List', path: '/admin/adoption-list', icon: <FaListAlt /> },
  ];

  // Conditionally add links that are only for superadmins
  if (user?.role === 'superadmin') {
    navLinks.push({ name: 'Admin Pending', path: '/admin/admin-pending-list', icon: <FaUserClock /> });
    navLinks.push({ name: 'Manage Admins', path: '/admin/all-admins', icon: <FaUsersCog /> });
  }

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <div className={`bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-200 ease-in-out z-30`}>
        <div className="px-4">
          <h2 className="text-2xl font-extrabold text-white">PetCare Admin</h2>
          <p className="text-sm text-gray-400">Welcome, {user?.fullName || 'Admin'}</p>
        </div>
        <nav>
          {navLinks.map(link => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 ${isActive ? 'bg-gray-900' : ''}`
              }
            >
              {link.icon}
              {link.name}
            </NavLink>
          ))}
        </nav>
        <div className="px-4 absolute bottom-4 w-full left-0">
          <button onClick={handleLogout} className="w-11/12 mx-auto block text-center bg-red-500 py-2.5 px-4 rounded transition duration-200 hover:bg-red-600">
            Logout
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex justify-between md:justify-end items-center p-4 bg-white border-b-2">
          <button className="md:hidden text-2xl" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
          <div className="hidden md:block">
            <h1 className="text-xl font-semibold text-gray-700">Admin Dashboard</h1>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <Outlet /> {/* This is where the content of each admin page will be rendered */}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
