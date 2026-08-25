import { BedSingle, Flag, Headset, Home, LogIn, LogOut, Menu, Sparkles, UserPlus, X } from 'lucide-react'
import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

const MobileNavBar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { user, isLoading, logout } = useAuth()
  const email = user?.email || ''
  const emailInitial = email.charAt(0).toUpperCase() || 'U'

  const NavLinks = [
    { label: "Home", path: "/", icon: Home },
    { label: "Properties", path: "/properties", icon: BedSingle },
    { label: "About", path: "/about", icon: Flag },
    { label: "Contact", path: "/contact", icon: Headset }
  ]

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <header className="relative w-full md:hidden">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between bg-blue-700 px-4 py-3 shadow-md z-40 relative">
        {/* Toggle Button */}
        <button 
          onClick={toggleMenu} 
          aria-label={isOpen ? "Close menu" : "Open menu"}
          className="p-1 text-white hover:opacity-80 transition-opacity"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-x-2 text-white">
          <Sparkles size={28} />
          <span className="font-semibold text-lg tracking-wide">Booking</span>
        </Link>

        {/* User Profile */}
        {user ? (
          <div
            aria-label={`${email}'s profile`}
            className="flex size-8 items-center justify-center rounded-full bg-white text-sm font-bold text-blue-700 shadow-sm"
          >
            {emailInitial}
          </div>
        ) : (
          <Link to="/login" aria-label="Login" className="text-white hover:opacity-80 transition-opacity">
            <LogIn size={26} />
          </Link>
        )}
      </div>

      {/* Background Overlay */}
      {isOpen && (
        <div 
          onClick={toggleMenu}
          className="fixed inset-0 bg-black/60 z-40 transition-opacity"
        />
      )}

      {/* Slide-out Navigation Drawer */}
      <aside 
        className={`fixed top-0 left-0 h-full w-64 bg-white z-50 shadow-xl flex flex-col transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-4 py-3.5 bg-blue-700 text-white shrink-0">
          <div className="flex items-center gap-x-2">
            <Sparkles size={24} />
            <span className="font-semibold text-lg">Menu</span>
          </div>
          <button onClick={toggleMenu} aria-label="Close menu" className="p-1 hover:opacity-80">
            <X size={24} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 flex-1 overflow-y-auto">
          <ul className="space-y-2">
            {NavLinks.map((link) => {
              const Icon = link.icon
              return (
                <li key={link.label}>
                  <NavLink
                    to={link.path}
                    end={link.path === '/'}
                    onClick={toggleMenu}
                    className={({isActive})=>
                    `flex items-center gap-x-3 p-3 rounded-lg hover:bg-blue-50 transition-colors font-medium ${
                      isActive 
                        ? 'bg-blue-50 text-blue-700' 
                        : 'text-gray-700 hover:text-blue-700'
                    }`
                    }
                  >
                    <Icon size={20} />
                    <span>{link.label}</span>
                  </NavLink>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Authentication */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 shrink-0">
          {user ? (
            <div className="flex flex-col gap-3">
              <div className="flex min-w-0 items-center gap-x-3 rounded-xl bg-white p-3 shadow-sm">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-blue-600 to-indigo-700 text-base font-bold text-white">
                  {emailInitial}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-gray-500">Signed in as</p>
                  <p className="truncate text-sm font-semibold text-gray-800" title={email}>{email}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  logout()
                  setIsOpen(false)
                }}
                className="flex items-center justify-center gap-x-2 w-full py-2.5 px-4 bg-white hover:bg-rose-600 text-rose-700 hover:text-white border border-rose-700 font-medium rounded-lg transition-colors cursor-pointer"
              >
                <LogOut size={18} />
                <span>Log Out</span>
              </button>
            </div>
          ) : !isLoading && (
            <div className="flex flex-col gap-2">
              <Link
                to="/register"
                onClick={toggleMenu}
                className="flex items-center justify-center gap-x-2 w-full py-2.5 px-4 bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg shadow-sm transition-colors text-center"
              >
                <UserPlus size={18} />
                <span>Sign Up</span>
              </Link>
              <Link
                to="/login"
                onClick={toggleMenu}
                className="flex items-center justify-center gap-x-2 w-full py-2 px-4 bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 font-medium rounded-lg transition-colors text-center"
              >
                <LogIn size={18} />
                <span>Log In</span>
              </Link>
            </div>
          )}
        </div>
      </aside>
    </header>
  )
}

export default MobileNavBar
