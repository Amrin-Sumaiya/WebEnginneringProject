// import React, { useState, useEffect } from 'react';
// import api from '../../api/axios';
// import { toast } from 'react-toastify';

// // --- RescueList Component ---
// export const RescueList = () => {
//   const [rescues, setRescues] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchRescues = async () => {
//     setLoading(true);
//     try {
//       const response = await api.get('/pets/pending');
//       setRescues(response.data.data);
//     // eslint-disable-next-line no-unused-vars
//     } catch (error) {
//       toast.error("Failed to fetch pending rescues.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchRescues();
//   }, []);

//   const handleApprove = async (petId) => {
//     try {
//       await api.patch(`/pets/approve-rescue/${petId}`);
//       toast.success("Rescue approved!");
//       fetchRescues(); // Refresh the list
//     // eslint-disable-next-line no-unused-vars
//     } catch (error) {
//       toast.error("Approval failed.");
//     }
//   };

//   const handleReject = async (petId) => {
//     if (!window.confirm("Are you sure you want to reject this rescue request?")) return;
//     try {
//       await api.delete(`/pets/reject-rescue/${petId}`);
//       toast.warn("Rescue rejected.");
//       fetchRescues(); // Refresh the list
//     // eslint-disable-next-line no-unused-vars
//     } catch (error) {
//       toast.error("Rejection failed.");
//     }
//   };

//   return (
//     <div>
//         <h1 className="text-2xl font-bold mb-4 text-gray-800">Pending Rescue Requests</h1>
//         {loading ? <p>Loading...</p> : (
//             <div className="bg-white p-4 rounded-lg shadow-md">
//                 {rescues.length > 0 ? rescues.map(r => (
//                     <div key={r._id} className="flex flex-wrap justify-between items-center border-b p-3 gap-2">
//                         <div>
//                             <p className="font-bold text-lg">{r.petName} <span className="font-normal text-gray-600">({r.petBreed})</span></p>
//                             <p className="text-sm text-gray-500">Rescuer: {r.rescuerName} ({r.rescuerEmail})</p>
//                         </div>
//                         <div className="flex gap-2">
//                             <button onClick={() => handleApprove(r._id)} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition">Approve</button>
//                             <button onClick={() => handleReject(r._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">Reject</button>
//                         </div>
//                     </div>
//                 )) : <p>No pending rescue requests.</p>}
//             </div>
//         )}
//     </div>
//   );
// };


// // --- AdoptionList Component ---
// export const AdoptionList = () => {
//   const [adoptions, setAdoptions] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchAdoptions = async () => {
//     setLoading(true);
//     try {
//       const response = await api.get('/adoptions/pending');
//       setAdoptions(response.data.data);
//     // eslint-disable-next-line no-unused-vars
//     } catch (error) {
//       toast.error("Failed to fetch pending adoptions.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAdoptions();
//   }, []);

//   const handleApprove = async (adoptionId) => {
//     try {
//       await api.patch(`/adoptions/approve/${adoptionId}`);
//       toast.success("Adoption approved!");
//       fetchAdoptions();
//     // eslint-disable-next-line no-unused-vars
//     } catch (error) {
//       toast.error("Approval failed.");
//     }
//   };

//   const handleReject = async (adoptionId) => {
//     if (!window.confirm("Are you sure? This will make the pet available again.")) return;
//     try {
//       await api.delete(`/adoptions/reject/${adoptionId}`);
//       toast.warn("Adoption rejected.");
//       fetchAdoptions();
//     // eslint-disable-next-line no-unused-vars
//     } catch (error) {
//       toast.error("Rejection failed.");
//     }
//   };

//   return (
//     <div>
//         <h1 className="text-2xl font-bold mb-4 text-gray-800">Pending Adoption Applications</h1>
//         {loading ? <p>Loading...</p> : (
//             <div className="bg-white p-4 rounded-lg shadow-md">
//                 {adoptions.length > 0 ? adoptions.map(item => (
//                     <div key={item._id} className="flex flex-wrap justify-between items-center border-b p-3 gap-2">
//                         <div>
//                             <p className="font-bold text-lg">{item.adopterName}</p>
//                             <p className="text-sm text-gray-600">Wants to adopt: <span className="font-semibold">{item.petId?.petName || 'N/A'}</span></p>
//                             <p className="text-xs text-gray-500">Contact: {item.adopterEmail}</p>
//                         </div>
//                         <div className="flex gap-2">
//                             <button onClick={() => handleApprove(item._id)} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition">Approve</button>
//                             <button onClick={() => handleReject(item._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">Reject</button>
//                         </div>
//                     </div>
//                 )) : <p>No pending adoption applications.</p>}
//             </div>
//         )}
//     </div>
//   );
// };


