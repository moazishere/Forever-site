import React from 'react'
import { assets } from '../assets/assets'

const Navbar = ({ setToken }) => {

 const logoutButtonClasses = 'bg-black text-white px-6 py-2 rounded-none text-sm font-normal tracking-widest uppercase shadow-md hover:bg-gray-800 transition duration-300 leading-none';

 return (
  <div className='flex items-center py-4 lg:py-5 px-8 justify-between border-b border-gray-200 bg-white sticky top-0 z-10'>
   
   {/* Logo */}
   <img 
    className="w-[120px] lg:w-[160px] cursor-pointer object-contain" 
    src={assets.logo} 
    alt="Logo" 
   />
   
   {/* Logout Button */}
   <button 
    onClick={()=>setToken('')} 
    className={logoutButtonClasses}
   >
    LOGOUT
   </button>
  </div>
 )
}

export default Navbar