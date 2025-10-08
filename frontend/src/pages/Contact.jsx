import React from 'react'
import Title from '../components/Title' 

const Contact = () => {

 const infoTextClasses = 'text-gray-700 font-light text-lg';
 const phoneLinkClasses = 'text-5xl lg:text-6xl font-normal text-black tracking-wider hover:text-gray-700 transition duration-300';
 const ctaButtonClasses = 'w-full lg:w-2/3 mt-10 bg-black text-white px-8 py-4 rounded-none text-base font-light tracking-widest uppercase shadow-xl hover:bg-gray-800 transition duration-300';

 return (
  <div className='pt-16 lg:pt-24 bg-white'>
   <div className='text-3xl lg:text-4xl text-center pb-12 lg:pb-16 border-t border-gray-100'>
    <Title text1={'GET IN'} text2={'TOUCH'}/>
   </div>

   <div className='max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 px-4 pb-20 lg:pb-32'>
    
    {/* Left Column: Contact Information (Muted & Elegant) - Remains the same */}
    <div className='w-full lg:w-1/3 space-y-10 lg:space-y-16 border-b lg:border-b-0 lg:border-r border-gray-200 lg:pr-12 pb-10 lg:pb-0'>
     
     <h2 className='text-2xl font-normal text-gray-900 tracking-widest uppercase'>
      Contact Details
     </h2>

     {/* 1. General Inquiries */}
     <div className='space-y-4'>
      <p className='text-lg font-medium tracking-wide uppercase text-gray-900'>General Inquiries</p>
      <p className={infoTextClasses}>
       We are available Monday to Friday, 9am - 5pm EST.
      </p>
      <p className={infoTextClasses}>
       Email: <a href="mailto:support@foreveryou.com" className='text-black hover:text-gray-800 transition'>support@foreveryou.com</a>
      </p>
      <p className={infoTextClasses}>
       Phone: <a href="tel:+12124858190" className='text-black hover:text-gray-800 transition'>+1 (212) 485-8190</a>
      </p>
     </div>

     {/* 2. Studio Address */}
     <div className='space-y-4'>
      <p className='text-lg font-medium tracking-wide uppercase text-gray-900'>Our Store</p>
      <address className={infoTextClasses + ' not-italic'}>
       ForeverYou Atelier <br />
       123 Luxury Lane, Suite 400 <br />
       New York, NY 10001
      </address>
     </div>

    </div>

    {/* Right Column: Prominent Phone Number & CTA */}
    <div className='w-full lg:w-2/3 flex flex-col justify-center items-center lg:items-start text-center lg:text-left pt-10 lg:pt-0'>
     <h2 className='text-2xl font-normal text-gray-900 tracking-widest uppercase mb-6'>
      Speak with an Expert
     </h2>
     
     <p className='text-xl font-light text-gray-700 tracking-wider mb-8'>
      For immediate assistance or personalized consultation, please contact us directly.
     </p>

     {/* The Large, Prominent Phone Number */}
     <a href="tel:+12124858190" className={phoneLinkClasses}>
      +1 (212) 485-8190
     </a>

     {/* Button to Reinforce the Action  */}
     <a href="tel:+12124858190" className={ctaButtonClasses}>
      CALL NOW
     </a>
    </div>
   </div>
  </div>
 )
}

export default Contact