// // --- AdminPendingList Component ---
// export const AdminPendingList = () => {
//   const [pendingAdmins, setPendingAdmins] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   const fetchPendingAdmins = async () => {
//     setLoading(true);
//     try {
//       const response = await api.get('/admins/pending-applications');
//       setPendingAdmins(response.data.data);
//     } catch (err) {
//       setError(err.response?.data?.message || 'You may not have permission to view this page.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPendingAdmins();
//   }, []);

//   const handleApprove = async (adminId) => {
//     try {
//       await api.patch(`/admins/approve/${adminId}`);
//       toast.success("Admin approved!");
//       fetchPendingAdmins();
//     // eslint-disable-next-line no-unused-vars
//     } catch (error) {
//       toast.error("Approval failed.");
//     }
//   };

//   const handleReject = async (adminId) => {
//     if (!window.confirm("Are you sure you want to reject this admin application?")) return;
//     try {
//       await api.patch(`/admins/reject/${adminId}`);
//       toast.warn("Admin rejected.");
//       fetchPendingAdmins();
//     // eslint-disable-next-line no-unused-vars
//     } catch (error) {
//       toast.error("Rejection failed.");
//     }
//   };

//   return (
//     <div>
//         <h1 className="text-2xl font-bold mb-4 text-gray-800">Pending Admin Applications</h1>
//         {loading ? <p>Loading...</p> : error ? <p className="text-red-500">{error}</p> : (
//             <div className="bg-white p-4 rounded-lg shadow-md">
//                 {pendingAdmins.length > 0 ? pendingAdmins.map(admin => (
//                     <div key={admin._id} className="flex justify-between items-center border-b p-3">
//                         <div>
//                             <p className="font-bold text-lg">{admin.fullName}</p>
//                             <p className="text-sm text-gray-500">{admin.email}</p>
//                         </div>
//                         <div className="flex gap-2">
//                             <button onClick={() => handleApprove(admin._id)} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition">Approve</button>
//                             <button onClick={() => handleReject(admin._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">Reject</button>
//                         </div>
//                     </div>
//                 )) : <p>No pending admin applications.</p>}
//             </div>
//         )}
//     </div>
//   );
// };


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import api from '../../api/axios';
import { toast } from 'react-toastify';

