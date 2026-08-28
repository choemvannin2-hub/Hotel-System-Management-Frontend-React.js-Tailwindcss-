import React from 'react'
import NavBar from '../components/layouts/NavBar'
import MobileNavBar from '../components/layouts/MobileNavBar'
import Footer from '../components/layouts/Footer'
import { Outlet } from 'react-router-dom'
import ScrollToTop from '../utils/scrollToTop'

const MainLayouts = () => {
  return (
    <div>
      {/* Apply scoll to the top when changing the pages */}
      <ScrollToTop/>

      {/* Navigation bar */}
      <NavBar/>
      <MobileNavBar/>
      
      {/* Main content */}
      <main>
        <Outlet/>
      </main>

      {/* Footer */}
      <Footer/>

    </div>
  )
}

export default MainLayouts