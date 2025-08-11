import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../api/axios';
import { toast } from 'react-toastify';

const AdminPendingDetails = () => {
    const { id } = useParams();
    const [adminApp, setAdminApp] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await api.get(`/admins/application/${id}`);
                setAdminApp(response.data.data);
            // eslint-disable-next-line no-unused-vars
            } catch (error) {
                toast.error("Failed to fetch admin application details.");
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, [id]);

    if (loading) return <p>Loading details...</p>;
    if (!adminApp) return <p>Admin application not found.</p>;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Admin Application Details</h1>
            <div className="space-y-2">
                <p><span className="font-semibold">Applicant:</span> {adminApp.fullName}</p>
                <p><span className="font-semibold">Email:</span> {adminApp.email}</p>
                <p><span className="font-semibold">Phone:</span> {adminApp.phone}</p>
                <p><span className="font-semibold">Status:</span> {adminApp.status}</p>
            </div>
            <Link to="/admin/admin-pending-list" className="text-blue-500 hover:underline mt-4 inline-block">
                &larr; Back to list
            </Link>
        </div>
    );
};
export default AdminPendingDetails;