// --- RescueList Component ---
export const RescueList = () => {
  const [rescues, setRescues] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRescues = async () => {
    setLoading(true);
    try {
      const response = await api.get('/pets/pending');
      setRescues(response.data.data);
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("Failed to fetch pending rescues.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRescues();
  }, []);

  const handleApprove = async (petId) => {
    try {
      await api.patch(`/pets/approve-rescue/${petId}`);
      toast.success("Rescue approved!");
      fetchRescues(); // Refresh the list
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("Approval failed.");
    }
  };

  const handleReject = async (petId) => {
    if (!window.confirm("Are you sure you want to reject this rescue request?")) return;
    try {
      await api.delete(`/pets/reject-rescue/${petId}`);
      toast.warn("Rescue rejected.");
      fetchRescues(); // Refresh the list
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("Rejection failed.");
    }
  };

  return (
    <div>
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Pending Rescue Requests</h1>
        {loading ? <p>Loading...</p> : (
            <div className="bg-white p-4 rounded-lg shadow-md">
                {rescues.length > 0 ? rescues.map(r => (
                    // Each list item is now a link to its details page
                    <Link to={`/admin/rescue-details/${r._id}`} key={r._id} className="block hover:bg-gray-50 rounded-lg">
                        <div className="flex flex-wrap justify-between items-center border-b p-3 gap-2">
                            <div>
                                <p className="font-bold text-lg">{r.petName} <span className="font-normal text-gray-600">({r.petBreed})</span></p>
                                <p className="text-sm text-gray-500">Rescuer: {r.rescuerName} ({r.rescuerEmail})</p>
                            </div>
                            <div className="flex gap-2">
                                {/* e.preventDefault() stops the link from navigating when a button is clicked */}
                                <button onClick={(e) => { e.preventDefault(); handleApprove(r._id); }} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition z-10 relative">Approve</button>
                                <button onClick={(e) => { e.preventDefault(); handleReject(r._id); }} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition z-10 relative">Reject</button>
                            </div>
                        </div>
                    </Link>
                )) : <p>No pending rescue requests.</p>}
            </div>
        )}
    </div>
  );
};


// --- AdoptionList Component ---
export const AdoptionList = () => {
  const [adoptions, setAdoptions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAdoptions = async () => {
    setLoading(true);
    try {
      const response = await api.get('/adoptions/pending');
      setAdoptions(response.data.data);
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("Failed to fetch pending adoptions.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdoptions();
  }, []);

  const handleApprove = async (adoptionId) => {
    try {
      await api.patch(`/adoptions/approve/${adoptionId}`);
      toast.success("Adoption approved!");
      fetchAdoptions();
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("Approval failed.");
    }
  };

  const handleReject = async (adoptionId) => {
    if (!window.confirm("Are you sure? This will make the pet available again.")) return;
    try {
      await api.delete(`/adoptions/reject/${adoptionId}`);
      toast.warn("Adoption rejected.");
      fetchAdoptions();
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("Rejection failed.");
    }
  };

  return (
    <div>
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Pending Adoption Applications</h1>
        {loading ? <p>Loading...</p> : (
            <div className="bg-white p-4 rounded-lg shadow-md">
                {adoptions.length > 0 ? adoptions.map(item => (
                    // Each list item is now a link to its details page
                    <Link to={`/admin/adoption-details/${item._id}`} key={item._id} className="block hover:bg-gray-50 rounded-lg">
                        <div className="flex flex-wrap justify-between items-center border-b p-3 gap-2">
                            <div>
                                <p className="font-bold text-lg">{item.adopterName}</p>
                                <p className="text-sm text-gray-600">Wants to adopt: <span className="font-semibold">{item.petId?.petName || 'N/A'}</span></p>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={(e) => { e.preventDefault(); handleApprove(item._id); }} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition z-10 relative">Approve</button>
                                <button onClick={(e) => { e.preventDefault(); handleReject(item._id); }} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition z-10 relative">Reject</button>
                            </div>
                        </div>
                    </Link>
                )) : <p>No pending adoption applications.</p>}
            </div>
        )}
    </div>
  );
};


// --- AdminPendingList Component ---
export const AdminPendingList = () => {
  const [pendingAdmins, setPendingAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPendingAdmins = async () => {
    setLoading(true);
    try {
      const response = await api.get('/admins/pending-applications');
      setPendingAdmins(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'You may not have permission to view this page.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingAdmins();
  }, []);

  const handleApprove = async (adminId) => {
    try {
      await api.patch(`/admins/approve/${adminId}`);
      toast.success("Admin approved!");
      fetchPendingAdmins();
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("Approval failed.");
    }
  };

  const handleReject = async (adminId) => {
    if (!window.confirm("Are you sure you want to reject this admin application?")) return;
    try {
      await api.patch(`/admins/reject/${adminId}`);
      toast.warn("Admin rejected.");
      fetchPendingAdmins();
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("Rejection failed.");
    }
  };

  return (
    <div>
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Pending Admin Applications</h1>
        {loading ? <p>Loading...</p> : error ? <p className="text-red-500">{error}</p> : (
            <div className="bg-white p-4 rounded-lg shadow-md">
                {pendingAdmins.length > 0 ? pendingAdmins.map(admin => (
                    // Each list item is now a link to its details page
                    <Link to={`/admin/admin-pending-details/${admin._id}`} key={admin._id} className="block hover:bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-center border-b p-3">
                            <div>
                                <p className="font-bold text-lg">{admin.fullName}</p>
                                <p className="text-sm text-gray-500">{admin.email}</p>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={(e) => { e.preventDefault(); handleApprove(admin._id); }} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition z-10 relative">Approve</button>
                                <button onClick={(e) => { e.preventDefault(); handleReject(admin._id); }} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition z-10 relative">Reject</button>
                            </div>
                        </div>
                    </Link>
                )) : <p>No pending admin applications.</p>}
            </div>
        )}
    </div>
  );
};


