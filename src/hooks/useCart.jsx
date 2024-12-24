import { useContext } from 'react'
import { AuthContext } from '../provider/AuthProvider'
import useAxiosIntercept from './useAxiosIntercept'
import { useQuery } from '@tanstack/react-query'
const useCart = () => {
  const { user, loading } = useContext(AuthContext)
  const axiosInstance = useAxiosIntercept()
  const email = user?.providerData[0].email || user?.email
  const { data: cart = [], refetch } = useQuery({
    queryKey: ['cart', email],
    enabled: !!email && !loading,
    queryFn: async () => {
      const response = await axiosInstance.get(`/cart?email=${email}`)
      return response.data
    }
  })
  return [cart, refetch]
}

export default useCart
