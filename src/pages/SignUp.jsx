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
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
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
      const response = await fetch('http://localhost:5000/allusers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      })
      const responseData = await response.json()
      console.log(responseData)
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
<<<<<<< HEAD
    <div className='flex items-center justify-center min-h-screen w-[1400px] mx-auto bg-[#FCD367]'>
=======
    <div
      className='flex items-center justify-center min-h-screen  bg-[#DAF1DE]'
    >
>>>>>>> origin/main
      {' '}
      {/* Overlay Spinner */}
      {spinner && (
        <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 z-10'>
          <CgSpinner className='animate-spin h-16 w-16' />
        </div>
      )}
      <Helmet>
        <title>Ondeal | Sign Up</title>
      </Helmet>
      <form
        onSubmit={handleSubmit(onSubmit)}
<<<<<<< HEAD
        className='p-8 rounded-lg shadow-lg w-1/3 bg-[#28231D] border border-[#FCD367]'
      >
        <h2 className='text-center text-2xl font-bold mb-6  text-white'>
=======
        className='p-8 rounded-lg shadow-lg w-1/3 bg-[#C8CFAE] border border-[#3D6A53]'
      
      >
        <h2
          className='text-center text-2xl font-bold mb-6  text-[#3D6A53]'
      
        >
>>>>>>> origin/main
          Sign Up
        </h2>

        {/* Name Field */}
        <div className='mb-4'>
          <label
            htmlFor='name'
<<<<<<< HEAD
            className='block text-sm font-medium mb-1  text-[#FCD367]'
=======
            className='block text-sm font-medium mb-1  text-[#3D6A53]'
      
>>>>>>> origin/main
          >
            Name
          </label>
          <input
            id='name'
            type='text'
<<<<<<< HEAD
            className='w-full px-4 py-2 mt-1 rounded-lg  bg-[#F9FAFB] text-black'
=======
            className='w-full px-4 py-2 mt-1 rounded-lg  border border-[#567D5B] bg-[#F9FAFB] text-[#3D6A53]'
          
>>>>>>> origin/main
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && (
            <span className='text-[#FCD367] text-sm'>
              {errors.name.message}
            </span>
          )}
        </div>

        {/* Email Field */}
        <div className='mb-4'>
          <label
            htmlFor='email'
<<<<<<< HEAD
            className='block text-sm font-medium mb-1  text-[#FCD367]'
=======
            className='block text-sm font-medium mb-1 text-[#3D6A53]'
          
>>>>>>> origin/main
          >
            Email
          </label>
          <input
            id='email'
            type='email'
<<<<<<< HEAD
            className='w-full px-4 py-2 mt-1 rounded-lg bg-[#F9FAFB] text-black'
=======
            className='w-full px-4 py-2 mt-1 rounded-lg  border border-[#567D5B] bg-[#F9FAFB] text-[#3D6A53]'
          
>>>>>>> origin/main
            {...register('email', { required: 'Email is required' })}
          />
          {errors.email && (
            <span className='text-[#FCD367] text-sm'>
              {errors.email.message}
            </span>
          )}
        </div>

        {/* Password Field */}
        <div className='mb-6 relative'>
          <label
            htmlFor='password'
<<<<<<< HEAD
            className='block text-sm font-medium mb-1  text-[#FCD367]'
=======
            className='block text-sm font-medium mb-1 text-[#3D6A53]'
    
>>>>>>> origin/main
          >
            Password
          </label>
          <input
            id='password'
            type={showPassword ? 'text' : 'password'}
<<<<<<< HEAD
            className='w-full px-4 py-2 mt-1 rounded-lg bg-[#F9FAFB] text-black'
=======
            className='w-full px-4 py-2 mt-1 rounded-lg  border border-[#567D5B] bg-[#F9FAFB] text-[#3D6A53]'
    
>>>>>>> origin/main
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
            <span className='text-[#FCD367] text-sm'>
              {errors.password.message}
            </span>
          )}
        </div>

        {/* Submit Button */}
        <button
          type='submit'
<<<<<<< HEAD
          className='w-full py-2 rounded-lg font-semibold bg-[#FCD367] text-black hover:bg-white'
=======
          className='w-full py-2 rounded-lg font-semibold bg-[#3D6A53]  text-[#F9FAFB]'
      
>>>>>>> origin/main
        >
          Submit
        </button>
        {errorMessage ? (
          <p className='text-[#FCD367] mt-2'>{errorMessage}</p>
        ) : (
          ''
        )}

        {/* Already Have an Account */}
        <p className='mt-4 text-white text-center text-sm'>
          Already have an account?{' '}
          <Link
            to='/login'
            className='font-medium text-[#FCD367] hover:underline'
          >
            Login Now
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

export default SignUp
