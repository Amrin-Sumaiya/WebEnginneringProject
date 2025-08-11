import React from 'react';
import logo1 from '../assets/images/cat-lover.png';
import logo2 from '../assets/images/pet-care.png';
import logo3 from '../assets/images/map.png';

const LastPart = () => {
  return (
    <section className="bg-blue-100 py-24 text-center">
      <h2 className="text-4xl font-bold mb-16">Support the Pet Community with Care & Connection</h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 px-4">
        <div className="flex flex-col items-center">
          <img src={logo1} alt="Adoption" className="w-16 h-16 mb-4" />
          <h3 className="text-xl text-purple-900 font-semibold mb-2">Adoption</h3>
          <p className="text-gray-800 max-w-xs">
            Help pets find their forever homes by connecting adopters with shelters and foster families.
          </p>
        </div>
        <div className="flex flex-col items-center">
          <img src={logo2} alt="Rescue" className="w-16 h-16 mb-4" />
          <h3 className="text-xl text-purple-900 font-semibold mb-2">Rescue</h3>
          <p className="text-gray-800 max-w-xs">
            Support rescue operations by providing essential care, resources, and visibility to animals in need.
          </p>
        </div>
        <div className="flex flex-col items-center">
          <img src={logo3} alt="Map" className="w-16 h-16 mb-4" />
          <h3 className="text-xl text-purple-900 font-semibold mb-2">Map</h3>
          <p className="text-gray-800 max-w-xs">
            Discover nearby shelters, adoption events, and rescue centers using our interactive map tool.
          </p>
        </div>
      </div>
    </section>
  );
};

export default LastPart;
