import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { toast } from 'react-toastify';
import api from '../api/axios';

const AdoptForm = () => {
  const { petId } = useParams();
  const navigate = useNavigate();

  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [formData, setFormData] = useState({
    adopterName: '',
    adopterEmail: '',
    adopterPhone: '',
    adopterAge: '',
    experienceWithPets: '',
  });

  useEffect(() => {
    const fetchPetDetails = async () => {
      try {
        const response = await api.get(`/pets/${petId}`);
        setPet(response.data.data);
      } catch (error) {
        console.error("Failed to fetch pet details:", error);
        toast.error("Could not load pet details. It may no longer exist.");
        navigate('/browse');
      } finally {
        setLoading(false);
      }
    };

    if (petId) {
      fetchPetDetails();
    }
  }, [petId, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // ✨ --- NEW VALIDATION LOGIC --- ✨
    // Check if age is a positive number
    if (parseInt(formData.adopterAge, 10) <= 0) {
        toast.error("Age must be a valid positive number.");
        return; // Stop the submission if validation fails
    }
    // You can add more validation checks here, e.g., for phone number format.

    setFormLoading(true);
    try {
      const response = await api.post(`/adoptions/apply/${petId}`, formData);
      if (response.status === 201) {
        toast.success('Application submitted successfully! An admin will review it.');
        navigate('/');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Submission failed.');
    } finally {
      setFormLoading(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex justify-center items-center"><p>Loading Pet Information...</p></div>;
  }

  if (!pet) {
    return <div className="min-h-screen flex justify-center items-center"><p>Pet could not be found.</p></div>;
  }

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col lg:flex-row items-center">
      
      {/* Map Section */}
      <div className="lg:w-1/2 w-full p-4">
        <h2 className="text-2xl font-bold text-center mb-4">Pet's Location</h2>
        <MapContainer 
          center={[pet.latitude, pet.longitude]} 
          zoom={14} 
          scrollWheelZoom={false} 
          style={{ height: "50vh", width: "100%", borderRadius: '8px' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[pet.latitude, pet.longitude]}>
            <Popup>
              {pet.petName} is waiting here!
            </Popup>
          </Marker>
        </MapContainer>
      </div>

      {/* Form Section */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-8">
        <div className="max-w-lg w-full">
          <h2 className="text-3xl font-bold text-center mb-4">Apply to Adopt {pet.petName}</h2>
          <p className="text-center text-gray-700 mb-8">
            Please fill out the form below. Your application will be sent to our admin team for review.
          </p>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col md:col-span-2">
              <label className="mb-1 font-medium">Full Name</label>
              <input type="text" name="adopterName" value={formData.adopterName} onChange={handleChange} required className="border rounded p-2" />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-medium">Email</label>
              <input type="email" name="adopterEmail" value={formData.adopterEmail} onChange={handleChange} required className="border rounded p-2" />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-medium">Phone Number</label>
              <input type="tel" name="adopterPhone" value={formData.adopterPhone} onChange={handleChange} required className="border rounded p-2" />
            </div>
            <div className="flex flex-col md:col-span-2">
              <label className="mb-1 font-medium">Your Age</label>
              <input type="number" name="adopterAge" value={formData.adopterAge} onChange={handleChange} required className="border rounded p-2" />
            </div>
            <div className="flex flex-col md:col-span-2">
              <label className="mb-1 font-medium">Your Experience with Pets</label>
              <textarea 
                name="experienceWithPets" 
                value={formData.experienceWithPets} 
                onChange={handleChange} 
                required 
                className="border rounded p-2" 
                rows="4"
              ></textarea>
            </div>
            
            <div className="md:col-span-2 flex flex-col sm:flex-row gap-4 mt-4">
              <button 
                type="submit" 
                disabled={formLoading}
                className="bg-blue-600 text-white w-full sm:w-auto flex-1 py-3 rounded-md font-semibold hover:bg-blue-700 transition disabled:bg-gray-400"
              >
                {formLoading ? 'Submitting...' : 'Submit Application'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/browse')}
                className="bg-gray-600 text-white w-full sm:w-auto flex-1 py-3 rounded-md font-semibold hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdoptForm;
