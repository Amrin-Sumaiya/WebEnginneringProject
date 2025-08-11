import React from 'react';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPhoneAlt,
  FaEnvelope,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaComments
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-200 text-gray-800 ">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-blue-300">

        {/* About Section */}
        <div className='text-left'>
          <h3 className="text-xl font-bold mb-4 text-black">About Us</h3>
          <p className="leading-relaxed text-[16px]">
            We’re dedicated to rescuing pets and connecting them with loving families.
            Join us in giving every pet a second chance at life and a forever home.
            Have questions about adopting, reporting lost pets, or connecting with local rescues?
Explore our Help Center for answers, guides, and pet care tips.
          </p>
        </div>



                {/* Support and HELP CENTER  */}
        <div className='text-center md:text-left'>
          <h3 className="text-xl font-bold mb-4 text-black">Support & Help Center</h3>
          <div className="space-y-2 text-[16px]">
            <p>Need help navigating PetCare?
Whether you're searching for adoptable pets, rescue centers, or local shelters, our support team is here to guide you.
Visit our Help Center or contact us for assistance.</p>
           

          </div>
        </div>

{/* Contact Section */}
<div className='text-center md:text-left'>
  <h3 className="text-xl font-bold mb-4 text-black">Contact</h3>
  <div className="space-y-2 text-[16px]">
    <p className="flex items-center gap-2 hover:text-blue-700 transition">
      <FaPhoneAlt /> +880 123-456-789
    </p>
    <p className="flex items-center gap-2 hover:text-blue-700 transition">
      <FaEnvelope /> support@petrescue.com
    </p>
    <p className="flex items-center gap-2 hover:text-blue-700 transition">
      <FaMapMarkerAlt /> 123 Rescue Street, Dhaka, Bangladesh
    </p>
    <p className="flex items-center gap-2 hover:text-blue-700 transition">
      <FaWhatsapp /> +880 987-654-321 (WhatsApp)
    </p>
    <p className="flex items-center gap-2 hover:text-blue-700 transition">
      <FaComments /> Live Chat Available 9AM – 6PM
    </p>
  </div>
</div>


        {/* Social Media Section */}
        <div className='text-center md:text-right'>
          <h3 className="text-xl font-bold mb-4 text-black">Follow Us</h3>
          <div className="flex justify-center md:justify-end gap-4">
            <a href="#" className="bg-white p-2 rounded-full shadow hover:scale-110 transform transition duration-300 text-blue-500"><FaFacebookF /></a>
            <a href="#" className="bg-white p-2 rounded-full shadow hover:scale-110 transform transition duration-300 text-sky-600"><FaTwitter /></a>
            <a href="#" className="bg-white p-2 rounded-full shadow hover:scale-110 transform transition duration-300 text-pink-600"><FaInstagram /></a>
          </div>
        </div>
      </div>




      <div className="text-center bg-gray-500 py-4 text-sm text-white">
        © {new Date().getFullYear()} Local Pet Adoption & Rescue. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
