import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import CartTotal from '../components/CartTotal'

const Cart = () => {
 const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext)
 const [cartData, setCartData] = useState([])

 useEffect(() => {
    
    if (products.length > 0) {

        const tempData = []
        for (const items in cartItems) {
         for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
           tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item]
           })
          }
         }
        }
        setCartData(tempData)
    }

 }, [cartItems, products])

 // --- Luxury Styling Variables ---
 const pageContainerClasses = "pt-20 lg:pt-24 bg-white min-h-screen"
 const titleWrapperClasses = "text-4xl lg:text-5xl font-light tracking-widest uppercase mb-12 lg:mb-16 text-gray-900 border-b pb-4"
 const cartItemWrapperClasses = "bg-white p-6 lg:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-8 transition border-b border-gray-200 hover:bg-gray-50/50" // Replaced shadow/rounded with sharp borders and hover background
 const imageClasses = "w-28 h-28 object-cover border border-gray-200" // Sharp corners, defined border
 const productNameClasses = "text-xl font-light text-gray-900 tracking-wide"
 const quantityInputClasses = "border border-gray-300 rounded-none w-20 px-3 py-2 text-center text-sm focus:ring-0 focus:border-black outline-none transition" // Sharp corners, subtle focus
 const removeButtonClasses = "p-3 hover:bg-gray-100 rounded-none transition border border-gray-200" // Minimalist remove button

 return (
  <div className={pageContainerClasses}>
   <div className="max-w-7xl mx-auto px-4">
    <div className={titleWrapperClasses}>
     <Title text1={'YOUR'} text2={'SELECTION'} />
    </div>

    <div className="space-y-0 divide-y divide-gray-100 border-t border-gray-200">
     {cartData.map((item, index) => {
      const productData = products.find(
       (product) => product._id === item._id
      )

      return (
       <div
        key={index}
        className={cartItemWrapperClasses}
       >
        {/* Product Details */}
        <div className="flex items-start gap-6 w-full lg:w-3/5">
         <img
          className={imageClasses}
          src={productData.image[0]}
          alt={productData.name}
         />
         <div className="flex flex-col justify-center">
          <p className={productNameClasses}>
           {productData.name}
          </p>
          <div className="flex items-center gap-6 mt-2 text-gray-500 text-sm">
           <p className="font-light text-lg text-gray-900">
            **Price:** {currency}{productData.price}
           </p>
           <span className="px-3 py-1 text-xs border border-gray-300 tracking-widest">
            SIZE: {item.size}
           </span>
          </div>
         </div>
        </div>

        {/* Quantity & Remove */}
        <div className="flex items-center gap-4 lg:gap-8 justify-end w-full lg:w-2/5">
         <div className='flex items-center gap-3 text-sm font-light uppercase tracking-wider text-gray-700'>
          <span className='hidden sm:block'>Qty:</span>
          <input
           onChange={(e)=> e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))}
           className={quantityInputClasses}
           type="number"
           min={1}
           defaultValue={item.quantity}
          />
         </div>
         <div className='text-lg font-semibold text-gray-900 w-24 text-right'>
          {currency}{productData.price * item.quantity}
         </div>
         <button className={removeButtonClasses}>
          <img
           onClick={()=> updateQuantity(item._id, item.size, 0)}
           className="w-4 cursor-pointer opacity-70 hover:opacity-100 transition"
           src={assets.bin_icon}
           alt="Remove"
          />
         </button>
        </div>
       </div>
      )
     }) }
    </div>

    {/* Cart Summary and Checkout */}
    <div className='flex justify-end my-16 lg:my-24'>
     <div className='w-full sm:w-[450px]'>
      <div className='p-6 border-2 border-black/10 bg-gray-50/50 shadow-lg'>
       <CartTotal />
      </div>
      <div className='w-full text-end mt-8'>
       <button 
        onClick={()=> navigate('/place-order')} 
        className='w-full bg-black text-white text-base px-10 py-4 font-light tracking-widest uppercase hover:bg-gray-800 active:scale-[0.99] transition duration-300 rounded-none'
       >
        PROCEED TO CHECKOUT
       </button>
      </div>
     </div>
    </div>
   </div>
  </div>
 )
}

export default Cart