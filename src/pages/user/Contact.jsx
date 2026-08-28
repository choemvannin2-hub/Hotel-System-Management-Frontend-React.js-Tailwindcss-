import React, { useState } from 'react'
import { Headset, Mail, MapPin, Phone, Send, Sparkles, MessageSquare } from 'lucide-react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission logic here
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header Section */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 text-blue-600 rounded-full mb-2">
            <Headset size={32} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            Get in Touch with Us
          </h1>
          <p className="text-gray-600 text-base leading-relaxed">
            Have questions about booking a property or need assistance? Reach out to our team—we are here to help you every step of the way.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Contact Information & Channels */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 space-y-6">
              <div className="flex items-center gap-x-2 text-gray-900 font-semibold text-lg">
                <Sparkles className="text-blue-500" size={24} />
                <span>Contact Details</span>
              </div>

              <ul className="space-y-6 text-sm">
                <li className="flex items-start gap-x-4">
                  <div className="p-2.5 bg-blue-50 rounded-lg text-blue-600 shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Location</h4>
                    <p className="text-gray-600 mt-0.5">Kamboul Phnom Penh, Cambodia</p>
                  </div>
                </li>

                <li className="flex items-start gap-x-4">
                  <div className="p-2.5 bg-blue-50 rounded-lg text-blue-600 shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Phone</h4>
                    <a 
                      href="tel:+855719808178" 
                      className="text-gray-600 hover:text-blue-600 transition-colors mt-0.5 block"
                    >
                      +855 71-980-8178
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-x-4">
                  <div className="p-2.5 bg-blue-50 rounded-lg text-blue-600 shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Email</h4>
                    <a 
                      href="mailto:choemvannin2@gmail.com" 
                      className="text-gray-600 hover:text-blue-600 transition-colors mt-0.5 block break-all"
                    >
                      choemvannin2@gmail.com
                    </a>
                  </div>
                </li>
              </ul>
            </div>

            {/* Telegram Direct Action Box */}
            <div className="bg-blue-600 text-white rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex items-center gap-x-3">
                <MessageSquare size={24} />
                <h3 className="font-semibold text-lg">Instant Support</h3>
              </div>
              <p className="text-blue-100 text-sm leading-relaxed">
                Prefer messaging directly? Connect with us on Telegram for quick inquiries and immediate support.
              </p>
              <a
                href="https://t.me/choemvannin" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full py-2.5 px-4 bg-white text-blue-600 hover:bg-blue-50 text-sm font-semibold rounded-lg transition-colors shadow-sm"
              >
                Chat on Telegram
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>

            {submitted && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
                Thank you! Your message has been sent successfully. We will get back to you soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Choem Vannin"
                    className="w-full px-4 py-2.5 bg-gray-50 text-gray-900 rounded-lg border border-gray-200 focus:bg-white focus:outline-none focus:border-blue-500 text-sm transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="you@example.com"
                    className="w-full px-4 py-2.5 bg-gray-50 text-gray-900 rounded-lg border border-gray-200 focus:bg-white focus:outline-none focus:border-blue-500 text-sm transition-all"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Property Booking Inquiry"
                  className="w-full px-4 py-2.5 bg-gray-50 text-gray-900 rounded-lg border border-gray-200 focus:bg-white focus:outline-none focus:border-blue-500 text-sm transition-all"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="How can we help you?"
                  className="w-full px-4 py-2.5 bg-gray-50 text-gray-900 rounded-lg border border-gray-200 focus:bg-white focus:outline-none focus:border-blue-500 text-sm transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-x-2 py-3 px-6 bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm w-full sm:w-auto"
              >
                <Send size={16} />
                <span>Send Message</span>
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Contact