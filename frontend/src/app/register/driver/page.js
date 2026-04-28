'use client'

import { motion } from 'framer-motion'
import { Mail, Lock, User, ArrowRight, Eye, EyeOff, Car, Phone, CreditCard, Upload } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const API_URL = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/+$/, '')

export default function DriverRegister() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    idNumber: '',
    password: '',
    confirmPassword: ''
  })
  const [profilePicture, setProfilePicture] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }
    
    setIsLoading(true)
    setError('')

    console.log('Driver Register - Registering as driver')

    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          idNumber: formData.idNumber,
          password: formData.password,
          role: 'driver', // Hardcoded to driver
        }),
      })

      const data = await response.json()
      console.log('Driver Register - Response:', data)

      if (response.ok) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        // Save additional driver info for onboarding
        const userData = JSON.parse(localStorage.getItem('user'))
        userData.driverInfo = {
          phone: formData.phone,
          idNumber: formData.idNumber,
          profilePicture: profilePicture
        }
        localStorage.setItem('user', JSON.stringify(userData))
        window.location.href = '/onboarding/driver'
      } else {
        setError(data.message || 'Registration failed')
      }
    } catch (error) {
      setError('Network error. Please ensure backend is running.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f0f4ff] dark:bg-gray-900">
      <Navbar />
      
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8"
          >
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-[#2563EB] to-[#7C3AED] rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-[#0F172A] dark:text-white mb-2">
                Driver Registration
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Join RIVA as a driver
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] dark:text-white mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-[#1a6fd4] dark:bg-gray-700 dark:text-white transition-colors"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#0F172A] dark:text-white mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-[#1a6fd4] dark:bg-gray-700 dark:text-white transition-colors"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#0F172A] dark:text-white mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="tel"
                    placeholder="+250 788 123 456"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-[#1a6fd4] dark:bg-gray-700 dark:text-white transition-colors"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#0F172A] dark:text-white mb-2">
                  National ID Number
                </label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="11998800XXXX"
                    value={formData.idNumber}
                    onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-[#1a6fd4] dark:bg-gray-700 dark:text-white transition-colors"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#0F172A] dark:text-white mb-2">
                  Profile Picture
                </label>
                <div className="relative">
                  <Upload className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setProfilePicture(e.target.files[0])}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-[#1a6fd4] dark:bg-gray-700 dark:text-white transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#0F172A] dark:text-white mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-10 pr-12 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-[#1a6fd4] dark:bg-gray-700 dark:text-white transition-colors"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#0F172A] dark:text-white mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full pl-10 pr-12 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-[#1a6fd4] dark:bg-gray-700 dark:text-white transition-colors"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span>Creating Account...</span>
                ) : (
                  <>
                    <span>Create Driver Account</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                Already have an account?{' '}
                <Link href="/login" className="text-[#1a6fd4] hover:text-[#0f5cc4] font-semibold">
                  Login
                </Link>
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Register as:</p>
              <div className="flex space-x-4 justify-center">
                <Link href="/register/manager" className="text-[#1a6fd4] hover:text-[#0f5cc4] font-semibold text-sm">
                  Fleet Manager
                </Link>
                <span className="text-gray-400">•</span>
                <Link href="/register/admin" className="text-[#1a6fd4] hover:text-[#0f5cc4] font-semibold text-sm">
                  Admin
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
