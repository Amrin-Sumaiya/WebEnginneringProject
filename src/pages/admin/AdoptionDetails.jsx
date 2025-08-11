import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../api/axios';
import { toast } from 'react-toastify';

const AdoptionDetails = () => {
    const { id } = useParams();
    const [adoption, setAdoption] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await api.get(`/adoptions/${id}`);
                setAdoption(response.data.data);
            // eslint-disable-next-line no-unused-vars
            } catch (error) {
                toast.error("Failed to fetch adoption details.");
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, [id]);

    if (loading) return <p>Loading details...</p>;
    if (!adoption) return <p>Adoption application not found.</p>;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Adoption Application Details</h1>
            <div className="space-y-2">
                <p><span className="font-semibold">Applicant:</span> {adoption.adopterName}</p>
                <p><span className="font-semibold">Email:</span> {adoption.adopterEmail}</p>
                <p><span className="font-semibold">Phone:</span> {adoption.adopterPhone}</p>
                <p><span className="font-semibold">Age:</span> {adoption.adopterAge}</p>
                <p><span className="font-semibold">Pet Name:</span> {adoption.petId?.petName || 'N/A'}</p>
                <p><span className="font-semibold">Experience:</span> {adoption.experienceWithPets}</p>
                <p><span className="font-semibold">Status:</span> {adoption.status}</p>
            </div>
            <Link to="/admin/adoption-list" className="text-blue-500 hover:underline mt-4 inline-block">
                &larr; Back to list
            </Link>
        </div>
    );
};
export default AdoptionDetails;