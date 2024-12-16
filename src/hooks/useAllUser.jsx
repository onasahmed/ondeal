import { useQuery } from '@tanstack/react-query'
import React from 'react'

const useAllUser = () => {
  const {
    data: users = [],
    refetch,
    isLoading
  } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await fetch('http://localhost:5001/')
      return response.json()
    }
  })
  return [users, refetch, isLoading]
}

export default useAllUser
