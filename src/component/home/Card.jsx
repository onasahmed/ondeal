import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../provider/AuthProvider'
import axios from 'axios'
import Swal from 'sweetalert2'
import useAxiosIntercept from '../../hooks/useAxiosIntercept'
const Card = ({ item }) => {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const axiosInstance = useAxiosIntercept()
  const handleCardInfo = async item => {
    const result = {
      item
    }
    if (user && user?.email) {
      try {
        await axiosInstance
          .post('/cart', {
            result: {
              ...result, // Spread the existing result object
              item: {
                ...result.item, // Ensure you're working with the nested item object
                email: user?.email // Add the email field
              }
            }
          })

          .then(function (response) {
            console.log(response)
            if (response.data) {
              // refetch()
              Swal.fire({
                position: 'top-end',
                icon: 'success', // this will set the default icon but will be overridden by custom HTML
                title: `<span style="color: black; font-weight: bold;">Item Added to Cart</span>`,
                html: `
                  <div style="display: flex; align-items: center; color: #666; font-size: 14px;">
                    <div style="margin-right: 10px;">
                      <FaCartPlus style="color: #FCD367; font-size: 24px;" />
                    </div>
                    <p style="margin: 0;">You can view your cart or continue shopping.</p>
                  </div>
                `,
                showConfirmButton: true,
                confirmButtonText: 'View Cart',
                confirmButtonColor: '#FCD367',
                cancelButtonText: 'Continue Shopping',
                showCancelButton: true,
                cancelButtonColor: 'black',
                timer: 3000,
                background: '#fff9e5',
                customClass: {
                  popup: 'rounded-lg shadow-md' // You can use Tailwind or other styles directly here
                }
              })

              // navigate(`/cart/${result._id}`); // Uncomment if you want to navigate
            }
          })
      } catch (error) {
        console.error(error)
      }
    } else {
      navigate('/login', { state: { from: location } })
    }
  }

  const handleCardClick = () => {
    navigate(`/products/${item.id}`)
  }
  return (
    <div className='bg-white border border-[#FCD367] shadow-md rounded-lg overflow-hidden cursor-pointer'>
      {/* Item Image */}
      <div className='h-[200px] bg-[#FCD367] flex items-center justify-center'>
        <img
          src={item.thumbnail}
          alt={item.title}
          className='object-contain h-full'
        />
      </div>

      {/* Item Content */}
      <div className='p-4'>
        {/* Title */}
        <h2
          className='text-lg font-semibold text-black truncate hover:underline hover:text-[#FCD367]'
          onClick={handleCardClick}
        >
          {item.title}
        </h2>

        {/* Price and Discount */}
        <div className='flex items-center justify-between mt-2'>
          <span className='text-xl font-bold text-[#FCD367]'>
            ${item.price.toFixed(2)}
          </span>
          {item.discountPercentage > 0 && (
            <span className='text-sm text-gray-500 line-through'>
              -{item.discountPercentage.toFixed(0)}%
            </span>
          )}
        </div>

        {/* Category */}
        <p className='text-sm text-gray-600 mt-1'>{item.category}</p>

        {/* Rating */}
        <div className='flex items-center mt-3'>
          <div className='flex text-[#FCD367]'>
            {Array.from({ length: Math.floor(item.rating) }).map((_, i) => (
              <span key={i}>⭐</span>
            ))}
          </div>
          <span className='ml-2 text-sm text-gray-600'>
            ({item.rating.toFixed(1)})
          </span>
        </div>

        {/* Availability */}
        <p
          className={`mt-3 text-sm font-medium ${
            item.availabilityStatus === 'Low Stock'
              ? 'text-red-500'
              : 'text-green-600'
          }`}
        >
          {item.availabilityStatus}
        </p>

        {/* Add to Cart Button */}
        <div className='mt-4 flex justify-center'>
          <button
            className='bg-black text-white px-4 py-2 text-sm rounded hover:bg-[#FCD367] hover:text-black'
            onClick={() => {
              handleCardInfo(item)
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default Card
