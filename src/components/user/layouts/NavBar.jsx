import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Home, Sparkles, BedSingle, Headset, UserPlus, LogIn, LogOut, ChartNoAxesCombined } from 'lucide-react'

const NavBar = () => {
  const NavLinks = [
    {
      label: "Home",
      path: "/",
      icon: Home
    },
    {
      label: "Properties",
      path: "/properties",
      icon: BedSingle
    },
    {
      label: "Popular",
      path: "/popular",
      icon: ChartNoAxesCombined
    },
    {
      label: "Contact",
      path: "/contact",
      icon: Headset
    }
  ]

  return (
    <main className='hidden md:grid md:grid-cols-[10%_55%_35%] lg:grid-cols-[15%_35%_50%] shadow-glow-gray px-12 xl:px-34 py-4 z-50'>

      {/* LOGO */}
      <Link to="/" className=''>
        <Sparkles color="#241ba7" size={67} />
      </Link>

      {/* NAVBAR */}
      <nav className='flex justify-between items-center text-gray-900 font-bold'>
        {NavLinks.map((link) => {
          const IconComponent = link.icon
          return (
            <NavLink
              key={link.label}
              to={link.path}
              end={link.path === '/'}
              className={({ isActive }) =>
                `flex items-center gap-2 shrink-0 transition-colors duration-200 ${
                  isActive
                    ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
                    : 'text-gray-600 hover:text-blue-600'
                }`
              }
            >
              <IconComponent size={20} />
              {link.label}
            </NavLink>
          )
        })}
      </nav>

      {/* AUTHENTICATION */}
      <div className='flex items-center justify-end space-x-3 '>
        {/* Sign Up */}
        <Link className='flex gap-x-2 items-center font-medium border-2 rounded-xl border-blue-700 px-5 py-2 text-blue-700 hover:bg-blue-600 hover:text-white transition-colors duration-200' to="/register">
          <UserPlus size={18} />
          Sign Up
        </Link>
        {/* Login */}
        <Link className='flex gap-x-2 items-center bg-blue-600 hover:bg-blue-700 text-white font-medium px-6.5 py-2.5 rounded-xl transition-colors duration-200' to="/login">
          <LogIn size={18} />
          Login
        </Link>
      </div>

      {/* Logout */}
      <div className='hidden items-center justify-end space-x-3'>
        <Link className='flex gap-x-2 items-center font-medium border-2 rounded-xl border-rose-700 px-5 py-2 text-rose-700 hover:bg-rose-600 hover:text-white transition-colors duration-200' to="/register">
          <LogOut size={18} />
          Sign Up
        </Link>
      </div>
    </main>
  )
}

export default NavBar