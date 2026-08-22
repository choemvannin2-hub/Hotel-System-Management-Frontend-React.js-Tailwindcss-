import { Link } from 'react-router-dom'
import { BedSingle, DotIcon, Flag, Headset, Home, Mail, MapPin, Phone, Sparkles } from 'lucide-react'

const Footer = () => {

  const NavLinks = [
    { label: "Home", path: "/", icon: Home },
    { label: "Properties", path: "/properties", icon: BedSingle },
    { label: "About", path: "/about", icon: Flag },
    { label: "Contact", path: "/contact", icon: Headset }
  ]

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand Section */}
        <div className="space-y-4">
          <Link to="/" className="flex items-center gap-x-2 text-white">
            <Sparkles className="text-blue-500" size={30} />
            <span className="font-semibold text-xl tracking-wide">Booking</span>
          </Link>
          <p className="text-sm text-gray-400 leading-relaxed">
            Discover and book the best properties around the world with ease and confidence.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {NavLinks.map((link) => {
              const Icon = link.icon
              return (
                <li key={link.label}>
                  <Link 
                    to={link.path} 
                    className="flex items-center gap-x-2 hover:text-blue-400 transition-colors"
                  >
                    <Icon size={16} />
                    <span>{link.label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Contact</h3>
          <ul className="space-y-3 text-sm text-gray-400">
            <li className="flex items-center gap-x-3">
              <MapPin size={18} className="text-blue-500" />
              <span>Kamboul Phnom Penh, Cambodia</span>
            </li>
            <li className="flex items-center gap-x-3">
              <Phone size={18} className="text-blue-500" />
              <span>+855 71-980-8178</span>
            </li>
            <li className="flex items-center gap-x-3">
              <Mail size={18} className="text-blue-500" />
              <span>choemvannin2@gmail.com</span>
            </li>
          </ul>
        </div>

        {/* Newsletter Signup */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Stay Updated</h3>
          <p className="text-sm text-gray-400 mb-3">
            Send message or contact directly by Telegram.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-2">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="px-3 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500 text-sm"
              required
            />
            <button 
              type="submit" 
              className="py-2 px-4 bg-blue-700 hover:bg-blue-800 text-white text-sm font-medium rounded-lg transition-colors"
            >
              Send
            </button>
          </form>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-4 px-4 text-center text-xs text-gray-500">
        <p className='flex justify-center items-center'>© 2026 Choem Vannin <DotIcon size={18} /> All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer