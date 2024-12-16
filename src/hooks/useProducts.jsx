
import { useContext } from 'react'
import { AuthContext } from '../provider/AuthProvider'
import useAxiosIntercept from './useAxiosIntercept'
import { useQuery } from '@tanstack/react-query'
const useProducts = () => {
  const { user, loading } = useContext(AuthContext)
  const axiosInstance = useAxiosIntercept()
  const email = user?.providerData[0].email || user?.email
  const { data: products = [], refetch } = useQuery({
    queryKey: ['products', email],
   enabled: !!email && !loading,
    queryFn: async () => {
      const response = await axiosInstance.get(`/users/${email}`)
      return response.data
    }
  })
  return [products, refetch]
}

export default useProducts
