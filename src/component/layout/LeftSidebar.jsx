import React from 'react'
import { FaShoppingCart, FaStar, FaTags, FaTshirt } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'

const LeftSidebar = () => {
  return (
    <div>
      {/* Left Sidebar */}
      <div className=' bg-[#FCD367] text-black py-10 px-4'>
       
        <ul className='menu'>
          <li className='font-medium text-md font-cinzel'>
            <NavLink
              to='/category/clothing'
              className={({ isActive }) => (isActive ? 'nav-active' : '')}
            >
              <FaTshirt /> Clothing
            </NavLink>
          </li>
          <li className='font-medium text-md font-cinzel'>
            <NavLink
              to='/category/electronics'
              className={({ isActive }) => (isActive ? 'nav-active' : '')}
            >
              <FaShoppingCart /> Electronics
            </NavLink>
          </li>
          <li className='font-medium text-md font-cinzel'>
            <NavLink
              to='/category/home-appliances'
              className={({ isActive }) => (isActive ? 'nav-active' : '')}
            >
              <FaTags /> Home Appliances
            </NavLink>
          </li>
          <li className='font-medium text-md font-cinzel'>
            <NavLink
              to='/category/accessories'
              className={({ isActive }) => (isActive ? 'nav-active' : '')}
            >
              <FaStar /> Accessories
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default LeftSidebar
