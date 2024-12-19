import React from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import {
  FaTshirt,
  FaShoppingCart,
  FaTags,
  FaStar,
  FaFilter
} from 'react-icons/fa'
import Navbar from '../shared/Navbar'
import LeftSidebar from '../component/layout/LeftSidebar'
import RightSidebar from '../component/layout/RightSidebar'

const Main = () => {
  const location = useLocation()
  const header =
    location.pathname.includes('login') ||
    location.pathname.includes('signup') ||
    location.pathname.includes('forgot-password')

  return (
    <div>
      <Helmet>
        <title>Ondeal | Home</title>
      </Helmet>
      {!header && <Navbar />}

      <div className='relative mx-auto max-w-[1400px] min-h-screen flex pt-[60px]'>
        {/* Left Sidebar */}
        <div className='fixed top-[60px] left-1/2 -translate-x-[700px] min-h-screen w-[300px] bg-white border-r border-[#FFD893] shadow-md p-6 flex flex-col gap-6'>
          <h2 className='text-lg font-bold text-black border-b border-[#FFD893] pb-2'>
            Categories
          </h2>
          <LeftSidebar />
        </div>

        {/* Right Sidebar */}
        <div className='fixed top-[60px] left-1/2 translate-x-[400px] min-h-screen w-[300px] bg-white border-l border-[#FFD893] shadow-md p-6 flex flex-col gap-6'>
          <h2 className='text-lg font-bold text-black border-b border-[#FFD893] pb-2'>
            Filter
          </h2>
          <RightSidebar />
        </div>

        {/* Main Content (Outlet) */}
        <div className='flex-grow ml-[300px] mr-[300px] bg-white shadow-lg p-6 rounded-lg min-h-screen'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Main
