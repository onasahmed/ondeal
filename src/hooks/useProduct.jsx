import { useQuery } from '@tanstack/react-query'

const useProduct = () => {
  const {
    data: products = [],
    refetch,
    isLoading
  } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await fetch('https://dummyjson.com/products')
      return response.json()
    }
  })
  return [products, refetch, isLoading]
}

export default useProduct
