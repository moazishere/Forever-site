import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = '$'
    const delivery_fee = 10
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [search, setSearch] = useState('')
    const [showSearch, setShowSearch] = useState(false)
    const [cartItems, setCartItems] = useState({})
    const [products, setProducts] = useState([])
    const [wishlistItems, setWishlistItems] = useState([])
    const [token, setToken] = useState('')
    const navigate = useNavigate()
    // Accept an id (string) and toggle its presence in wishlistItems
    const toggleWishlist = (id) => {
        if (!id) return
        setWishlistItems(prev => {
            if (prev && prev.includes(id)) {
                return prev.filter(item => item !== id)
            }
            return [...(prev || []), id]
        })
    }

    const addToCart = async (itemId, size) => {

        if (!size) {
            toast.error('Select Product Size')
            return
        }

        let cartData = structuredClone(cartItems)

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1
            }
            else {
                cartData[itemId][size] = 1
            }
        }
        else {
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }
        setCartItems(cartData)

        if (token) {
            try {

                await axios.post(backendUrl + '/api/cart/add', { itemId, size }, { headers: { token } })
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }
    }

    const getCartCount = () => {
        let totalCount = 0
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item]
                    }
                } catch (error) {

                }
            }
        }
        return totalCount
    }



    const getCartAmount = () => {
        const priceMap = new Map()
        products.forEach(p => priceMap.set(p._id, p.price))

        let totalAmount = 0
        for (const itemId in cartItems) {
            const price = priceMap.get(itemId)
            for (const size in cartItems[itemId]) {
                totalAmount += price * cartItems[itemId][size]
            }
        }

        return totalAmount
    }

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems)

        cartData[itemId][size] = quantity

        setCartItems(cartData)

        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity }, { headers: { token } })
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }
    }

    const getProductsData = async () => {
        try {

            const response = await axios.get(backendUrl + '/api/product/list')
            if (response.data.success) {
                setProducts(response.data.products)
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getUserCart = async (token) => {
        try {
            
            const response = await axios.post(backendUrl + '/api/cart/get', {},{headers: { token }})
            if(response.data.success) {
                setCartItems(response.data.cartData)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        getProductsData()
    }, [])

    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'))
        }
        
    }, [])

    const value = {
        products, currency, delivery_fee, updateQuantity,
        search, setSearch, showSearch, setShowSearch, wishlistItems, setWishlistItems,
        cartItems, setCartItems, addToCart, getCartCount, toggleWishlist,
        getCartAmount, navigate, backendUrl, setToken, token
    }




    useEffect(() => {
        console.log(cartItems);

    }, [cartItems])

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider