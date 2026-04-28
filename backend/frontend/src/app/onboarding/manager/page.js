'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Truck, ArrowRight, CheckCircle } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function ManagerOnboarding() {
  const [formData, setFormData] = useState({
    fleetSize: '',
    companyName: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    console.log('Manager onboarding - Submitting form')

    // Simulate saving manager info
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Save to localStorage (in production, this would be an API call)
    const userData = JSON.parse(localStorage.getItem('user'))
    console.log('Manager onboarding - User data before update:', userData)
    
    userData.managerInfo = {
      fleetSize: formData.fleetSize,
      companyName: formData.companyName
    }
    localStorage.setItem('user', JSON.stringify(userData))
    
    console.log('Manager onboarding - User data after update:', userData)
    console.log('Manager onboarding - User role:', userData.role)

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
                Fleet Registered Successfully!
              </h2>
              
              <p className="text-[#475569] dark:text-gray-300 mb-8">
                Your fleet of {formData.fleetSize} vehicles has been registered. You can now access your manager dashboard.
              </p>

              <button
                onClick={() => {
                  console.log('Redirecting to manager dashboard')
                  window.location.href = '/manager-dashboard'
                }}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
              >
                <span>Go to Dashboard</span>
                <ArrowRight className="w-5 h-5" />
              </button>
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
              Register Your Fleet
            </h1>
            <p className="text-lg text-[#475569] dark:text-gray-300">
              Enter your fleet details to get started with RIVA
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#475569] dark:text-gray-300 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-[#0F172A] dark:text-white placeholder-gray-500"
                  placeholder="Your company name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#475569] dark:text-gray-300 mb-2">
                  Number of Vehicles in Fleet
                </label>
                <div className="relative">
                  <Truck className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    value={formData.fleetSize}
                    onChange={(e) => setFormData({ ...formData, fleetSize: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-[#0F172A] dark:text-white placeholder-gray-500"
                    placeholder="e.g., 25"
                    min="1"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white py-4 rounded-lg font-semibold text-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span>Registering Fleet...</span>
                ) : (
                  <>
                    <span>Register Fleet</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
