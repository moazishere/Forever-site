import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl } from '../App'
import { currency } from '../App'
import { toast } from 'react-toastify'

const List = ({ token }) => {

 const [list, setList] = useState([])

 const fetchList = async () => {
  try {
   const response = await axios.get(backendUrl + '/api/product/list')
   if (response.data.success) {
    setList(response.data.products)
   }
   else {
    toast.error(response.data.message)
   }
  } catch (error) {
   console.log("Error fetching list:", error.message)
   toast.error("Failed to fetch product list.")
  }
 }

 const removeProduct = async (_id) => {
  try {
   const response = await axios.post(backendUrl + '/api/product/remove', { _id }, { headers: { token } })

   if (response.data.success) {
    toast.success(response.data.message)
    await fetchList()
   } else {
    toast.error(response.data.message)
   }
  } catch (error) {
   console.log("Error removing product:", error.message);
   toast.error("Failed to remove product.")
  }
 }

 useEffect(() => {
  fetchList()
 }, [token]) 


 return (
  <div className='p-6 lg:p-10 bg-white shadow-xl rounded-none min-h-[60vh]'>
   
   <h1 className='text-3xl font-light tracking-widest uppercase text-gray-900 mb-8 border-b pb-2'>All Products List</h1>

   <div className='flex flex-col border border-gray-200 rounded-none'>
    {/*-------- List Table Title -------- */}

    <div className='hidden md:grid grid-cols-[1fr_4fr_2fr_1.5fr_1fr] items-center py-4 px-4 bg-gray-800 text-white text-sm font-medium tracking-wider uppercase rounded-none'>
     <b>Image</b>
     <b>Name</b>
     <b>Category</b>
     <b>Price</b>
     <b className='text-center'>Action</b>
    </div>

    {/* -------- Product List -------- */}

    {list.length === 0 ? (
     <p className='py-8 text-center text-gray-500'>No products found.</p>
    ) : (
     list.map((item, index) => (
      <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_4fr_2fr_1.5fr_1fr] items-center gap-4 py-4 px-4 border-b border-gray-200 text-sm text-gray-700 font-light' key={index}>
       <img className='w-12 h-12 object-cover' src={item.image[0]} alt={item.name} />
       <p className='text-gray-900 font-normal'>{item.name}</p>
       
       <p className='hidden md:block'>{item.category}</p> 
       
      
       <p className='hidden md:block text-gray-900 font-medium'>{currency}{item.price}</p>
       <p className='block md:hidden text-gray-900 font-medium'>
                {currency}{item.price}
              </p>


       {/* Remove Action */}
       <p onClick={()=>removeProduct(item._id)} className='text-red-700 font-medium cursor-pointer hover:text-red-500 transition text-sm tracking-wider uppercase text-right md:text-center'>
        REMOVE
       </p>
      </div>
     ))
    )}
   </div>
  </div>
 )
}

export default List
