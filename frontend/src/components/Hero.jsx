import React from 'react';
import { assets } from '../assets/assets';
import hero1 from '../assets/look-studio.jpg';  
const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row border border-gray-400">
      <div className="w-full sm:w-1/2 flex flex-col items-center justify-center py-10 px-4 sm:px-8">
      <div className="flex items-center gap-2">
  <div className="w-8 md:w-11 h-[2px] bg-[#414141]" />
  <p className="font-medium text-sm md:text-base text-gray-600">OUR BESTSELLERS</p>
</div>

        <h1 className="text-3xl lg:text-5xl font-bold text-center mb-6 prata-regular">
          Latest Arrivals
        </h1>
        <div className="flex items-center gap-2 cursor-pointer hover:opacity-75 transition-opacity">
          <p className="font-semibold text-sm md:text-base text-gray-800">SHOP NOW</p>
          <div className="w-8 md:w-11 h-[1px] bg-[#414141]" />
        </div>
      </div>
      <div className="w-full sm:w-1/2">
        <img 
          className="w-full h-full object-cover" 
          src={hero1} 
          alt="Latest Arrivals" 
        />
      </div>
    </div>
  );
}

export default Hero;