import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import useAddToCart from '../hooks/useAddToCart'
import { AuthContext } from '../provider/AuthProvider'
import axios from 'axios'

const ProductDetails = () => {
  const { id } = useParams() // Extract the ID from the route params
  const { handleAddToCart } = useAddToCart()
  const { user } = useContext(AuthContext)

  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentThumbnail, setCurrentThumbnail] = useState(null) // Initialize with null

  useEffect(() => {
    // Fetch the product details using the ID
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/products/${id}`)
        const product = response.data
        setItem(product)
        setCurrentThumbnail(product.thumbnail) // Update thumbnail after fetching the product
        setLoading(false)
      } catch (err) {
        setError('Failed to fetch product details')
        setLoading(false)
      }
    }

    fetchProductDetails()
  }, [id])

  if (loading) return <div>Loading product details...</div>
  if (error) return <div>{error}</div>

  const {
    title,
    description,
    category,
    price,
    discountPercentage,
    rating,
    stock,
    brand,
    images
  } = item

  const handleThumbnailClick = image => {
    setCurrentThumbnail(image)
  }

  const handleBuyNow = () => {
    const message = `Hi! I am interested in purchasing "${title}" for $${price.toFixed(
      2
    )}. Could you please provide more details?`
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/8801904324917?text=${encodedMessage}`, '_blank')
  }

  return (
    <div className='max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        {/* Product Image Section */}
        <div>
          <img
            src={currentThumbnail}
            alt={title}
            className='w-full h-96 object-contain rounded-lg border border-gray-200'
          />
          <div className='flex mt-4 space-x-2 overflow-x-scroll'>
            {images?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${title}-${index}`}
                onClick={() => handleThumbnailClick(img)}
                className={`w-20 h-20 object-cover border rounded-md cursor-pointer ${
                  currentThumbnail === img
                    ? 'border-[#FCD367] shadow-md'
                    : 'border-gray-200 hover:shadow-lg'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Product Details Section */}
        <div>
          <h1 className='text-2xl font-semibold text-gray-800'>{title}</h1>
          <p className='text-sm text-gray-500 mt-1'>Category: {category}</p>
          <div className='flex items-center mt-4 space-x-4'>
            <span className='text-3xl font-bold text-[#FCD367]'>
              ${price.toFixed(2)}
            </span>
            {discountPercentage > 0 && (
              <span className='text-sm text-red-500 line-through'>
                -{discountPercentage.toFixed(0)}%
              </span>
            )}
          </div>
          <p className='mt-4 text-gray-600'>{description}</p>

          {/* Add to Cart and Buy Now Buttons */}
          <div className='mt-6 flex space-x-4'>
            <button
              onClick={() => handleAddToCart(item, user)}
              className='bg-[#FCD367] text-black px-6 py-3 rounded-lg font-semibold hover:bg-[#fcbf40] transition'
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className='bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#FCD367] transition'
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
