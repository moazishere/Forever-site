import React, { useEffect, useState, useContext } from 'react' 
import { useParams } from 'react-router-dom' 
import { ShopContext } from '../context/ShopContext' 
import { assets } from '../assets/assets' 
import RelatedProducts from '../components/RelatedProducts' 

const Product = () => { 

 const { productId } = useParams() 
 const { products, currency, addToCart, wishlistItems, toggleWishlist } = useContext(ShopContext) 
 
 const [productData, setProductData] = useState(null) 
 const [image, setImage] = useState('') 
 const [size, setSize] = useState('') 
 const isFavorite = productData && wishlistItems ? wishlistItems.includes(productData._id) : false;


 const fetchProductData = () => { 
  const foundProduct = products.find(item => item._id === productId);

  if (foundProduct) {
   setProductData(foundProduct); 
   if (!image) {
    setImage(foundProduct.image[0]); 
  }
 }
 };

 useEffect(() => { 
  fetchProductData() 
 }, [productId, products]) 

 return productData ? ( 
 <div className='border-t pt-16 transition-opacity ease-in duration-500 opacity-100 bg-white'> 
  <div className='flex flex-col lg:flex-row gap-16 lg:gap-24 max-w-7xl mx-auto px-4'> 

  {/* Images Section */} 
  <div className='flex-1 flex flex-col-reverse lg:flex-row gap-6'> 
   <div className='flex lg:flex-col gap-4 overflow-x-auto lg:overflow-y-auto lg:w-[20%]'> 
   {productData.image.map((item, index) => ( 
    <img 
     onClick={() => setImage(item)} 
     src={item} 
     key={index} 
     className={`w-24 h-24 object-cover rounded-none cursor-pointer border-2 transition ${ 
     image === item ? 'border-black opacity-100 shadow-lg' : 'border-gray-300 opacity-70 hover:opacity-100' 
    }`} 
     alt={`Product view ${index + 1}`} 
    /> 
   ))} 
   </div> 
   <div className='w-full lg:w-[80%]'> 
   <img src={image} className='w-full h-auto rounded-none border border-gray-200' alt={productData.name} /> 
   </div> 
  </div> 

  {/* Product Info */} 
  <div className='flex-1 space-y-8 lg:pt-4'> 
   <h1 className='font-light text-4xl lg:text-5xl text-gray-900 tracking-wider uppercase border-b pb-4'> 
   {productData.name} 
   </h1> 
   
   <div className='flex items-center gap-1 text-black/80'> 
   {Array(4).fill().map((_, i) => ( 
    <img src={assets.star_icon} key={i} alt="Star rating" className="w-4" /> 
   ))} 
   <img src={assets.star_dull_icon} alt="Half star rating" className="w-4 opacity-30" /> 
   <p className='ml-3 text-gray-500 text-sm'>(122 REVIEWS)</p> 
   </div> 

   <p className='text-3xl font-normal text-gray-900 tracking-wider'> 
   {currency}{productData.price} 
   </p> 

   <p className='text-gray-700 leading-relaxed font-light pt-4 border-t border-gray-100'> 
   {productData.description} 
   </p> 

   {/* Sizes */} 
   <div className='space-y-4 pt-4'> 
   <p className='font-normal text-gray-900 tracking-widest uppercase text-sm'>Select Size</p> 
   <div className='flex gap-4 flex-wrap'> 
    {productData.sizes.map((item, index) => ( 
    <button 
     onClick={() => setSize(item)} 
     className={`px-5 py-2 border transition rounded-none text-sm font-light tracking-wider ${ 
      item === size 
      ? 'border-black bg-black text-white' 
      : 'border-gray-300 hover:border-black hover:text-black text-gray-700' 
     }`} 
     key={index} 
    > 
     {item} 
    </button> 
    ))} 
   </div> 
   </div> 

   {/* Actions: Add to Cart & Wishlist */} 
   <div className='flex gap-4 mt-8'>
   {/* Add to Cart */} 
    <button 
     onClick={() => addToCart(productData._id, size)} 
     className='flex-1 bg-black text-white px-6 py-4 rounded-none text-base font-light tracking-widest uppercase shadow-xl hover:bg-gray-800 active:scale-[0.99] transition duration-300' 
    > 
     ADD TO CART 
    </button> 
    
    {/* Add/Remove from Wishlist */}
    <button onClick={()=>{toggleWishlist(productData._id)}}
     className={`px-5 py-4 rounded-none text-base font-light tracking-widest uppercase transition duration-300
       ${isFavorite ? 'bg-red-600 text-white border-red-600 hover:bg-red-700': 'border border-gray-400 text-gray-700 hover:border-black hover:text-black'}`}>{
        isFavorite ? 'REMOVE FROM WISHLIST' : 'ADD TO WISHLIST'
     }</button>

   </div>

   {/* Extra Info */} 
   <div className='text-sm text-gray-500 space-y-2 pt-6 border-t border-gray-200'> 
   <p className='font-light tracking-wide'>✅ 100% Original product</p> 
   <p className='font-light tracking-wide'>💵 Cash on delivery available</p> 
   <p className='font-light tracking-wide'>🔄 Easy return & exchange</p> 
   </div> 
  </div> 
  </div> 

  {/* Description & Reviews */} 
  <div className='mt-24 lg:mt-32 border-t border-gray-200 pt-10 max-w-7xl mx-auto px-4'> 
  <div className='flex border-b border-gray-200'> 
   <button className='px-8 py-3 text-base font-normal border-b-2 border-black tracking-widest uppercase transition duration-200'> 
    Description 
   </button> 
   <button className='px-8 py-3 text-base font-light text-gray-500 tracking-widest uppercase hover:text-black transition duration-200'> 
    Reviews (122) 
   </button> 
  </div> 
  <div className='p-8 text-base text-gray-700 space-y-4 font-light leading-relaxed border-b border-gray-200'> 
   <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p> 
   <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p> 
  </div> 
  </div> 

  {/* Related Products */} 
  <RelatedProducts category={productData.category} subCategory={productData.subCategory} /> 
 </div> 
 ) : ( 
 // Simple loading placeholder 
 <div className='flex justify-center items-center h-screen'>
        <p className='text-gray-500'>Loading Product...</p>
    </div>
 ) 
} 

 export default Product
