import { useContext } from 'react'
import useProducts from '../hooks/useProducts'
import { AuthContext } from '../provider/AuthProvider'
import { CgSpinner } from 'react-icons/cg'

const About = () => {
  const { loading } = useContext(AuthContext)
 
  const [products, refetch] = useProducts()
  return (
    <div className='flex items-center justify-center min-h-screen bg-[#DAF1DE]'>
      {/* Overlay Spinner */}
      {loading && (
        <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 z-10'>
          <CgSpinner className='animate-spin h-16 w-16' />
        </div>
      )}
      <div>
        <h1 className='text-red-800'>This is users:</h1>
       
        <h1 className='text-red-800'>This is products:</h1>
        {products?.map(product => (
          <p key={product._id}>{product.name}</p>
        ))}
      </div>
    </div>
  )
}

export default About
