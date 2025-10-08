import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'

const Collection = () => {

 const { products, search, showSearch } = useContext(ShopContext)
 const [showFilter, setShowFilter] = useState(false)
 const [filterProducts, setFilterProducts] = useState([])
 const [category, setCategory] = useState([])
 const [subCategory, setSubCategory] = useState([])
 const [sortType, setSortType] = useState('relavent')

 const toggleCategory = (e) => {
  if (category.includes(e.target.value)) {
   setCategory(prev=> prev.filter(item => item !== e.target.value))
  } else {
   setCategory(prev => [...prev, e.target.value])
  }
 }
 const toggleSubCategory = (e) => {
  if (subCategory.includes(e.target.value)) {
   setSubCategory(prev=> prev.filter(item => item !== e.target.value))
  } else {
   setSubCategory(prev => [...prev, e.target.value])
  }
 }

 const applyFilter = () => {
  let productsCopy = products.slice()

  if (showSearch && search) {
   productsCopy = productsCopy.filter(item=>item.name.toLowerCase().includes(search.toLowerCase()))
  }

  if (category.length > 0) {
   productsCopy = productsCopy.filter(item => category.includes(item.category))
  }

  if (subCategory.length > 0) {
   productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory))
  }

  setFilterProducts(productsCopy)
 }

 const sortProducts = () => {
  let fpCopy = filterProducts.slice()

  switch (sortType) {
   case 'low-high':
    setFilterProducts(fpCopy.sort((a,b)=>(a.price - b.price)))
    break
   case 'high-low': 
    setFilterProducts(fpCopy.sort((a,b) => (b.price - a.price)))
    break
   
   default:
    applyFilter()
    break
  }
 }

 useEffect(()=>{
  applyFilter()
 }, [category, subCategory, search, showSearch, products])

 useEffect(()=>{
  sortProducts()
 }, [sortType])


 return (
  <div className='flex flex-col lg:flex-row gap-10 lg:gap-16 pt-16 border-t border-gray-100'> {/* Increased gap and padding */}
   
   {/* Left Side: Filter Options (The Sidebar) */}
   <div className='min-w-[240px] px-4 lg:px-0'> {/* Defined width for clean layout */}
    <p onClick={()=>setShowFilter(!showFilter)} className='text-base font-normal tracking-widest uppercase flex items-center cursor-pointer gap-2 py-2 border-b border-gray-900 lg:border-none'>FILTERS
     <img className={`h-3 lg:hidden transition ${showFilter ? 'rotate-90': ''}`} src={assets.dropdown_icon} alt="" />
    </p>
    
    {/* Filter Content Container */}
    <div className={`mt-6 lg:mt-8 space-y-8 ${showFilter ? ' ':'hidden'} lg:block`}>

     {/* Category Filter */}
     <div className='pb-4 border-b border-gray-200'>
      <p className='mb-4 text-sm font-medium tracking-widest uppercase text-gray-900'>CATEGORIES</p>
      <div className='flex flex-col gap-3 text-sm font-light text-gray-700'>
       <label className='flex items-center gap-3 cursor-pointer hover:text-black transition'>
        <input className='w-4 h-4 border-gray-400 checked:bg-black checked:border-black rounded-none transition' type="checkbox" value={'Men'} onChange={toggleCategory}/> Men
       </label>
       <label className='flex items-center gap-3 cursor-pointer hover:text-black transition'>
        <input className='w-4 h-4 border-gray-400 checked:bg-black checked:border-black rounded-none transition' type="checkbox" value={'Women'} onChange={toggleCategory}/> Women
       </label>
       <label className='flex items-center gap-3 cursor-pointer hover:text-black transition'>
        <input className='w-4 h-4 border-gray-400 checked:bg-black checked:border-black rounded-none transition' type="checkbox" value={'Kids'} onChange={toggleCategory}/> Kids
       </label>
      </div>
     </div>

     {/* SubCategory Filter */}
     <div className='pb-4 border-b border-gray-200'>
      <p className='mb-4 text-sm font-medium tracking-widest uppercase text-gray-900'>TYPE</p>
      <div className='flex flex-col gap-3 text-sm font-light text-gray-700'>
       <label className='flex items-center gap-3 cursor-pointer hover:text-black transition'>
        <input className='w-4 h-4 border-gray-400 checked:bg-black checked:border-black rounded-none transition' type="checkbox" value={'Topwear'} onChange={toggleSubCategory}/> Topwear
       </label>
       <label className='flex items-center gap-3 cursor-pointer hover:text-black transition'>
        <input className='w-4 h-4 border-gray-400 checked:bg-black checked:border-black rounded-none transition' type="checkbox" value={'Bottomwear'} onChange={toggleSubCategory}/> Bottomwear
       </label>
       <label className='flex items-center gap-3 cursor-pointer hover:text-black transition'>
        <input className='w-4 h-4 border-gray-400 checked:bg-black checked:border-black rounded-none transition' type="checkbox" value={'Winterwear'} onChange={toggleSubCategory}/> Winterwear
       </label>
      </div>
     </div>

    </div>
   </div>

   {/* Right Side: Title, Sort, and Products */}
   <div className='w-full px-4 lg:px-0'>
    <div className='flex justify-between items-center text-lg lg:text-2xl mb-8 border-b border-gray-200 pb-4'>
     <Title text1={'ALL'} text2={'COLLECTIONS'} />
     
     {/* Product Sort (The Dropdown) */}
     <div className='flex items-center gap-3 text-sm font-light text-gray-700 tracking-wider'>
      <label htmlFor='sort-select' className='hidden sm:block uppercase'>Sort By</label>
      <select 
       id='sort-select'
       onChange={(e)=>setSortType(e.target.value)} 
       className='border border-gray-300 text-sm py-2 px-3 rounded-none bg-white font-normal tracking-wide focus:border-black focus:ring-0 appearance-none'
      >
       <option value="relavent">Relevance</option>
       <option value="low-high">Price: Low to High</option>
       <option value="high-low">Price: High to Low</option>
      </select>
     </div>
    </div>

    {/* Map Products */}
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8'> {/* Increased gap */}
     {
      filterProducts.map((item, index)=>(
       <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image}/>
      ))
     }
    </div>

   </div>
  </div>
 )
}

export default Collection