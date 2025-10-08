import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
const Add = ({ token }) => {

  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('Men')
  const [subCategory, setSubCategory] = useState('Topwear')
  const [bestseller, setBestseller] = useState(false)
  const [sizes, setSizes] = useState([])

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    try {

      const formData = new FormData()

      formData.append("name", name)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("category", category)
      formData.append("subCategory", subCategory)
      formData.append("bestSeller", bestseller)
      formData.append("sizes", JSON.stringify(sizes))

      image1 && formData.append("image1", image1)
      image2 && formData.append("image2", image2)
      image3 && formData.append("image3", image3)
      image4 && formData.append("image4", image4)

      const response = await axios.post(backendUrl + "/api/product/add", formData, { headers: {token} } )

      if (response.data.success) {
        toast.success(response.data.message)
        setName('')
        setDescription('')
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setPrice('')
      } else {
        toast.error(response.data.message)
      }


    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }
  }

  const inputClasses = 'w-full max-w-[500px] px-4 py-3 border border-gray-300 rounded-none text-base placeholder-gray-500 focus:border-black focus:outline-none transition';
  const selectClasses = 'w-full px-4 py-3 border border-gray-300 rounded-none bg-white text-base focus:border-black focus:outline-none appearance-none cursor-pointer';
  const labelClasses = 'mb-2 text-sm font-medium tracking-wider uppercase text-gray-800';
  const submitButtonClasses = 'w-48 py-3 mt-8 bg-black text-white rounded-none text-base font-normal tracking-widest uppercase shadow-md hover:bg-gray-800 transition duration-300';

  const imageUploadContainerClasses = 'w-20 h-20 lg:w-24 lg:h-24 border border-gray-300 flex items-center justify-center cursor-pointer hover:border-black transition rounded-none';

  return (
    <div className='p-6 lg:p-10 bg-white shadow-xl rounded-none'> {/* Wrapper for the form for a contained look */}
      <h1 className='text-3xl font-light tracking-widest uppercase text-gray-900 mb-8 border-b pb-2'>Add New Product</h1>
      <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-8'> {/* Increased vertical gap */}

        {/* Product Images Upload */}
        <div>
          <p className={labelClasses}>Upload Product Images (Max 4)</p>
          
          <div className='flex gap-4 flex-wrap'>

            {/* Image 1 */}
            <label htmlFor="image1" className={imageUploadContainerClasses}>
              <img className='w-full h-full object-cover' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="Upload Area" />
              <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" hidden />
            </label>

            {/* Image 2 */}
            <label htmlFor="image2" className={imageUploadContainerClasses}>
              <img className='w-full h-full object-cover' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="Upload Area" />
              <input onChange={(e) => setImage2(e.target.files[0])} type="file" id="image2" hidden />
            </label>

            {/* Image 3 */}
            <label htmlFor="image3" className={imageUploadContainerClasses}>
              <img className='w-full h-full object-cover' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="Upload Area" />
              <input onChange={(e) => setImage3(e.target.files[0])} type="file" id="image3" hidden />
            </label>

            {/* Image 4 */}
            <label htmlFor="image4" className={imageUploadContainerClasses}>
              <img className='w-full h-full object-cover' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="Upload Area" />
              <input onChange={(e) => setImage4(e.target.files[0])} type="file" id="image4" hidden />
            </label>

          </div>
        </div>

        {/* Product Name */}
        <div className='w-full'>
          <p className={labelClasses}>Product name</p>
          <input onChange={(e) => setName(e.target.value)} value={name} className={inputClasses} type="text" placeholder='The Signature Wool Coat' required />
        </div>

        {/* Product Description */}
        <div className='w-full'>
          <p className={labelClasses}>Product description</p>
          <textarea onChange={(e) => setDescription(e.target.value)} value={description} className={`${inputClasses} resize-none`} rows="4" placeholder='Describe materials, fit, and inspiration...' required />
        </div>

        {/* Categories, Subcategories, and Price */}
      
        <div className='flex flex-col sm:flex-row gap-6 w-full sm:gap-8'>

          <div className='sm:w-1/3'>
            <p className={labelClasses}>Product category</p>
            <select onChange={(e) => setCategory(e.target.value)} className={selectClasses}>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>

          <div className='sm:w-1/3'>
            <p className={labelClasses}>Sub category</p>
            <select onChange={(e) => setSubCategory(e.target.value)} className={selectClasses}>
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>

          <div className='sm:w-1/3'>
            <p className={labelClasses}>Product Price ($)</p>
            <input onChange={(e) => setPrice(e.target.value)} className={inputClasses} type="Number" placeholder='e.g., 250.00' />
          </div>

        </div>

        {/* Product Sizes */}
        <div>
          <p className={labelClasses}>Available Sizes</p>
          <div className='flex gap-3'>
            <div onClick={() => setSizes(prev => prev.includes("S") ? prev.filter(item => item !== "S") : [...prev, "S"])}>
              <p className={`${sizes.includes("S") ? "bg-black text-white" : "bg-white"} px-4 py-2 border border-gray-300 cursor-pointer text-sm font-medium hover:border-black transition duration-200 rounded-none`}>S</p>
            </div>

            <div onClick={() => setSizes(prev => prev.includes("M") ? prev.filter(item => item !== "M") : [...prev, "M"])}>
              <p className={`${sizes.includes("M") ? "bg-black text-white" : "bg-white"} px-4 py-2 border border-gray-300 cursor-pointer text-sm font-medium hover:border-black transition duration-200 rounded-none`}>M</p>
            </div>
            <div onClick={() => setSizes(prev => prev.includes("L") ? prev.filter(item => item !== "L") : [...prev, "L"])}>
              <p className={`${sizes.includes("L") ? "bg-black text-white" : "bg-white"} px-4 py-2 border border-gray-300 cursor-pointer text-sm font-medium hover:border-black transition duration-200 rounded-none`}>L</p>
            </div>
            <div onClick={() => setSizes(prev => prev.includes("XL") ? prev.filter(item => item !== "XL") : [...prev, "XL"])}>
              <p className={`${sizes.includes("XL") ? "bg-black text-white" : "bg-white"} px-4 py-2 border border-gray-300 cursor-pointer text-sm font-medium hover:border-black transition duration-200 rounded-none`}>XL</p>
            </div>
            <div onClick={() => setSizes(prev => prev.includes("XXL") ? prev.filter(item => item !== "XXL") : [...prev, "XXL"])}>
              <p className={`${sizes.includes("XXL") ? "bg-black text-white" : "bg-white"} px-4 py-2 border border-gray-300 cursor-pointer text-sm font-medium hover:border-black transition duration-200 rounded-none`}>XXL</p>
            </div>

          </div>

        </div>

        {/* Bestseller Checkbox */}
        <div className='flex items-center gap-3 mt-4'>
          <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} className='w-4 h-4 border-gray-400 checked:bg-black checked:border-black rounded-none transition' type="checkbox" id='bestseller' />
          <label className='cursor-pointer text-sm font-light text-gray-700' htmlFor="bestseller">Add to Bestseller Collection</label>
        </div>

        {/* Submit Button */}
        <button type="submit" className={submitButtonClasses}>
          Add Product
        </button>

      </form>
    </div>
  )
}

export default Add