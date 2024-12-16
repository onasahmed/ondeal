import React from 'react'
import { useForm } from 'react-hook-form'

const Profile = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm()
  const onSubmit = data => {
    const {email, password} = data
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <input className='bg-white text-black border border-black'  {...register('email')} />

      {/* include validation with required or other standard HTML validation rules */}
      <input className='bg-white text-black border border-black' {...register('password', { required: true })} />
      {/* errors will return when field validation fails  */}
      {errors.exampleRequired && <span>This field is required</span>}

      <input type='submit' />
    </form>
  )
}

export default Profile
