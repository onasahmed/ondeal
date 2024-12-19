import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../provider/AuthProvider'
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
import { Helmet } from 'react-helmet-async'
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
          title: 'Welcome to Ondeal',
          text: `Happy Shopping`,
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
      className='flex items-center justify-center min-h-screen bg-[#FCD367] w-[1400px] mx-auto'
    >
      {/* Overlay Spinner */}
      {spinner && (
        <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 z-10'>
          <CgSpinner className='animate-spin h-16 w-16' />
        </div>
      )}
      <Helmet>
        <title>Ondeal | Login</title>
      </Helmet>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='p-8 rounded-lg shadow-lg w-1/3 bg-[#28231D]
        '
      >
        <h2
          className='text-center text-2xl font-bold mb-6 text-white'
    
        >
          Log In
        </h2>
        {/* Email Field */}
        <div className='mb-4'>
          <label
            htmlFor='email'
            className='block text-sm font-medium mb-1  text-[#FCD367]'
          >
            Email
          </label>
          <input
            id='email'
            type='email'
            className='w-full px-4 py-2 mt-1 rounded-lg bg-[#F9FAFB] text-black'
            {...register('email', { required: 'Email is required' })}
          />
          {errors.email && (
            <span className='text-[#FCD367] text-sm'>{errors.email.message}</span>
          )}
        </div>

        {/* Password Field */}
        <div className='mb-6 relative'>
          <label
            htmlFor='password'
            className='block text-sm font-medium mb-1 text-[#FCD367]'
      
          >
            Password
          </label>
          <input
            id='password'
            type={showPassword ? 'text' : 'password'}
            className='w-full px-4 py-2 mt-1 rounded-lg bg-[#F9FAFB] text-black'
           
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
            <span className='text-[#FCD367] text-sm'>
              {errors.password.message}
            </span>
          )}
        </div>

        {/* Forgot Password */}
        <div className='text-right mb-4'>
          <Link
            to='/forgot-password'
            className='text-sm font-medium text-[#FCD367] hover:underline'
          >
            Forgot Password?
          </Link>
        </div>

        {/* Submit Button */}
        <button
          type='submit'
          className='w-full py-2 rounded-lg font-semibold bg-[#FCD367] hover:bg-white text-black'
        >
          Submit
        </button>
        {errorMessage ? (
          <p className='text-[#FCD367] mt-2'>{errorMessage}</p>
        ) : (
          ''
        )}
        {/* Already Have an Account */}
        <p className='mt-4 text-center text-white text-sm'>
          Don't have an account?{' '}
          <Link to='/signup' className='font-medium text-[#FCD367] hover:underline'>
            Register Now
          </Link>
        </p>

        {/* Social Login */}
        <div className='mt-6 flex justify-center gap-4'>
          <button
            type='button'
            className='p-2 rounded-full bg-[#FCD367] shadow-lg hover:bg-gray-100'
          >
            <FaGoogle className='text-black' />
          </button>
          <button
            type='button'
            className='p-2 rounded-full bg-[#FCD367] shadow-lg hover:bg-gray-100'
          >
            <FaFacebook className='text-black' />
          </button>
          <button
            type='button'
            className='p-2 rounded-full bg-[#FCD367] shadow-lg hover:bg-gray-100'
          >
            <FaTwitter className='text-black' />
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login
