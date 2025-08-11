import React from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import Profile from '../assets/images/body.jpg'

const Body = () => {
  return (
    <section className='bg-purple-50 py-12 md:px-16 flex flex-col md:flex-row items-center justify-between gap-8'>
      {/* Left part design content */}
      <motion.div
        className='md:w-1/2 text-center md:text-left'
        initial={{ x: -100, opacity: 1 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className='text-4xl font-bold mb-4 text-blue-900'>
          Welcome to the Local Pet Adoption & Rescue Network
        </h2>
        <p className='text-gray-700 text-lg'>
          <Typewriter
            words={[
              "Every pet deserves a safe and loving home. Our mission is to connect compassionate people with rescued animals in need. Explore adoptable pets near you, support local shelters, and be part of a caring community. Start your journey of saving lives—one paw at a time."
            ]}
            loop={false}
            cursor
            cursorStyle="|"
            typeSpeed={40}
            deleteSpeed={20}
          />
        </p>

        <a
          href="/about"
          className='inline-block mt-6 px-5 py-2 bg-blue-400 text-white rounded hover:bg-purple-950 transition'
        >
          Learn More
        </a>
      </motion.div>

      {/* image section in Right */}
      <motion.div
        className='w-1/2'
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <img
          src={Profile}
          alt="Pet and rescuer"
          className='w-full h-auto rounded-lg shadow-lg'
        />
      </motion.div>
    </section>
  );
};

export default Body;
