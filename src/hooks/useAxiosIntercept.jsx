import { useContext, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../provider/AuthProvider'

const useAxiosIntercept = () => {
  const navigate = useNavigate()
  const { logOut } = useContext(AuthContext)

  const axiosInstance = axios.create({
    baseURL: 'http://localhost:5001'
  })

  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      config => {
        const token = localStorage
          .getItem('access-token')
          ?.replace(/^"|"$/g, '')
  
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
      },
      error => {
        return Promise.reject(error)
      }
    )

    const responseInterceptor = axiosInstance.interceptors.response.use(
      response => response,
      error => {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          logOut()
          navigate('/login')
        }
        return Promise.reject(error)
      }
    )

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor)
      axiosInstance.interceptors.response.eject(responseInterceptor)
    }
  }, [navigate, logOut, axiosInstance])

  return axiosInstance
}

export default useAxiosIntercept
