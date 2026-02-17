import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'
const Login = () => {

    const [currentState, setCurrentState] = useState('Login')
    const { token, setToken, navigate, backendUrl } = useContext(ShopContext)

    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')


    const onSubmitHandler = async (event) => {
        event.preventDefault()
        try {
            let response;
            if (currentState === 'Sign Up') {
                response = await axios.post(backendUrl + '/api/user/register', { name, email, password })
            } else {
                response = await axios.post(backendUrl + '/api/user/login', { email, password })
            }

            if (response.data.success) {
                setToken(response.data.token)
                localStorage.setItem('token', response.data.token)
                toast.success(currentState === 'Sign Up' ? 'Signed Up Successfully!' : 'Signed In Successfully!')

                // Navigate مباشرة بعد الـ toast
                navigate('/')
            } else {
                toast.error(response.data.error)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (token) {
            navigate('/')
        }
    }, [token])
    return (
        <div className='py-20 lg:py-32 min-h-screen bg-gray-50/50'> {/* Added luxurious background and vertical padding */}
            <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-md m-auto gap-6 bg-white p-8 lg:p-12 border border-gray-200 shadow-xl rounded-none'> {/* Increased max-width, added white background, padding, border, and sharp shadow */}

                {/* Title Section */}
                <div className='w-full flex flex-col items-center mb-6'> {/* Adjusted layout for centered, stacked title */}
                    <p className='text-4xl lg:text-5xl font-light text-gray-900 tracking-widest uppercase mb-2'>{currentState}</p> {/* Luxurious typography */}
                    <hr className='border-none h-[2px] w-16 bg-gray-900' /> {/* Thicker, shorter separator */}
                </div>

                {/* Input Fields */}
                <div className='w-full flex flex-col gap-4'>
                    {currentState === 'Login' ? '' :
                        <input
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            type="text"
                            className='w-full px-4 py-3 border border-gray-300 rounded-none text-base placeholder-gray-500 focus:border-black focus:outline-none transition'
                            placeholder='Name'
                            required
                        />
                    }
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        type="email"
                        className='w-full px-4 py-3 border border-gray-300 rounded-none text-base placeholder-gray-500 focus:border-black focus:outline-none transition'
                        placeholder='Email Address'
                        required
                    />
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        type="password"
                        className='w-full px-4 py-3 border border-gray-300 rounded-none text-base placeholder-gray-500 focus:border-black focus:outline-none transition'
                        placeholder='Password'
                        required
                    />
                </div>

                {/* Submit Button */}
                <button type="submit" className='w-full mt-2 bg-black text-white px-8 py-3 rounded-none text-base font-light tracking-widest uppercase shadow-md hover:bg-gray-800 transition duration-300'>
                    {currentState === 'Login' ? 'Sign In' : 'Create Account'}
                </button>

                {/* Links and State Switch */}
                <div className='w-full flex justify-between text-sm mt-2'>
                    <p className='text-gray-600 font-light tracking-wide cursor-pointer hover:text-black transition'>
                        {currentState === 'Login' ? 'Forgot your password?' : ''}
                    </p>
                    {
                        currentState === 'Login'
                            ? <p onClick={() => setCurrentState('Sign Up')} className='text-black font-normal tracking-wide cursor-pointer hover:opacity-80 transition'>CREATE ACCOUNT</p>
                            : <p onClick={() => setCurrentState('Login')} className='text-black font-normal tracking-wide cursor-pointer hover:opacity-80 transition'>LOGIN HERE</p>
                    }
                </div>

            </form>
        </div>
    )
}

export default Login