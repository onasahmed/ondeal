import React from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import useCart from '../hooks/useCart'
import useAxiosIntercept from '../hooks/useAxiosIntercept'
import Swal from 'sweetalert2'

const Cart = () => {
  const [cart, refetch] = useCart()

  console.log(cart?.data)
  const axiosInstance = useAxiosIntercept()

  // Handle quantity increase
  const handleIncreaseQuantity = async item => {
    try {
      await axiosInstance.patch(`/cart/${item._id}`, {
        quantity: item.quantity + 1
      })
      refetch()
    } catch (error) {
      console.error('Error increasing quantity:', error)
    }
  }

  // Handle quantity decrease
  const handleDecreaseQuantity = async item => {
    if (item.quantity > 1) {
      try {
        await axiosInstance.patch(`/cart/${item._id}`, {
          quantity: item.quantity - 1
        })
        refetch()
      } catch (error) {
        console.error('Error decreasing quantity:', error)
      }
    } else {
      Swal.fire({
        title: 'Minimum quantity reached',
        icon: 'info',
        timer: 2000,
        showConfirmButton: false
      })
    }
  }

  // Handle delete item
  const handleDeleteItem = async item => {
    try {
      const confirm = await Swal.fire({
        title: 'Are you sure?',
        text: 'This item will be removed from your cart.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
      })
      if (confirm.isConfirmed) {
        await axiosInstance.delete(`/cart/${item._id}`)
        Swal.fire({
          title: 'Deleted!',
          text: 'Your item has been removed.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        })
        refetch()
      }
    } catch (error) {
      console.error('Error deleting item:', error)
    }
  }
  return (
    <div className='container mx-auto p-4'>
      <h2 className='text-2xl font-bold mb-4'>Your Cart</h2>
      {cart?.data?.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <table className='w-full border-collapse border border-gray-300'>
          <thead>
            <tr className='bg-gray-100'>
              <th className='border border-gray-300 p-2'>Image</th>
              <th className='border border-gray-300 p-2'>Product</th>
              <th className='border border-gray-300 p-2'>Price</th>
              <th className='border border-gray-300 p-2'>Quantity</th>
              <th className='border border-gray-300 p-2'>Total</th>
              <th className='border border-gray-300 p-2'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cart?.data?.map(item => (
              <tr key={item._id} className='hover:bg-gray-50'>
                <td className='border border-gray-300 p-2 text-center'>
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className='h-16 w-16 object-cover mx-auto'
                  />
                </td>
                <td className='border border-gray-300 p-2'>{item.title}</td>
                <td className='border border-gray-300 p-2'>
                  ${item.price.toFixed(2)}
                </td>
                <td className='border border-gray-300 p-2 text-center'>
                  <div className='flex items-center justify-center gap-2'>
                    <button
                      onClick={() => handleDecreaseQuantity(item)}
                      className='px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded'
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => handleIncreaseQuantity(item)}
                      className='px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded'
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className='border border-gray-300 p-2'>
                  ${(item.price * item.quantity).toFixed(2)}
                </td>
                <td className='border border-gray-300 p-2 text-center'>
                  <button
                    onClick={() => handleDeleteItem(item)}
                    className='text-red-500 hover:text-red-700'
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Cart
