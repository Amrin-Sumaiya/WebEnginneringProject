import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../api/axios';
import { toast } from 'react-toastify';

const RescueDetails = () => {
    const { id } = useParams();
    const [rescue, setRescue] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                // ✨ FIX: Use the new admin-specific endpoint ✨
                const response = await api.get(`/pets/admin/${id}`);
                setRescue(response.data.data);
            // eslint-disable-next-line no-unused-vars
            } catch (error) {
                toast.error("Failed to fetch rescue details.");
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, [id]);

    if (loading) return <p>Loading details...</p>;
    if (!rescue) return <p>Rescue request not found.</p>;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Rescue Request Details</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h3 className="text-lg font-semibold border-b mb-2 pb-1">Pet Information</h3>
                    <p><span className="font-semibold">Pet Name:</span> {rescue.petName}</p>
                    <p><span className="font-semibold">Category:</span> {rescue.petCategory}</p>
                    <p><span className="font-semibold">Breed:</span> {rescue.petBreed}</p>
                    <p><span className="font-semibold">Gender:</span> {rescue.gender}</p>
                    <p><span className="font-semibold">Address:</span> {rescue.address}</p>
                </div>
                <div>
                    <h3 className="text-lg font-semibold border-b mb-2 pb-1">Rescuer Information</h3>
                    <p><span className="font-semibold">Name:</span> {rescue.rescuerName}</p>
                    <p><span className="font-semibold">Email:</span> {rescue.rescuerEmail}</p>
                    <p><span className="font-semibold">Phone:</span> {rescue.rescuerPhone}</p>
                    <p><span className="font-semibold">Age:</span> {rescue.rescuerAge}</p>
                </div>
                <div className="md:col-span-2 mt-4">
                    <img src={rescue.petImage} alt={rescue.petName} className="max-w-sm w-full rounded-lg shadow-lg" />
                </div>
            </div>
            <Link to="/admin/rescue-list" className="text-blue-500 hover:underline mt-6 inline-block">
                &larr; Back to list
            </Link>
        </div>
    );
};

export default RescueDetails;