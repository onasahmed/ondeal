import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../provider/AuthProvider'
import Swal from 'sweetalert2'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
const ResetPassword = () => {
  const { handleForgetPass, setLoading, logOut } = useContext(AuthContext)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm()
  const navigate = useNavigate()
  const onSubmit = async data => {
    reset()
    setLoading(true)
    const { email } = data
    console.log(email)
    await handleForgetPass(email)
      .then(() => {
        Swal.fire({
          title: 'Password Reset Link Sent!',
          text: `A reset link has been sent to ${email}. Please check your inbox.`,
          icon: 'success',
          width: '350px',
          customClass: {
            popup: 'rounded-lg p-4',
            title: 'text-lg font-semibold',
            content: 'text-sm'
          },
          confirmButtonText: 'OK',
          buttonsStyling: true,
          confirmButtonColor: '#567D5B'
        }).then(() => {
          navigate('/login') // Redirects to the login page
        })
      })
      .catch(error => {
        console.error('Password Reset Error:', error)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message
        })
      })
    setLoading(false)
  }
  return (
    <div className='flex items-center justify-center min-h-screen bg-[#FCD367] w-[1400px] mx-auto'>
      <Helmet>
        <title>Ondeal | Password Reset</title>
      </Helmet>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='p-8 rounded-lg shadow-lg w-1/3 bg-[#28231D]'
        style={{
          border: `1px solid #3D6A53`
        }}
      >
        <h2 className='text-center text-2xl font-bold mb-6 text-white'>
          Reset Password
        </h2>

        {/* Instruction */}
        <p className='text-center text-sm mb-4 text-[#FCD367]'>
          Password reset link will be sent in this email.
        </p>

        {/* Email Field */}
        <div className='mb-4'>
          <label
            htmlFor='email'
            className='block text-sm font-medium mb-1 text-[#FCD367]'
          >
            Email Address
          </label>
          <input
            id='email'
            type='email'
            placeholder='Enter your email'
            className='w-full px-4 py-2 mt-1 rounded-lg bg-white text-black'
            {...register('email', { required: 'Email is required' })}
          />
          {errors.email && (
            <span className='text-[#FCD367] text-sm'>
              {errors.email.message}
            </span>
          )}
        </div>

        {/* Submit Button */}
        <button
          type='submit'
          className='w-full py-2 rounded-lg font-semibold bg-[#FCD367] text-black hover:bg-white'
        >
          Send Reset Link
        </button>

        {/* Additional Help */}
        <p className='mt-4 text-center text-sm text-white'>
          Remembered your password?{' '}
          <Link
            to='/login'
            className='font-medium text-[#FCD367] hover:underline'
          >
            Login here
          </Link>
        </p>
      </form>
    </div>
  )
}

export default ResetPassword
