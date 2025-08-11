import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../api/axios'; // Import our configured axios instance

const Rescue = () => {
  // State to hold all form data
  const [formData, setFormData] = useState({
    rescuerName: '',
    rescuerAge: '',
    rescuerEmail: '',
    rescuerPhone: '',
    address: '',
    petName: '',
    petCategory: '',
    petBreed: '',
    gender: '',
    petImage: '', // This will hold the image URL
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Handle input changes and update state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Basic validation to ensure no fields are empty
    for (const key in formData) {
        if (formData[key] === '') {
            toast.error('All fields are required!');
            setLoading(false);
            return;
        }
    }

    try {
      // Make the API call to the backend endpoint we created
      const response = await api.post('/pets/rescue-request', formData);
      
      if (response.status === 201) {
        toast.success('Rescue request submitted! An admin will review it shortly.');
        navigate('/');
      }
    } catch (error) {
      // Display error message from the backend, or a generic one
      toast.error(error.response?.data?.message || 'Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-purple-50 flex flex-col items-center justify-center p-4">
      <section className="bg-gradient-to-r from-blue-100 to-purple-100 p-8 rounded-lg shadow-lg text-center max-w-4xl w-full">
        <h2 className="text-3xl font-bold text-blue-900 mb-4">Submit a Pet for Rescue</h2>
        <p className="text-gray-700 mb-6">
          Found a pet in need? Fill out the form below to list it for adoption.
        </p>

        {/* The form now calls our new handleSubmit function */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          
          {/* --- Rescuer's Information --- */}
          <h3 className="md:col-span-2 text-xl font-semibold text-gray-800 border-b pb-2">Your Information</h3>
          <div>
            <label className="font-medium">Full Name</label>
            <input type="text" name="rescuerName" value={formData.rescuerName} onChange={handleChange} required className="w-full p-2 border rounded mt-1" />
          </div>
          <div>
            <label className="font-medium">Age</label>
            <input type="number" name="rescuerAge" value={formData.rescuerAge} onChange={handleChange} required className="w-full p-2 border rounded mt-1" />
          </div>
          <div>
            <label className="font-medium">Email</label>
            <input type="email" name="rescuerEmail" value={formData.rescuerEmail} onChange={handleChange} required className="w-full p-2 border rounded mt-1" />
          </div>
          <div>
            <label className="font-medium">Phone</label>
            <input type="tel" name="rescuerPhone" value={formData.rescuerPhone} onChange={handleChange} required className="w-full p-2 border rounded mt-1" />
          </div>
          <div className="md:col-span-2">
            <label className="font-medium">Address (for pet's location)</label>
            <textarea name="address" value={formData.address} onChange={handleChange} required className="w-full p-2 border rounded mt-1"></textarea>
          </div>

          {/* --- Pet's Information --- */}
          <h3 className="md:col-span-2 text-xl font-semibold text-gray-800 border-b pb-2 mt-4">Pet's Information</h3>
          <div>
            <label className="font-medium">Pet's Name</label>
            <input type="text" name="petName" value={formData.petName} onChange={handleChange} required className="w-full p-2 border rounded mt-1" />
          </div>
          <div>
            <label className="font-medium">Pet's Breed</label>
            <input type="text" name="petBreed" value={formData.petBreed} onChange={handleChange} required className="w-full p-2 border rounded mt-1" />
          </div>
          <div>
            <label className="font-medium">Pet's Gender</label>
            <select name="gender" value={formData.gender} onChange={handleChange} required className="w-full p-2 border rounded mt-1">
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div>
            <label className="font-medium">Pet's Category</label>
            <select name="petCategory" value={formData.petCategory} onChange={handleChange} required className="w-full p-2 border rounded mt-1">
              <option value="">Select Category</option>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Bird">Bird</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="font-medium">Pet Image URL</label>
            <input type="text" name="petImage" placeholder="https://example.com/image.jpg" value={formData.petImage} onChange={handleChange} required className="w-full p-2 border rounded mt-1" />
            {/* Note: A real application would use a file upload service like Cloudinary. For now, we accept a URL as per our backend setup. */}
          </div>

          <div className="md:col-span-2 flex flex-col sm:flex-row gap-4 mt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition w-full sm:w-auto disabled:bg-gray-400"
            >
              {loading ? 'Submitting...' : 'Submit Request'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition w-full sm:w-auto"
            >
              Cancel
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Rescue;