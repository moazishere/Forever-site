import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { assets } from '../assets/assets'
import { toast } from 'react-toastify'

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([])

  const statusHandler = async (event, orderId) => {
    if (!token) {
      return
    }

    try {
      const response = await axios.post(backendUrl + '/api/order/status', { orderId, status: event.target.value }, { headers: { token } })
      if (response.data.success) {
        await fetchAllOrders()
      }
    } catch (error) {
      console.log(error)
      toast.error(response.data.message)
      
    }

  }

  const fetchAllOrders = async () => {
    if (!token) {
      return
    }

    try {
      const response = await axios.post(
        backendUrl + '/api/order/list',
        {},
        { headers: { token } }
      )

      if (response.data.success) {
        setOrders(response.data.orders.reverse())
        console.log(response.data);

      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.error("Error fetching orders:", error)
      toast.error("Failed to fetch orders list.")
    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [token])

  return (
    <div className='p-6 lg:p-10 bg-white shadow-xl rounded-none min-h-[60vh]'>
      <h1 className='text-3xl font-light tracking-widest uppercase text-gray-900 mb-8 border-b pb-2'>Order Management</h1>

      <div className='flex flex-col gap-4'>
        {/* Order Header (Desktop Only) - Column order matches content below */}
        <div className='hidden lg:grid grid-cols-[0.5fr_3fr_1fr_1fr_1fr] items-center py-3 px-4 bg-gray-900 text-white text-sm font-medium tracking-wider uppercase rounded-none'>
          <b>ID</b>
          <b>Items & Address</b>
          <b>Order Details</b>
          <b>Total Amount</b>
          <b>Status Update</b>
        </div>

        {/* Order List */}
        {orders.length === 0 ? (
          <p className='py-8 text-center text-gray-500'>No new orders found.</p>
        ) : (
          orders.map((order, orderIndex) => (
            <div
              className='grid grid-cols-1 md:grid-cols-[1fr_2fr] lg:grid-cols-[0.5fr_3fr_1fr_1fr_1fr] gap-4 items-start border border-gray-300 p-4 md:p-6 my-1 text-xs sm:text-sm text-gray-700 font-light rounded-none shadow-sm'
              key={orderIndex}
            >

              {/* ID / Icon (1st column on desktop) */}
              <div className='flex items-center gap-3 lg:block'>
                <img className='w-8 lg:w-10' src={assets.parcel_icon} alt="parcel" />
                {/* Displaying Sliced Unique ID for clarity */}
                <span className='text-gray-500 font-normal hidden lg:block text-xs uppercase mt-1'>
                  ID: {order._id.slice(0, 6)}...
                </span>
                <span className='lg:hidden text-gray-900 font-semibold text-[13px]'>
                  Order ID: {order._id.slice(0, 8)}...
                </span>
              </div>


              {/* Items & Address (2nd column on desktop, primary info on mobile) */}
              <div className='flex flex-col gap-2'>
                <p className='text-gray-900 font-medium border-b border-gray-100 pb-1'>
                  {order.items.map((item, itemIndex) => {
                    const itemDetail = `${item.name} x ${item.quantity} (${item.size})`;
                    return (
                      <span key={itemIndex}>{itemDetail}{itemIndex < order.items.length - 1 ? ', ' : ''}</span>
                    );
                  })}
                </p>
                <p className='font-semibold text-gray-800'>{order.address.firstName + " " + order.address.lastName}</p>
                <div className='text-[13px]'>
                  <p>{order.address.street + ", " + order.address.city}</p>
                  <p>{order.address.state + ", " + order.address.zipCode + ", " + order.address.country}</p>
                  <p className='mt-1 font-medium'>Phone: {order.address.phone}</p>
                </div>
              </div>

              {/* Order Details (3rd column on desktop) */}
              <div className='hidden lg:block text-gray-800 font-normal'>
                <p>Items: <span className='font-medium'>{order.items.length}</span></p>
                <p>Payment: <span className={`font-medium ${order.payment ? 'text-green-600' : 'text-orange-500'}`}>{order.payment ? 'Done' : 'Pending'}</span></p>
                <p>Method: {order.paymentMethod}</p>
                <p>Date: {new Date(order.date).toLocaleDateString()}</p>
              </div>

              {/* Total Amount (4th column on desktop, part of mobile details) */}
              <div className='text-xl font-semibold text-gray-900 border-t pt-2 mt-2 md:border-t-0 md:pt-0'>
                {currency}{order.amount}
              </div>

              {/* Status Dropdown (5th column on desktop, separate action on mobile) - Enhanced Styling */}
              <select
                onChange={(event)=> statusHandler(event,order._id)}
                value={order.status}
                className={`p-3 border font-medium text-sm rounded-lg shadow-sm w-full transition duration-150 focus:ring-2 focus:ring-offset-2 focus:ring-black cursor-pointer ${order.status === 'Delivered'
                  ? 'bg-green-100 border-green-500 text-green-700'
                  : order.status === 'Shipped' || order.status === 'Out for delivery'
                    ? 'bg-yellow-100 border-yellow-500 text-yellow-700'
                    : 'bg-gray-100 border-gray-400 text-gray-700'
                  }`}
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>

          ))
        )}
      </div>
    </div>
  )
}

export default Orders
