import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

const Orders = () => {
 
 const { backendUrl, token, currency } = useContext(ShopContext)

 const [orderData, setOrderData] = useState([])

 const loadOrderData = async () => {
  try {
    if (!token) {
      return null
    }
    const response = await axios.post(backendUrl + '/api/order/userOrders', {}, {headers: {token}})
    //console.log(response.data);
    if (response.data.success) {
      let allOrdersItem = []
      response.data.orders.map((order) => {
        order.items.map((item) => {
          item['status'] = order.status
          item['payment'] = order.payment
          item['paymentMethod'] = order.paymentMethod
          item['date'] = order.date
          allOrdersItem.push(item)
        })
      })
      setOrderData(allOrdersItem.reverse());
      
    }
    
  } catch (error) {
    
  }
 }

 useEffect(()=>{
  loadOrderData()
 }, [token])

 const titleClasses = 'text-3xl lg:text-4xl tracking-widest uppercase font-serif pb-4 border-b border-gray-200'
 const orderItemBaseClasses = 'py-6 border-t border-gray-100 last:border-b text-gray-700 flex flex-col md:flex-row md:items-start md:justify-between gap-6 hover:bg-gray-50/50 transition duration-300'
 const productImageClasses = 'w-16 sm:w-20 object-cover rounded-none border border-gray-200 shadow-sm' // Keeping sizes, changing style
 const productInfoClasses = 'sm:text-lg font-normal text-gray-900 tracking-wide'
 const detailTextClasses = 'text-sm font-light text-gray-600 tracking-wider'
 const statusDotClasses = 'min-w-2 h-2 rounded-full bg-green-600 shadow-lg'
 const trackButtonClasses = 'border border-black bg-white text-black px-6 py-2 text-sm font-normal tracking-widest uppercase rounded-none hover:bg-black hover:text-white transition duration-200'


 return (
  <div className='pt-16 lg:pt-20 bg-white'>

   <div className={titleClasses}>
    <Title text1={"MY"} text2={'ORDERS'}/>
   </div>
   
   <div className='mt-8'> 
     {
      orderData.map((item, index)=>(
       <div key={index} className={orderItemBaseClasses}>
        <div className='flex items-start gap-6 lg:gap-8'>
         {/* Product Image */}
         <img className={productImageClasses} src={item.image[0]} alt={item.name} />
         
         {/* Product Details */}
         <div className='pt-1'>
          <p className={productInfoClasses}>{item.name}</p>
          
          <div className='flex items-center gap-4 mt-2'>
           <p className='text-xl font-medium text-gray-900'>{currency}{item.price}</p> {/* Highlight price */}
           <span className='text-gray-300'>|</span>
           <p className={detailTextClasses}>QTY: {item.quantity}</p>
           <p className={detailTextClasses}>Size: {item.size}</p>
          </div>
          
          <p className='mt-3 text-xs text-gray-500 font-light tracking-wider'>ORDERED ON: <span className='text-gray-600 font-normal'>{new Date(item.date).toDateString()}</span></p>
          <p className='mt-3 text-xs text-gray-500 font-light tracking-wider'>Payment: <span className='text-gray-600 font-normal'>{item.paymentMethod}</span></p>
         </div>
        </div>
        
        {/* Status and Action Button */}
        <div className='w-full md:w-auto flex md:flex-col lg:flex-row items-start md:items-end lg:items-center justify-between gap-4 md:gap-6 pt-2 md:pt-0'>
         <div className='flex items-center gap-3'>
          <p className={statusDotClasses}></p>
          <p className='text-sm font-medium text-green-700 tracking-wider'>{item.status}</p>
         </div>
         
         <button onClick={loadOrderData} className={trackButtonClasses}>Track Order</button>
        </div>
       </div>
      ))
     }
   </div>
  </div>
 )
}

export default Orders