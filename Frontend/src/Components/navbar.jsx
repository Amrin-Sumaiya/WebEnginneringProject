import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; // Import our new auth hook
import logo from '../assets/images/logo.png';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // Get the user and logout function from the context

  const handleLogout = () => {
    logout(); // This clears the user state and removes the token
    navigate('/'); // Redirect to the homepage after logout
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="bg-blue-200 mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo & Title */}
        <Link to="/" className="flex items-center gap-3 cursor-pointer">
          <img src={logo} alt="PetRescue Logo" className="h-10 w-10 object-contain" />
          <h1 className="text-2xl font-bold text-blue-900">PetGuard</h1>
        </Link>

        {/* Navigation Links */}
        <div className="space-x-6 flex items-center">
          <Link to="/" className="bg-amber-50 rounded-lg h-9 px-4 flex items-center border-black text-blue-800 hover:bg-purple-200 font-bold hover:text-blue-500">
            Home
          </Link>
          <Link to="/browse" className="bg-amber-50 h-9 px-4 flex items-center rounded-lg text-blue-800 hover:bg-purple-200 font-bold hover:text-blue-500">
            Browse Pets
          </Link>

          {/* Conditional rendering based on if the 'user' object exists */}
          {user ? (
            <>
              <Link
                to="/admin"
                className="bg-amber-50 h-9 px-4 flex items-center rounded-lg text-blue-800 font-bold hover:text-blue-500"
              >
                Admin Panel
              </Link>
              
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white h-9 px-4 font-bold rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/admin/login" // The route for our new admin login page
              className="bg-amber-50 h-9 px-4 flex items-center rounded-lg text-blue-800 hover:bg-purple-200 font-bold hover:text-blue-500"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
