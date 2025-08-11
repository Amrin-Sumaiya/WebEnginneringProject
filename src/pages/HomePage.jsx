import React from 'react';
import { Link } from 'react-router-dom'; // Used for internal navigation
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

// Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// Importing all necessary images
import heroImage from '../assets/images/body.jpg';
import facilityImage from '../assets/images/faci3.jpg';
import feature1 from '../assets/images/pic1.jpg';
import feature2 from '../assets/images/pic2.jpg';
import feature3 from '../assets/images/maps.png';
import feature4 from '../assets/images/medical.jpg';
import feature5 from '../assets/images/donation.jpg';
import feature6 from '../assets/images/volunteer.jpg';
import logo1 from '../assets/images/cat-lover.png';
import logo2 from '../assets/images/pet-care.png';
import logo3 from '../assets/images/map.png';


// Data for the feature slider - defined outside the component to prevent re-creation on re-renders
const featuresData = [
  { image: feature1, title: 'Adoption Management', description: 'Easily list pets for adoption and manage adopter inquiries for smooth shelter operations.' },
  { image: feature2, title: 'Rescue Locator', description: 'Locate nearby rescue centers or report stray animals directly through our platform.' },
  { image: feature3, title: 'Live Pet Map', description: 'Visualize available pets, shelters, and reported cases through our interactive map interface.' },
  { image: feature4, title: 'Medical Facilities', description: 'Easily list pets for adoption and manage adopter inquiries for smooth shelter operations.' },
  { image: feature5, title: 'Donation Tracking', description: 'Manage donations and track how contributions are used to support rescue missions.' },
  { image: feature6, title: 'Volunteer Matching', description: 'Connect with volunteers who want to support your shelter or foster animals in need.' },
];

// Data for the facilities list
const facilitiesData = [
  'Adoption management tools', 'Real-time pet location mapping', 'Rescue center directory',
  'Donation tracking system', 'Volunteer-matching feature', 'Medical record access',
  'Shelter dashboard and analytics', 'Mobile-friendly user interface', 'Secure user authentication',
  'Community support & chat forum'
];


const HomePage = () => {
  return (
    <div className="bg-purple-50 text-gray-800">
      
      {/* Section 1: Hero from body.jsx */}
      <section className='bg-purple-50 py-12 md:px-16 flex flex-col md:flex-row items-center justify-between gap-8'>
        <motion.div
          className='md:w-1/2 text-center md:text-left'
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className='text-4xl lg:text-5xl font-bold mb-4 text-blue-900'>
            Welcome to the Local Pet Adoption & Rescue Network
          </h2>
          <div className='text-gray-700 text-lg h-32 md:h-24'>
            <Typewriter
              words={["Every pet deserves a safe and loving home. Our mission is to connect compassionate people with rescued animals in need. Explore adoptable pets near you, support local shelters, and be part of a caring community. Start your journey of saving lives—one paw at a time."]}
              loop={1}
              cursor
              cursorStyle="|"
              typeSpeed={40}
              deleteSpeed={20}
            />
          </div>
          <Link
            to="/rescue" // Changed from href to Link
            className='inline-block mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition font-semibold'
          >
            Join as a Rescuer
          </Link>
        </motion.div>
        <motion.div
          className='md:w-1/2 mt-8 md:mt-0'
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <img
            src={heroImage}
            alt="Pet and rescuer"
            className='w-full h-auto rounded-lg shadow-lg'
          />
        </motion.div>
      </section>

      {/* Section 2: Call to Action from Home.jsx */}
      <section className="text-center py-16 px-4 bg-gradient-to-r from-blue-100 to-purple-100 shadow-md">
        <h2 className="text-4xl font-bold text-blue-900 mb-3">Whether You're Adopting or Rescuing</h2>
        <p className="mt-4 text-lg text-gray-600">
          Search for adoptable pets near you and give them a forever home.
        </p>
        <h3 className="mt-6 text-xl font-semibold text-blue-700">Start Here ↓</h3>
        <div className="mt-6 flex justify-center gap-4 flex-wrap">
          <Link
            to="/browse" // Changed from href to Link
            className="bg-blue-500 text-white text-lg px-8 py-3 hover:bg-blue-700 rounded-full transition duration-300 shadow-lg"
          >
            Browse Adoptable Pets
          </Link>
        </div>
      </section>

      {/* Section 3: Features Slider from petSlider.jsx */}
      <section className="bg-white py-16 px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800">
            Paw-sitive <span className="text-blue-600">Features</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our essential tools designed to help local shelters, adopters, and animal lovers easily find, manage, and support pet adoptions and rescues.
          </p>
        </div>
        <div className='max-w-7xl mx-auto'>
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            modules={[Autoplay, Pagination]}
            className="pb-12"
          >
            {featuresData.map((feature, index) => (
              <SwiperSlide key={index}>
                <div className="bg-blue-50 shadow-lg rounded-lg p-8 text-center h-full hover:shadow-xl transition-shadow duration-300">
                  <img src={feature.image} alt={feature.title} className="mx-auto mb-4 h-48 w-full object-cover rounded-md" />
                  <h3 className="text-xl font-semibold text-blue-700">{feature.title}</h3>
                  <p className="text-gray-600 mt-2">{feature.description}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Section 4: Facilities from facilities.jsx */}
      <section className="bg-gradient-to-r from-blue-100 to-purple-100 py-16 px-4">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-1/2">
            <h2 className="text-4xl font-bold text-blue-900 mb-6">
              Our Website Facilities & Availability
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-gray-700">
              {facilitiesData.map((point, index) => (
                <li key={index} className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
            <img
              src={facilityImage}
              alt="A happy dog being pet"
              className="rounded-lg shadow-lg object-cover w-full h-auto max-h-[450px]"
            />
          </div>
        </div>
      </section>

      {/* Section 5: Last Part from Lastpart.jsx */}
      <section className="bg-white py-24 text-center">
        <h2 className="text-4xl font-bold mb-16 text-gray-800">Support the Pet Community with Care & Connection</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 px-4">
          <div className="flex flex-col items-center">
            <img src={logo1} alt="Adoption" className="w-20 h-20 mb-4" />
            <h3 className="text-2xl text-purple-900 font-semibold mb-2">Adoption</h3>
            <p className="text-gray-700 max-w-xs">
              Help pets find their forever homes by connecting adopters with shelters and foster families.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <img src={logo2} alt="Rescue" className="w-20 h-20 mb-4" />
            <h3 className="text-2xl text-purple-900 font-semibold mb-2">Rescue</h3>
            <p className="text-gray-700 max-w-xs">
              Support rescue operations by providing essential care, resources, and visibility to animals in need.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <img src={logo3} alt="Map" className="w-20 h-20 mb-4" />
            <h3 className="text-2xl text-purple-900 font-semibold mb-2">Map</h3>
            <p className="text-gray-700 max-w-xs">
              Discover nearby shelters, adoption events, and rescue centers using our interactive map tool.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
