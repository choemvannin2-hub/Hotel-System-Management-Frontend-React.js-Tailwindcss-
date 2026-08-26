import React, { useState } from 'react'
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom'
import { Home, Sparkles, BedSingle, Headset, UserPlus, LogIn, LogOut, Flag } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'

const NavBar = () => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const {user, isLoading, logout} = useAuth();
  const email = user?.email || '';
  const emailInitial = email.charAt(0).toUpperCase() || 'U';

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


  const navigate = useNavigate();
  const location = useLocation();

  const handleToRegister = () => {
    navigate('/register', {
      state: {
        from: location
      }
    })
  }
  
  const handleToLogin = () => {
    navigate('/login', {
      state: {
        from: location
      }
    })
  }

  if (isLoading){
    return;
  }

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
      {!user ? (
        /* Guest View: Sign Up / Login */
        <div className='flex items-center justify-end space-x-3'>
          <button 
            onClick={handleToRegister}
            className='flex gap-x-2 items-center font-medium border-2 rounded-xl border-blue-700 px-5 py-2 text-blue-700 hover:bg-blue-600 hover:text-white transition-colors duration-200' 
          >
            <UserPlus size={18} />
            Sign Up
          </button>
          <button 
            onClick={handleToLogin}
            className='flex gap-x-2 items-center bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-xl transition-colors duration-200' 
          >
            <LogIn size={18} />
            Login
          </button>
        </div>
      ) : (
        /* Authenticated View: Profile dropdown */
        <div className='relative flex items-center justify-end'>
          <button
            type='button'
            onClick={() => setIsProfileMenuOpen((isOpen) => !isOpen)}
            aria-label='Open profile menu'
            aria-expanded={isProfileMenuOpen}
            className='flex size-11 items-center justify-center rounded-full bg-linear-to-br from-blue-600 to-indigo-700 text-base font-bold text-white shadow-sm transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer'
          >
            {emailInitial}
          </button>

          {isProfileMenuOpen && (
            <div className='absolute right-0 top-14 z-50 w-64 rounded-xl border border-gray-100 bg-white p-3 shadow-xl'>
              <div className='flex min-w-0 items-center gap-x-3 border-b border-gray-100 pb-3'>
                <div className='flex size-11 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-blue-600 to-indigo-700 text-base font-bold text-white'>
                  {emailInitial}
                </div>
                <div className='min-w-0'>
                  <p className='text-xs font-medium text-gray-500'>Signed in as</p>
                  <p className='truncate text-sm font-semibold text-gray-800' title={email}>{email}</p>
                </div>
              </div>
              <button
                type='button'
                onClick={logout}
                className='mt-3 flex w-full items-center justify-center gap-x-2 rounded-lg border border-rose-700 px-4 py-2.5 font-medium text-rose-700 transition-colors hover:bg-rose-600 hover:text-white cursor-pointer'
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          )}
        </div>
      )}

    </main>
  )
}

export default NavBar
