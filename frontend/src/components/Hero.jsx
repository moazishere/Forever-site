import React from 'react'
import { assets } from '../assets/assets'

const Hero = () => {
 return (
  <div className='flex flex-col sm:flex-row min-h-[70vh] border-b border-gray-200'>
    {/* Hero Left Side: Content Block */}
    <div className='w-full lg:w-2/5 flex items-center justify-center py-16 px-6 lg:py-0 bg-white'>
      <div className='text-gray-900 max-w-sm'>
        
        {/* Subtitle */}
        <div className='flex items-center gap-3 mb-3'>
          <p className='w-10 h-[1px] bg-gray-900'></p>
          <p className='font-normal text-sm tracking-widest uppercase'>The Signature Collection</p>
        </div>

        {/* Main Title */}
        <h1 className='text-5xl lg:text-7xl font-light leading-snug mb-6'>
         New Arrivals
        </h1>

        {/* Description (Added for context) */}
        <p className='text-gray-700 font-light text-base lg:text-lg leading-relaxed mb-10'>
         Experience the essence of timeless design. Each piece is crafted with meticulous care and unmatched materials.
        </p>

        {/* Call to Action: Button Style */}
        <a href="/collection" className='inline-block bg-black text-white px-10 py-3 rounded-none text-sm font-normal tracking-widest uppercase shadow-xl hover:bg-gray-800 transition duration-300'>
         Shop Now
        </a>

      </div>
    </div>
    
    {/* Hero Right Side: Image */}
    <div className='w-full lg:w-3/5 bg-gray-100 min-h-[50vh] lg:min-h-full'>
      <img 
       className='w-full h-full object-cover mix-blend-multiply opacity-90' 
       src={assets.hero_img}
       fetchPriority='high'
       loading='eager'
       decoding='async' 
       alt="Latest Collection" 
      />
    </div>
  </div>
 )
}

export default Hero