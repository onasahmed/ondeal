import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AuthContext } from '../provider/AuthProvider'

const Navbar = () => {
  const { logOut, user } = useContext(AuthContext)
  const list = (
    <>
      <li>
        <NavLink
          to='/'
          className={({ isActive, isPending }) =>
            isPending ? 'pending' : isActive ? 'active' : ''
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to='/about'
          className={({ isActive, isPending }) =>
            isPending ? 'pending' : isActive ? 'active' : ''
          }
        >
          About
        </NavLink>
      </li>
      <li>
        <NavLink
          to='/profile'
          className={({ isActive, isPending }) =>
            isPending ? 'pending' : isActive ? 'active' : ''
          }
        >
          Profile
        </NavLink>
      </li>
    </>
  )
  return (
    <div className='navbar bg-[#FCD367] text-black fixed top-0 border-b-2 border-black z-50'>
     <div className='w-[1400px] mx-auto'>
     <div className='navbar-start'>
        <div className='dropdown'>
          <div tabIndex={0} role='button' className='btn btn-ghost lg:hidden'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h8m-8 6h16'
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className='menu menu-sm dropdown-content  rounded-box z-[1] mt-3 w-52 p-2 shadow'
          >
            {list}
          </ul>
        </div>
        <a className='btn btn-ghost text-black text-xl'>Ondeal</a>
      </div>
      <div className='navbar-center hidden lg:flex'>
        <ul className='menu menu-horizontal px-1'>{list}</ul>
      </div>
      <div className='navbar-end'>
        {user ? (
          <Link onClick={logOut} className='btn'>
            Log Out
          </Link>
        ) : (
          <Link to='/login'  className='btn'>
            Log In
          </Link>
        )}
      </div>
     </div>
    </div>
  )
}

export default Navbar
