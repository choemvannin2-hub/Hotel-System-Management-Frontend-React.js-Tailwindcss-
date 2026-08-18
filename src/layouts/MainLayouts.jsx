import React from 'react'
import NavBar from '../components/user/layouts/NavBar'
import MobileNavBar from '../components/user/layouts/MobileNavBar'
import Footer from '../components/user/layouts/Footer'
import { Outlet } from 'react-router-dom'

const MainLayouts = () => {
  return (
    <div>

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