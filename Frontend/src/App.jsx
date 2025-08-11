
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// --- Core App Structure ---
import Navbar from './Components/navbar.jsx'; // Your corrected Navbar
import Footer from './Components/footer.jsx';   // Your Footer
import { useAuth } from './hooks/useAuth';     // Our Auth Hook

// --- Page Components ---
// NOTE: Please ensure all these files exist in the correct folders.
import HomePage from './pages/HomePage.jsx';
import Browse from './pages/browse.jsx';
import AdoptForm from './pages/AdoptForm.jsx';
import Rescue from './pages/rescue.jsx';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminApplyPage from './pages/AdminApplyPage.jsx';
import AdminLayout from './pages/admin/AdminLayout.jsx';
import Dashboard from './pages/admin/Dashboard.jsx';
import RescueDetails from './pages/admin/RescueDetails.jsx';
import AdoptionDetails from './pages/admin/AdoptionDetails.jsx';
import AdminPendingDetails from './pages/admin/AdminPendingList.jsx';
// import RescueList from './pages/admin/RescueList.jsx';
// import AdoptionList from './pages/admin/AdoptionList.jsx';
// import AdminPendingList from './pages/admin/AdminPendingList.jsx';
import { RescueList, AdoptionList, AdminPendingList } from './pages/admin/ListPages.jsx';
import AllAdminsList from './pages/admin/AllAdminsList.jsx';

// This component protects routes that only logged-in admins can see.
const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();
    // If there's a user, show the page. Otherwise, redirect to the login page.
    return user ? children : <Navigate to="/admin/login" replace />;
};


const App = () => {
  // The <Router> and old `isAdmin` state are removed. 
  // The router is in main.jsx and auth state is in AuthContext.
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      {/* Your Navbar will be displayed on every page */}
      <Navbar />

      <main className="min-h-screen bg-gray-50">
        <Routes>
          {/* --- Public-Facing Routes --- */}
          <Route path="/" element={<HomePage />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/adopt/:petId" element={<AdoptForm />} />
          <Route path="/rescue" element={<Rescue />} />
          <Route path="/apply-for-admin" element={<AdminApplyPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          
          {/* --- Secure Admin Routes --- */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            {/* When you go to /admin, it will automatically redirect to the dashboard */}
            <Route index element={<Navigate to="dashboard" replace />} /> 
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="rescue-list" element={<RescueList />} />
            <Route path="adoption-list" element={<AdoptionList />} />
            <Route path="admin-pending-list" element={<AdminPendingList />} />
            <Route path="all-admins" element={<AllAdminsList />} />
            <Route path="rescue-details/:id" element={<RescueDetails />} />
            <Route path="adoption-details/:id" element={<AdoptionDetails />} />
            <Route path="admin-pending-details/:id" element={<AdminPendingDetails />} />
          </Route>

        </Routes>
      </main>

      {/* Your Footer will be displayed on every page */}
      <Footer />
    </>
  );
};

export default App;
