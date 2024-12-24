import React, { useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../provider/AuthProvider'

import useAddToCart from '../../hooks/useAddToCart'
const Card = ({ item }) => {
  const location = useLocation()
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const { handleAddToCart } = useAddToCart()

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
            onClick={() => handleAddToCart(item, user)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default Card
