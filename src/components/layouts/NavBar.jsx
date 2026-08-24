import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Home, Sparkles, BedSingle, Headset, UserPlus, LogIn, LogOut, Flag } from 'lucide-react'
import {useAuth} from '../../contexts/AuthContext'

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
      label: "About",
      path: "/about",
      icon: Flag
    },
    {
      label: "Contact",
      path: "/contact",
      icon: Headset
    }
  ]

  const {isAuthenticated, logout} = useAuth();

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
                `flex items-center gap-2 shrink-0 border-b-2 pb-1 transition-colors duration-200 ${
                  isActive
                    ? 'text-blue-600 border-blue-600'
                    : 'text-gray-600 border-transparent hover:text-blue-600'
                }`
              }
            >
              <IconComponent size={20} />
              {link.label}
            </NavLink>
          )
        })}
      </nav>

      {/* AUTHENTICATION ACTION BUTTONS */}
      {!isAuthenticated ? (
        /* Guest View: Sign Up / Login */
        <div className='flex items-center justify-end space-x-3'>
          <Link 
            className='flex gap-x-2 items-center font-medium border-2 rounded-xl border-blue-700 px-5 py-2 text-blue-700 hover:bg-blue-600 hover:text-white transition-colors duration-200' 
            to="/register"
          >
            <UserPlus size={18} />
            Sign Up
          </Link>
          <Link 
            className='flex gap-x-2 items-center bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-xl transition-colors duration-200' 
            to="/login"
          >
            <LogIn size={18} />
            Login
          </Link>
        </div>
      ) : (
        /* Authenticated View: Logout */
        <div className='flex items-center justify-end space-x-3'>
          <button 
            onClick={logout}
            className='flex gap-x-2 items-center font-medium border-2 rounded-xl border-rose-700 px-5 py-2 text-rose-700 hover:bg-rose-600 hover:text-white transition-colors duration-200 cursor-pointer'
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      )}

    </main>
  )
}

export default NavBar