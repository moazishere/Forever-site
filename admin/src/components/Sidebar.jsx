import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {

 // Define luxury admin classes
 const baseClass = 'flex items-center gap-3 py-3 px-4 text-base font-light tracking-wider uppercase text-gray-600 hover:bg-gray-100/70 transition duration-200 cursor-pointer';
 const activeClass = 'bg-gray-700 text-white font-medium shadow-lg hover:bg-gray-900/95';

 return (
  <div className='w-[18%] min-h-screen border-r border-gray-200 bg-white pt-10'>
   
   <div className='flex flex-col gap-1'>
    
    {/* Title/Logo Space (Added for structure) */}
    <div className='px-2 sm:px-4 mb-8'>
     <p className='text-l sm:text-xl font-normal tracking-widest text-gray-900'>FOREVER ADMIN</p>
    </div>

    {/* Add Items Link */}
    <NavLink 
     className={({ isActive }) => 
      `${baseClass} ${isActive ? activeClass : 'rounded-none'}`
     } 
     to="/add"
    >
     <img className='w-5 h-5 filter grayscale group-hover:filter-none' src={assets.add_icon} alt="Add Icon" />
     <p className='hidden md:block'>Add Item</p>
    </NavLink>

    {/* List Items Link */}
    <NavLink 
     className={({ isActive }) => 
      `${baseClass} ${isActive ? activeClass : 'rounded-none'}`
     } 
     to="/list"
    >
     <img className='w-5 h-5 filter grayscale group-hover:filter-none' src={assets.order_icon} alt="List Icon" />
     <p className='hidden md:block'>List Items</p>
    </NavLink>

    {/* Orders Link */}
    <NavLink 
     className={({ isActive }) => 
      `${baseClass} ${isActive ? activeClass : 'rounded-none'}`
     } 
     to="/orders"
    >
     <img className='w-5 h-5 filter grayscale group-hover:filter-none' src={assets.order_icon} alt="Orders Icon" />
     <p className='hidden md:block'>Orders</p>
    </NavLink>

   </div>
  </div>
 )
}

export default Sidebar