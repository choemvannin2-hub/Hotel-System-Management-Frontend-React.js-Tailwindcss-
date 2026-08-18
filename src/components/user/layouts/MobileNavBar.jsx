import { BedSingle, BookText, CircleUserRound, Headset, Home, LogIn, Menu, Sparkles, UserPlus, X } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const MobileNavBar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const NavLinks = [
    { label: "Home", path: "/", icon: Home },
    { label: "Properties", path: "/properties", icon: BedSingle },
    { label: "Contact", path: "/contact", icon: Headset },
    { label: "About", path: "/about", icon: BookText },
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
        <button aria-label="User profile" className="text-white hover:opacity-80 transition-opacity">
          <CircleUserRound size={28} />
        </button>
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
                  <Link
                    to={link.path}
                    onClick={toggleMenu}
                    className="flex items-center gap-x-3 p-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors font-medium"
                  >
                    <Icon size={20} />
                    <span>{link.label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Authentication */}
        <div className="p-4 border-t border-gray-100 flex flex-col gap-2 bg-gray-50 shrink-0">
          {/* Sign up */}
          <Link
            to="/signup"
            onClick={toggleMenu}
            className="flex items-center justify-center gap-x-2 w-full py-2.5 px-4 bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg shadow-sm transition-colors text-center"
          >
            <UserPlus size={18} />
            <span>Sign Up</span>
          </Link>

          {/* Login */}
          <Link
            to="/login"
            onClick={toggleMenu}
            className="flex items-center justify-center gap-x-2 w-full py-2 px-4 bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 font-medium rounded-lg transition-colors text-center"
          >
            <LogIn size={18} />
            <span>Log In</span>
          </Link>

          {/* Logout */}
          <Link
            to="/logout"
            onClick={toggleMenu}
            className="hidden items-center justify-center gap-x-2 w-full py-2 px-4 bg-white hover:bg-gray-100 text-red-700 border border-red-700 font-medium rounded-lg transition-colors text-center"
          >
            <LogIn size={18} />
            <span>Log Out</span>
          </Link>
        </div>
      </aside>
    </header>
  )
}

export default MobileNavBar