import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../shared/Navbar'
import { Helmet } from 'react-helmet-async'

const Main = () => {
  const location = useLocation()
    const header = location.pathname.includes('login') || location.pathname.includes('signup')
  return (
    <div>
      <Helmet>
        <title>InkFlow | Home</title>
        <link rel='canonical' href='./../../../assets/logo.png' />
      </Helmet>
      {!header && <Navbar></Navbar>}
      <Outlet></Outlet>
    </div>
  )
}

export default Main
