import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'
const PlaceOrder = () => {
    const [method, setMethod] = useState('cod')
    const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext)
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        phone: ''
    })

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value

        setFormData(data => ({ ...data, [name]: value }))
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault()
        try {

            let orderItems = []

            for (const items in cartItems) {
                for (const item in cartItems[items]) {
                    if (cartItems[items][item] > 0) {
                        const itemInfo = structuredClone(products.find(product => product._id === items))
                        if (itemInfo) {
                            itemInfo.size = item
                            itemInfo.quantity = cartItems[items][item]
                            orderItems.push(itemInfo)
                        }
                    }
                }
            }

            let orderData = {
                address: formData,
                items: orderItems,
                amount: getCartAmount() + delivery_fee
            }

            switch (method) {
                // API Calls for COD
                case 'cod':
                    const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } })
                    console.log(response.data)
                    if (response.data.success) {
                        setCartItems({})
                        navigate('/orders')
                    } else {
                        toast.error(response.data.message)
                    }
                    break

                case 'stripe':
                    const responseStripe = await axios.post(backendUrl + '/api/order/stripe', orderData, {headers: {token}})
                    if(responseStripe.data.success) {
                        const { session_url } = responseStripe.data
                        console.log(responseStripe.data);
                        
                        window.location.replace(session_url)
                    } else {
                        toast.error(responseStripe.data.message)
                    }
                    break

                default:
                    break
            }


        } catch (error) {
            console.log(error)
            toast.error(response.data.message)
        }
    }


    const containerClasses = 'flex flex-col lg:flex-row justify-center gap-10 lg:gap-20 pt-10 lg:pt-20 min-h-[80vh] border-t border-gray-100 bg-white'
    const formContainerClasses = 'flex flex-col gap-6 w-full lg:w-[540px] px-4'
    const titleWrapperClasses = 'text-2xl sm:text-3xl my-5 border-b pb-4 border-gray-200 tracking-widest uppercase font-serif'
    const inputClasses = 'border border-gray-300 focus:border-gray-500 rounded-none py-3 px-4 w-full text-base placeholder-gray-500 transition-all duration-300 shadow-sm focus:shadow-md hover:border-gray-400'

    const paymentOptionBaseClasses = 'flex items-center gap-4 border border-gray-200 p-4 lg:px-6 cursor-pointer transition duration-300 w-full hover:border-black/50 rounded-none';
    const radioBaseClasses = 'min-w-4 h-4 border-2 rounded-full transition duration-300';
    const logoClasses = 'h-6 lg:h-10 w-auto object-contain mx-3 lg:mx-4';
    const codTextClasses = 'text-gray-900 text-sm font-light tracking-widest uppercase mx-3 lg:mx-4';


    return (
        <form onSubmit={onSubmitHandler} className={containerClasses}>
            {/* Left Side: Delivery Information */}
            <div className={formContainerClasses}>
                <div className={titleWrapperClasses}>
                    <Title text1={'DELIVERY'} text2={'INFORMATION'} />
                </div>
                <div className='flex gap-4'>
                    <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className={inputClasses} type="text" placeholder='First Name' />
                    <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className={inputClasses} type="text" placeholder='Last Name' />
                </div>
                <input required onChange={onChangeHandler} name='email' value={formData.email} className={inputClasses} type="email" placeholder='Email Address' />
                <input required onChange={onChangeHandler} name='street' value={formData.street} className={inputClasses} type="text" placeholder='Street Address' />

                <div className='flex gap-4'>
                    <input required onChange={onChangeHandler} name='city' value={formData.city} className={inputClasses} type="text" placeholder='City' />
                    <input onChange={onChangeHandler} name='state' value={formData.satte} className={inputClasses} type="text" placeholder='State / Province' />
                </div>

                <div className='flex gap-4'>
                    <input required onChange={onChangeHandler} name='zipCode' value={formData.zipcode} className={inputClasses} type="number" placeholder='Zip / Postal Code' />
                    <input required onChange={onChangeHandler} name='country' value={formData.country} className={inputClasses} type="text" placeholder='Country' />
                </div>

                <input onChange={onChangeHandler} name='phone' value={formData.phone} className={inputClasses} type="number" placeholder='Phone Number' />

            </div>
            {/* Right Side: Cart Summary */}
            <div className='w-full lg:max-w-md px-4'>
                <div className='p-6 lg:p-8 border border-gray-200 bg-gray-50 shadow-lg'>
                    <CartTotal />
                </div>

                <div className='mt-12'>
                    <div className='text-2xl sm:text-3xl border-b pb-4 border-gray-200 tracking-widest uppercase font-serif'>
                        <Title text1={'PAYMENT'} text2={'METHOD'} />
                    </div>

                    {/* Payment Method Selection - LUXURY STYLED */}
                    <div className='flex gap-6 flex-col lg:flex-row mt-8'>
                        <div
                            onClick={() => setMethod('stripe')}
                            className={`${paymentOptionBaseClasses} ${method === 'stripe' ? 'border-black bg-gray-50/50 shadow-md' : ''}`}
                        >
                            <p className={`${radioBaseClasses} ${method === 'stripe' ? 'border-black bg-black' : 'border-gray-400'}`}></p>
                            <p className='text-blue-600 text-2xl ' alt="Stripe Payment" >Stripe</p>
                        </div>

                        <div
                            onClick={() => setMethod('cod')}
                            className={`${paymentOptionBaseClasses} ${method === 'cod' ? 'border-black bg-gray-50/50 shadow-md' : ''}`}
                        >
                            <p className={`${radioBaseClasses} ${method === 'cod' ? 'border-black bg-black' : 'border-gray-400'}`}></p>
                            <p className={codTextClasses}>CASH ON DELIVERY</p>
                        </div>
                    </div>

                    <div className='w-full text-end mt-8'>
                        <button type='submit' className='bg-black px-16 py-3 text-sm text-white'>PLACE ORDER</button>
                    </div>

                </div>

            </div>

        </form>
    )
}

export default PlaceOrder