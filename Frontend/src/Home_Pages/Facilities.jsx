import React from 'react';
import facilityImage from '../assets/images/faci3.jpg';

const facilities = [
  'Adoption management tools',
  'Real-time pet location mapping',
  'Rescue center directory',
  'Donation tracking system',
  'Volunteer-matching feature',
  'Medical record access',
  'Shelter dashboard and analytics',
  'Mobile-friendly user interface',
  'Secure user authentication',
  'Community support & chat forum'
];

const WebsiteFacilities = () => {
  return (
    <section className="bg-gradient-to-r from-blue-100 to-purple-100 pt-16 pb-4 px-4">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row-reverse items-start gap-12">
        
        {/* Image Section — top-right */}
        <div className="w-full h-96 flex justify-center lg:justify-end">
          <img
            src={facilityImage}
            alt="Website Facilities"
            className="rounded-lg shadow-md object-cover max-h-[400px] w-full max-w-lg"
          />
        </div>

        {/* Text Section — top-left */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-4xl font-bold text-blue-900 mb-4">
            Our Website Facilities & Availability
          </h2>

          <ul className="list-disc list-inside text-gray-700 space-y-2 pl-2">
            {facilities.map((point, index) => (
              <li key={index} className="text-base leading-relaxed">
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>

  );
};

export default WebsiteFacilities;
