'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'
import { ArrowRight, User, Mail, Truck, Building2, CheckCircle } from 'lucide-react'

export default function GetStarted() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'driver',
    vehicles: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    console.log('Form submitted:', formData)
    setIsSubmitted(true)
    setIsLoading(false)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F0F9FF] via-[#E0F2FE] to-[#DBEAFE] dark:from-[#0C1222] dark:via-[#1E293B] dark:to-[#334155]">
        <Navbar />
        
        <section className="pt-32 pb-24 px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-12 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
              </motion.div>
              
              <h2 className="text-3xl font-bold text-[#0F172A] dark:text-white mb-4">
                Account Created Successfully!
              </h2>
              
              <p className="text-[#475569] dark:text-gray-300 mb-8">
                Thank you, {formData.name}! We've received your request. Our team will contact you at {formData.email} within 24 hours to set up your account.
              </p>
              
              <a
                href="/"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
              >
                <span>Back to Home</span>
                <ArrowRight className="w-5 h-5" />
              </a>
            </motion.div>
          </div>
        </section>
        
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0F9FF] via-[#E0F2FE] to-[#DBEAFE] dark:from-[#0C1222] dark:via-[#1E293B] dark:to-[#334155]">
      <Navbar />
      
      <section className="pt-32 pb-24 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-[#0F172A] dark:text-white mb-4">
              Get Started with RIVA
            </h1>
            <p className="text-lg text-[#475569] dark:text-gray-300">
              Join thousands of drivers and fleet managers who trust RIVA for safer journeys
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-[#475569] dark:text-gray-300 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-[#0F172A] dark:text-white placeholder-gray-500"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-[#475569] dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-[#0F172A] dark:text-white placeholder-gray-500"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-medium text-[#475569] dark:text-gray-300 mb-2">
                  I am a...
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'driver', label: 'Driver', icon: User },
                    { value: 'fleet', label: 'Fleet Manager', icon: Truck },
                    { value: 'organization', label: 'Organization', icon: Building2 }
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, role: option.value })}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        formData.role === option.value
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                          : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                      }`}
                    >
                      <option.icon className="w-6 h-6 mx-auto mb-2 text-[#2563EB]" />
                      <span className="text-sm font-medium text-[#0F172A] dark:text-white">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Number of Vehicles */}
              <div>
                <label className="block text-sm font-medium text-[#475569] dark:text-gray-300 mb-2">
                  Number of Vehicles
                </label>
                <div className="relative">
                  <Truck className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    value={formData.vehicles}
                    onChange={(e) => setFormData({ ...formData, vehicles: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-[#0F172A] dark:text-white placeholder-gray-500"
                    placeholder="Enter number of vehicles"
                    min="1"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white py-4 rounded-lg font-semibold text-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <span>Create Account</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            <p className="text-center text-sm text-[#64748B] dark:text-gray-400 mt-6">
              Already have an account? <a href="/login" className="text-blue-600 hover:underline">Log in</a>
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
