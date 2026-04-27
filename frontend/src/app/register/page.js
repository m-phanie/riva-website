'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Car, Truck, Building2 } from 'lucide-react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function Register() {
  return (
    <div className="min-h-screen bg-[#f0f4ff] dark:bg-gray-900">
      <Navbar />
      
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-[#0F172A] dark:text-white mb-4">
              Create Your Account
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Choose your role to get started with RIVA
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Driver Card */}
            <Link href="/register/driver">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 hover:shadow-3xl transition-all duration-300 cursor-pointer group h-full"
              >
                <div className="w-20 h-20 bg-gradient-to-r from-[#2563EB] to-[#7C3AED] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Car className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#0F172A] dark:text-white mb-3 text-center">Driver</h3>
                <p className="text-gray-600 dark:text-gray-400 text-center mb-4">
                  Register as a driver to access vehicle monitoring and safety features
                </p>
                <div className="flex items-center justify-center text-[#2563EB] group-hover:text-[#1d4ed8] font-semibold">
                  <span>Register as Driver</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </motion.div>
            </Link>

            {/* Manager Card */}
            <Link href="/register/manager">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 hover:shadow-3xl transition-all duration-300 cursor-pointer group h-full"
              >
                <div className="w-20 h-20 bg-gradient-to-r from-[#10B981] to-[#059669] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Truck className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#0F172A] dark:text-white mb-3 text-center">Fleet Manager</h3>
                <p className="text-gray-600 dark:text-gray-400 text-center mb-4">
                  Manage your fleet, track drivers, and monitor vehicle performance
                </p>
                <div className="flex items-center justify-center text-[#10B981] group-hover:text-[#059669] font-semibold">
                  <span>Register as Manager</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </motion.div>
            </Link>

            {/* Admin Card */}
            <Link href="/register/admin">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 hover:shadow-3xl transition-all duration-300 cursor-pointer group h-full"
              >
                <div className="w-20 h-20 bg-gradient-to-r from-[#F59E0B] to-[#D97706] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Building2 className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#0F172A] dark:text-white mb-3 text-center">Admin</h3>
                <p className="text-gray-600 dark:text-gray-400 text-center mb-4">
                  Government/Authority account for oversight and compliance
                </p>
                <div className="flex items-center justify-center text-[#F59E0B] group-hover:text-[#D97706] font-semibold">
                  <span>Register as Admin</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </motion.div>
            </Link>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <Link href="/login" className="text-[#1a6fd4] hover:text-[#0f5cc4] font-semibold">
                Login
              </Link>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
