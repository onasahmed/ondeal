import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../provider/AuthProvider'
import { updateProfile } from 'firebase/auth'
import { CgSpinner } from 'react-icons/cg'
import {
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaFacebook,
  FaTwitter
} from 'react-icons/fa'
import Swal from 'sweetalert2'
import { Link, Navigate, useNavigate } from 'react-router-dom'
const SignUp = () => {
  const { handleSignUp, setLoading, logOut } = useContext(AuthContext)
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [spinner, setSpinner] = useState(false)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }
  const onSubmit = async data => {
    setSpinner(true)
    setErrorMessage(' ')
    setLoading(true)
    const { name, email, password } = data
    console.log(name, email, password)
    try {
      const result = await handleSignUp(email, password)
      await updateProfile(result.user, {
        displayName: name
      })
      const response = await fetch('http://localhost:5001/allusers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      })
      const responseData = await response.json()
      console.log(responseData);
      if (!response.ok) {
        setErrorMessage('An unexpected error occurred. Please try again.')
      }

      Swal.fire({
        title: 'Done!',
        text: `Account Created Successfully`,
        icon: 'success',
        width: '350px',
        customClass: {
          popup: 'rounded-lg p-4',
          title: 'text-lg font-semibold',
          content: 'text-sm'
        }
      })
      reset()
      navigate('/login')
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setErrorMessage('This email already has an account')
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.')
      }
    } finally {
      setSpinner(false)
      setLoading(false)
    }
  }
  return (
    <div
      className='flex items-center justify-center min-h-screen'
      style={{ backgroundColor: '#DAF1DE' }}
    >
      {' '}
      {/* Overlay Spinner */}
      {spinner && (
        <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 z-10'>
          <CgSpinner className='animate-spin h-16 w-16' />
        </div>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='p-8 rounded-lg shadow-lg w-1/3'
        style={{
          backgroundColor: '#C8CFAE',
          border: `1px solid #3D6A53`
        }}
      >
        <h2
          className='text-center text-2xl font-bold mb-6'
          style={{ color: '#3D6A53' }}
        >
          Sign Up
        </h2>

        {/* Name Field */}
        <div className='mb-4'>
          <label
            htmlFor='name'
            className='block text-sm font-medium mb-1'
            style={{ color: '#3D6A53' }}
          >
            Name
          </label>
          <input
            id='name'
            type='text'
            className='w-full px-4 py-2 mt-1 rounded-lg'
            style={{
              border: `1px solid #567D5B`,
              backgroundColor: '#F9FAFB',
              color: '#3D6A53'
            }}
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && (
            <span className='text-red-500 text-sm'>{errors.name.message}</span>
          )}
        </div>

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
            className='w-full px-4 py-2 mt-1 rounded-lg'
            style={{
              border: `1px solid #567D5B`,
              backgroundColor: '#F9FAFB',
              color: '#3D6A53'
            }}
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
            className='block text-sm font-medium mb-1'
            style={{ color: '#3D6A53' }}
          >
            Password
          </label>
          <input
            id='password'
            type={showPassword ? 'text' : 'password'}
            className='w-full px-4 py-2 mt-1 rounded-lg'
            style={{
              border: `1px solid #567D5B`,
              backgroundColor: '#F9FAFB',
              color: '#3D6A53'
            }}
            {...register('password', {
              required: 'Password is required',
              pattern: {
                value: /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,}$/,
                message:
                  'Password must include at least one number, one special character, and be 6+ characters long'
              }
            })}
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

        {/* Submit Button */}
        <button
          type='submit'
          className='w-full py-2 rounded-lg font-semibold'
          style={{
            backgroundColor: '#3D6A53',
            color: '#F9FAFB'
          }}
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
          Already have an account?{' '}
          <Link
            to='/login'
            className='font-medium text-blue-600 hover:underline'
          >
            Login Now
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

export default SignUp