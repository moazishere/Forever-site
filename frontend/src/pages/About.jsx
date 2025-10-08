import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets' // Assuming you have assets like placeholder images

const About = () => {

 const textSectionClasses = 'w-full lg:w-1/2 p-6 lg:p-12';
 const imageSectionClasses = 'w-full lg:w-1/2 min-h-[300px] bg-gray-100 object-cover';
 const paragraphClasses = 'text-base lg:text-lg text-gray-700 font-light leading-relaxed mb-6';

 return (
  <div className='bg-white'>
   <div className='text-3xl lg:text-4xl text-center pt-16 lg:pt-24 pb-8 border-t border-gray-100'>
    <Title text1={'THE'} text2={'NARRATIVE'}/>
   </div>

   {/* 1. Hero Statement Section */}
   <div className='mx-auto max-w-4xl text-center pt-8 pb-16 lg:pb-24 px-4'>
    <p className='text-2xl lg:text-3xl font-light text-gray-900 tracking-wider leading-snug italic'>
     "Beyond the ephemeral trends, our commitment is to the enduring power of quality and design."
    </p>
   </div>

   {/* 2. Brand Story / Founder's Vision */}
   <div className='flex flex-col lg:flex-row items-stretch border-t border-gray-200'>
    <div className={textSectionClasses}>
     <h2 className='text-3xl font-normal text-gray-900 tracking-widest uppercase mb-6 border-b pb-2'>
      Our Origin
     </h2>
     <p className={paragraphClasses}>
      **ForeverYou** was founded on a singular principle: that true luxury lies in longevity. We began in 2015 as a small atelier focused on sourcing materials with integrity and crafting pieces meant to last generations. Our journey has been one of meticulous curation, rejecting the disposable culture to focus solely on timeless design.
     </p>
     <p className={paragraphClasses}>
      Every item in our collection is a testament to the artisans who created it—a blend of heritage techniques and modern sensibility. We believe in the quiet confidence that comes from owning fewer, but better, things.
     </p>
    </div>
    <img src={assets.about} className={imageSectionClasses} />
     {/* Placeholder for a large, elegant image (e.g., a workshop or clean product shot) */}
    
   </div>

   {/* 3. Core Values / Pillars */}
   <div className='border-t border-gray-200 pt-16 lg:pt-24 pb-16 lg:pb-24 px-4'>
    <h2 className='text-3xl font-normal text-center text-gray-900 tracking-widest uppercase mb-12'>
     The Pillars of ForeverYou
    </h2>
    <div className='max-w-6xl mx-auto grid md:grid-cols-3 gap-10 lg:gap-16'>
     
     {/* Pillar 1: Integrity */}
     <div className='text-center p-4'>
      <p className='text-xl font-medium text-gray-900 tracking-wider uppercase mb-4'>Integrity</p>
      <p className='text-gray-700 font-light text-base'>
       We maintain transparent supply chains and ethical practices, ensuring every creation is as good for the world as it is for your wardrobe.
      </p>
     </div>

     {/* Pillar 2: Craftsmanship */}
     <div className='text-center p-4 border-l border-r border-gray-200'>
      <p className='text-xl font-medium text-gray-900 tracking-wider uppercase mb-4'>Craftsmanship</p>
      <p className='text-gray-700 font-light text-base'>
       Our dedication to meticulous detail guarantees a flawless finish. We celebrate the beauty found only in hand-finished precision.
      </p>
     </div>

     {/* Pillar 3: Timelessness */}
     <div className='text-center p-4'>
      <p className='text-xl font-medium text-gray-900 tracking-wider uppercase mb-4'>Timelessness</p>
      <p className='text-gray-700 font-light text-base'>
       We design not for a season, but for a lifetime. Our aesthetic is one of subtle refinement that transcends fleeting trends.
      </p>
     </div>
    </div>
   </div>

  </div>
 )
}

export default About