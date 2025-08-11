import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import {  Autoplay,Pagination } from 'swiper/modules';
import 'swiper/css'
import 'swiper/css/pagination';


import feature1 from '../assets/images/pic1.jpg'
import feature2 from '../assets/images/pic2.jpg'
import feature3 from '../assets/images/maps.png'
import feature4 from '../assets/images/medical.jpg'
import feature5 from '../assets/images/donation.jpg'
import feature6 from '../assets/images/volunteer.jpg'


const features = [
  {
    image: feature1,
    title: 'Adoption Management',
    description: 'Easily list pets for adoption and manage adopter inquiries for smooth shelter operations.'
  },
    {
    image: feature2,
    title: 'Rescue Locator',
    description: 'Locate nearby rescue centers or report stray animals directly through our platform.'
  },
    {
    image: feature3,
    title: 'Live Pet Map',
       description: 'Visualize available pets, shelters, and reported cases through our interactive map interface.',
  },
    {
    image: feature4,
    title: 'Medical Facilities',
    description: 'Easily list pets for adoption and manage adopter inquiries for smooth shelter operations.'
  },
    {
    image: feature5,
    title: 'Donation Tracking',
       description: 'Manage donations and track how contributions are used to support rescue missions.',
  },
    {
    image: feature6,
    title: 'Volunteer Matching',
        description: 'Connect with volunteers who want to support your shelter or foster animals in need.',
  },
]



const PetFeatures = () => {
  return (
    <section className="bg-gradient-to-r from-blue-100 to-purple-100 py-16 px-4">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800">
          Paw-sitive <span className="text-blue-600">Features</span>
        </h2>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
          Explore our essential tools designed to help local shelters, adopters, and animal lovers easily find, manage, and support pet adoptions and rescues.
        </p>
      </div>
      <div className='max-w-9xl mx-auto'>
        <Swiper slidesPerView={1}
        spaceBetween={30}
        breakpoints={{
         768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
      autoplay={{
            delay: 1000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          modules={[Autoplay, Pagination]}
          className="pb-10"
        >
          {features.map((feature, index) => (
            <SwiperSlide key={index}>
              <div className="bg-blue-100 shadow-md rounded-lg p-8 text-center hover:shadow-xl transition h-1/12">
                <img src={feature.image} alt={feature.title} className="mx-auto mb-4 h-48 object-cover" />
                <h3 className="text-xl font-semibold text-blue-600">{feature.title}</h3>
                <p className="text-gray-600 mt-2">{feature.description}</p>
              </div>
            </SwiperSlide>
          ))}

        </Swiper>

      </div>
     
    </section>
  );
};

export default PetFeatures;
