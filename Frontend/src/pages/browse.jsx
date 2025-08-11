import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios'; // Make sure this path is correct for your project structure

const Browse = () => {
  const navigate = useNavigate();
  
  // State for storing pets fetched from the backend
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // State for search functionality
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('breed'); // 'breed' or 'category'

  // Fetch pets from the backend when the component loads
  useEffect(() => {
    const fetchPets = async () => {
      setLoading(true);
      try {
        // We use the '/pets/search' endpoint we created
        const response = await api.get('/pets/search');
        setPets(response.data.data);
      } catch (error) {
        console.error("Failed to fetch pets:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPets();
  }, []);

  // Handle the search form submission
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Make a new API call with search parameters
      const response = await api.get('/pets/search', {
        params: {
          [searchType]: searchTerm
        }
      });
      setPets(response.data.data);
    } catch (error) {
      console.error("Failed to search for pets:", error);
    } finally {
      setLoading(false);
    }
  };

  // Navigate to the adoption form page when a user clicks the button
  const handleAdoptClick = (petId) => {
    // We'll pass the pet's ID in the URL to the next page
    navigate(`/adopt/${petId}`);
  };

  return (
    <div className="min-h-[80vh] bg-blue-50 py-14 px-6 text-center">
      <h1 className="text-4xl font-bold text-blue-900 mb-4">Browse Adoptable Pets</h1>
      <p className="text-gray-700 text-lg max-w-xl mx-auto mb-8">Find your new best friend. All pets listed here are available for adoption.</p>

      {/* --- Search Section --- */}
      <div className="max-w-2xl mx-auto mb-12">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
          <select 
            value={searchType} 
            onChange={(e) => setSearchType(e.target.value)}
            className="p-3 border rounded-md"
          >
            <option value="breed">Search by Breed</option>
            <option value="category">Search by Category</option>
          </select>
          <input 
            type="text"
            placeholder={searchType === 'breed' ? "e.g., Retriever" : "e.g., Dog, Cat"}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow p-3 border rounded-md"
          />
          <button type="submit" className="bg-blue-900 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition">
            Search
          </button>
        </form>
      </div>

      {/* --- Pet Grid --- */}
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <p>Loading pets...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {pets.length > 0 ? pets.map((pet) => (
              <div key={pet._id} className="bg-purple-50 rounded-xl shadow-lg p-4 flex flex-col items-center transform hover:scale-105 transition-transform duration-300">
                <img src={pet.petImage} alt={pet.petName} className="rounded-lg w-full h-60 object-cover mb-4" />
                <h3 className="text-xl font-semibold">{pet.petName} <span className="font-normal text-gray-500">({pet.gender})</span></h3>
                <p className="text-gray-600">{pet.petBreed}</p>
                <p className="text-gray-500 mb-4">{pet.address}</p>
                <button onClick={() => handleAdoptClick(pet._id)} className="bg-blue-900 text-white w-full px-4 py-2 rounded hover:bg-blue-700 transition">
                  Apply to Adopt
                </button>
              </div>
            )) : (
              <p className="md:col-span-4 text-gray-700">No pets found matching your criteria.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;