'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Car, ArrowRight, CheckCircle } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function DriverOnboarding() {
  const [formData, setFormData] = useState({
    plateNumber: '',
    carModel: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate saving driver info
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Save to localStorage (in production, this would be an API call)
    const userData = JSON.parse(localStorage.getItem('user'))
    userData.driverInfo = {
      plateNumber: formData.plateNumber,
      carModel: formData.carModel
    }
    localStorage.setItem('user', JSON.stringify(userData))

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
                Vehicle Registered Successfully!
              </h2>
              
              <p className="text-[#475569] dark:text-gray-300 mb-8">
                Your vehicle with plate number {formData.plateNumber} has been registered. You can now access your driver dashboard.
              </p>

              <button
                onClick={() => window.location.href = '/onboarding/driver-complete'}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
              >
                <span>Continue to Profile Setup</span>
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
              Register Your Vehicle
            </h1>
            <p className="text-lg text-[#475569] dark:text-gray-300">
              Enter your vehicle details to get started with RIVA
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
                  License Plate Number
                </label>
                <div className="relative">
                  <Car className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.plateNumber}
                    onChange={(e) => setFormData({ ...formData, plateNumber: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-[#0F172A] dark:text-white placeholder-gray-500"
                    placeholder="e.g., RWA-123"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#475569] dark:text-gray-300 mb-2">
                  Car Model (Optional)
                </label>
                <input
                  type="text"
                  value={formData.carModel}
                  onChange={(e) => setFormData({ ...formData, carModel: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-[#0F172A] dark:text-white placeholder-gray-500"
                  placeholder="e.g., Toyota Corolla"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white py-4 rounded-lg font-semibold text-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span>Registering Vehicle...</span>
                ) : (
                  <>
                    <span>Register Vehicle</span>
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
