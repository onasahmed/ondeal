import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../provider/AuthProvider'
import { updateProfile } from 'firebase/auth'
import {
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaFacebook,
  FaTwitter
} from 'react-icons/fa'
import Swal from 'sweetalert2'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { CgSpinner } from 'react-icons/cg'
const Login = () => {
  const { handleLogIn, setLoading, logOut } = useContext(AuthContext)
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [spinner, setSpinner] = useState(false)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm()
  const navigate = useNavigate()
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }
  const onSubmit = async data => {
    setSpinner(true)
    setErrorMessage(' ')
    setLoading(true)
    const { email, password } = data
    await handleLogIn(email, password)
      .then(currentUser => {
        const { user } = currentUser
        
        Swal.fire({
          title: 'Welcome to InkFlow',
          text: `Happy Learning`,
          icon: 'info',
          width: '350px',
          customClass: {
            popup: 'rounded-lg p-4',
            title: 'text-lg font-semibold',
            content: 'text-sm'
          }
         
        })
        navigate('/profile')
        console.log('logged in User', user)
      })
      .catch(error => {
        console.log(error)
        if (error.code === 'auth/user-not-found') {
          setErrorMessage(
            'No account found with this email. Please register or check your email.'
          )
        } else if (error.code === 'auth/invalid-email') {
          setErrorMessage('Please enter a valid email address.')
        } else if (error.code === 'auth/invalid-credential') {
          setErrorMessage('Email/Password is wrong. Please try again.')
        } else {
          setErrorMessage('An unexpected error occurred. Please try again.')
        }

        setSpinner(false)
      })

    reset()
    setSpinner(false)
  }
  return (
    <div
      className='flex items-center justify-center min-h-screen bg-[#DAF1DE]'
    >
      {/* Overlay Spinner */}
      {spinner && (
        <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 z-10'>
          <CgSpinner className='animate-spin h-16 w-16' />
        </div>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='p-8 rounded-lg shadow-lg w-1/3 bg-[#C8CFAE] border border-[#3D6A53]
        '
      >
        <h2
          className='text-center text-2xl font-bold mb-6 text-[#3D6A53]'
    
        >
          Log In
        </h2>
        {/* Email Field */}
        <div className='mb-4'>
          <label
            htmlFor='email'
            className='block text-sm font-medium mb-1'
            style={{ color: '#3D6A53' }}
          >
            Email
          </label>
          <input
            id='email'
            type='email'
            className='w-full px-4 py-2 mt-1 rounded-lg border border-[#567D5B] bg-[#F9FAFB] text-[#3D6A53]'
            {...register('email', { required: 'Email is required' })}
          />
          {errors.email && (
            <span className='text-red-500 text-sm'>{errors.email.message}</span>
          )}
        </div>

        {/* Password Field */}
        <div className='mb-6 relative'>
          <label
            htmlFor='password'
            className='block text-sm font-medium mb-1 text-[#3D6A53]'
      
          >
            Password
          </label>
          <input
            id='password'
            type={showPassword ? 'text' : 'password'}
            className='w-full px-4 py-2 mt-1 rounded-lg border border-[#567D5B] bg-[#F9FAFB] text-[#3D6A53]'
           
            {...register('password', { required: 'Password is required' })}
          />
          <button
            type='button'
            onClick={togglePasswordVisibility}
            className='absolute right-3 top-10 text-gray-600'
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
          {errors.password && (
            <span className='text-red-500 text-sm'>
              {errors.password.message}
            </span>
          )}
        </div>

        {/* Forgot Password */}
        <div className='text-right mb-4'>
          <Link
            to='/forgot-password'
            className='text-sm font-medium text-blue-600 hover:underline'
          >
            Forgot Password?
          </Link>
        </div>

        {/* Submit Button */}
        <button
          type='submit'
          className='w-full py-2 rounded-lg font-semibold bg-[#3D6A53] text-[#F9FAFB]'
        >
          Submit
        </button>
        {errorMessage ? (
          <p className='text-red-700 mt-2'>{errorMessage}</p>
        ) : (
          ''
        )}
        {/* Already Have an Account */}
        <p className='mt-4 text-center text-sm'>
          Don't have an account?{' '}
          <Link to='/signup' className='font-medium text-blue-600 hover:underline'>
            Register Now
          </Link>
        </p>

        {/* Social Login */}
        <div className='mt-6 flex justify-center gap-4'>
          <button
            type='button'
            className='p-2 rounded-full bg-white shadow-lg hover:bg-gray-100'
          >
            <FaGoogle className='text-red-500' />
          </button>
          <button
            type='button'
            className='p-2 rounded-full bg-white shadow-lg hover:bg-gray-100'
          >
            <FaFacebook className='text-blue-600' />
          </button>
          <button
            type='button'
            className='p-2 rounded-full bg-white shadow-lg hover:bg-gray-100'
          >
            <FaTwitter className='text-blue-400' />
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login
