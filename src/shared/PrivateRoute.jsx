import { Navigate, useLocation } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../provider/AuthProvider'
import { CgSpinner } from 'react-icons/cg'

const PrivateRoute = ({ children }) => {
  const { user, loading, reload } = useContext(AuthContext)
  const location = useLocation()

  if (loading || reload) {
    return (
      <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 z-50'>
        <CgSpinner className='animate-spin h-16 w-16 text-white' />
      </div>
    )
  }

  if (!user) {
    return <Navigate to='/login' state={{ from: location }} replace></Navigate>
  } else {
    return children
  }
}

export default PrivateRoute
