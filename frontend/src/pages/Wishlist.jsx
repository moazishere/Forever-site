import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItem from '../components/ProductItem' 


const Wishlist = () => {

    const { products, wishlistItems, toggleWishlist } = useContext(ShopContext); 
    const [favoriteProducts, setFavouriteProducts] = useState([])

    useEffect(()=>{
        
        if (!wishlistItems || wishlistItems.length === 0) {
            setFavouriteProducts([])
            return
        }

        const favs = products.filter((product) => 
            wishlistItems.includes(product._id)
        )

        setFavouriteProducts(favs)
        console.log(favs);

    }, [products, wishlistItems])

    return (
        <div className='py-16 md:py-24 max-w-7xl mx-auto px-4 min-h-[70vh]'>
            
            {/* Page Header */}
            <div className='text-center mb-12 md:mb-16'>
                <h1 className='text-4xl lg:text-6xl font-light tracking-wide text-gray-900 uppercase mb-4'>
                    Your Favourites
                </h1>
                <p className='max-w-xl mx-auto text-base font-light text-gray-600'>
                    A curated selection of pieces you love.
                </p>
            </div>

            {favoriteProducts.length > 0 ? (
                
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8'>
                    {favoriteProducts.map((item) => (
                        <div key={item._id} className='relative group'>
                            <ProductItem 
                                id={item._id} 
                                image={item.image} 
                                name={item.name} 
                                price={item.price} 
                            />
                            
                            <button 
                                onClick={() => toggleWishlist(item._id)} 
                                className='absolute top-3 right-3 p-2 bg-white text-gray-900 border border-gray-300 rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-500 hover:text-white'
                                aria-label="Remove from favourites"
                            >
                                X
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                // Empty State
                <div className='flex flex-col items-center justify-center text-center py-20 bg-gray-50 border border-gray-200 rounded-none shadow-sm'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-gray-400 mb-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.004-4.363 2.376C11.597 4.754 10.137 3.75 8.625 3.75c-2.589 0-4.688 2.015-4.688 4.5 0 2.227 1.34 3.993 4.264 6.775l7.152 5.602a.5.5 0 00.73 0l7.153-5.602c2.923-2.782 4.263-4.548 4.263-6.775z" />
                    </svg>

                    <h2 className='text-2xl font-normal text-gray-700 mb-3'>
                        Your favourites list is empty.
                    </h2>
                    <p className='text-gray-500 mb-8'>
                        Browse our collection and add the pieces you love to save them for later.
                    </p>
                    <a 
                        href="/collection" 
                        className='inline-block bg-black text-white px-8 py-3 rounded-none text-sm font-normal tracking-widest uppercase hover:bg-gray-800 transition duration-300'
                    >
                        Start Shopping
                    </a>
                </div>
            )}
        </div>
    )
}

export default Wishlist