import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import useAxiosIntercept from './useAxiosIntercept'

const useAddToCart = () => {
  const navigate = useNavigate()
  const axiosInstance = useAxiosIntercept()
  const handleAddToCart = async (item, user) => {
    const result = { item }

    if (user && user?.email) {
      try {
        await axiosInstance
          .post('/cart', {
            result: {
              ...result,
              item: {
                ...result.item,
                email: user?.email // Add email to the nested object
              }
            }
          })
          .then(function (response) {
            if (response.data) {
            //   if (refetch) refetch() 
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: `<span style="color: black; font-weight: bold;">Item Added to Cart</span>`,
                html: `
                  <div style="display: flex; align-items: center; color: #666; font-size: 14px;">
                    <div style="margin-right: 10px;">
                      <i class="fas fa-cart-plus" style="color: #FCD367; font-size: 24px;"></i>
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
                  popup: 'rounded-lg shadow-md'
                }
              })
            }
          })
      } catch (error) {
        console.error('Error adding to cart:', error)
      }
    } else {
      navigate('/login', { state: { from: location } })
    }
  }

  return { handleAddToCart }
}

export default useAddToCart
