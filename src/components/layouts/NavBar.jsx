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
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-xs">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">

        {/* LOGO */}
        <Link 
          to="/" 
          className="flex items-center gap-2.5 shrink-0 group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-lg p-1"
        >
          <div className="flex items-center justify-center size-11 rounded-xl bg-linear-to-tr from-blue-700 via-blue-600 to-indigo-500 text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
            <Sparkles size={24} className="animate-pulse" />
          </div>
          <span className="text-xl font-bold tracking-tight bg-linear-to-r from-slate-900 via-blue-950 to-blue-700 bg-clip-text text-transparent">
            StayFinder
          </span>
        </Link>

        {/* NAVBAR */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2 bg-slate-50/80 p-1.5 rounded-full border border-slate-200/60 shadow-inner">
          {NavLinks.map((link) => {
            const IconComponent = link.icon
            return (
              <NavLink
                key={link.label}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-slate-600 hover:text-blue-600 hover:bg-slate-100/70'
                  }`
                }
              >
                <IconComponent size={17} />
                {link.label}
              </NavLink>
            )
          })}
        </nav>

        {/* AUTHENTICATION ACTION BUTTONS */}
        {!user ? (
          /* Guest View: Sign Up / Login */
          <div className="flex items-center gap-3">
            <button 
              onClick={handleToRegister}
              className="hidden sm:flex gap-x-2 items-center text-sm font-semibold border border-slate-200 hover:border-blue-600 text-slate-700 hover:text-blue-600 px-4.5 py-2.5 rounded-xl hover:bg-blue-50/50 active:scale-[0.98] transition-all duration-200 cursor-pointer" 
            >
              <UserPlus size={18} />
              Sign Up
            </button>
            <button 
              onClick={handleToLogin}
              className="flex gap-x-2 items-center text-sm font-semibold bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-5 py-2.5 rounded-xl shadow-md shadow-blue-500/20 active:scale-[0.98] transition-all duration-200 cursor-pointer" 
            >
              <LogIn size={18} />
              Login
            </button>
          </div>
        ) : (
          /* Authenticated View: Profile dropdown */
          <div className="relative flex items-center justify-end">
            <button
              type="button"
              onClick={() => setIsProfileMenuOpen((isOpen) => !isOpen)}
              aria-label="Open profile menu"
              aria-expanded={isProfileMenuOpen}
              className="flex size-10 items-center justify-center rounded-full bg-linear-to-br from-blue-600 to-indigo-600 text-sm font-bold text-white shadow-md shadow-blue-500/20 hover:ring-4 hover:ring-blue-100 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-200 cursor-pointer"
            >
              {emailInitial}
            </button>

            {isProfileMenuOpen && (
              <div className="absolute right-0 top-14 z-50 w-72 rounded-2xl border border-slate-100 bg-white/95 backdrop-blur-xl p-4 shadow-2xl ring-1 ring-slate-900/5 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex min-w-0 items-center gap-x-3.5 border-b border-slate-100 pb-3.5">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-blue-600 to-indigo-600 text-base font-bold text-white shadow-sm">
                    {emailInitial}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Signed in as</p>
                    <p className="truncate text-sm font-bold text-slate-800 mt-0.5" title={email}>{email}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={logout}
                  className="mt-3 flex w-full items-center justify-center gap-x-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 font-semibold text-sm px-4 py-2.5 transition-colors duration-150 cursor-pointer"
                >
                  <LogOut size={17} />
                  Logout
                </button>
              </div>
            )}
          </div>
        )}

      </main>
    </header>
  )
}

export default NavBar