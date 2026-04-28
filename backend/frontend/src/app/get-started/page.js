'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'
import { ArrowRight, Car, Truck, Building2 } from 'lucide-react'

export default function GetStarted() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0F9FF] via-[#E0F2FE] to-[#DBEAFE] dark:from-[#0C1222] dark:via-[#1E293B] dark:to-[#334155]">
      <Navbar />
      
      <section className="pt-32 pb-24 px-4">
        <div className="max-w-5xl mx-auto">
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Driver Card */}
            <motion.a
              href="/register/driver"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 cursor-pointer group"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-[#2563EB] to-[#7C3AED] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Car className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#0F172A] dark:text-white mb-3 text-center">Driver</h3>
              <p className="text-gray-600 dark:text-gray-400 text-center mb-4">
                Register as a driver to access vehicle monitoring and safety features
              </p>
              <div className="flex items-center justify-center text-[#2563EB] group-hover:text-[#1d4ed8] font-semibold">
                <span>Register as Driver</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </motion.a>

            {/* Manager Card */}
            <motion.a
              href="/register/manager"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 cursor-pointer group"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-[#10B981] to-[#059669] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#0F172A] dark:text-white mb-3 text-center">Fleet Manager</h3>
              <p className="text-gray-600 dark:text-gray-400 text-center mb-4">
                Manage your fleet, track drivers, and monitor vehicle performance
              </p>
              <div className="flex items-center justify-center text-[#10B981] group-hover:text-[#059669] font-semibold">
                <span>Register as Manager</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </motion.a>

            {/* Admin Card */}
            <motion.a
              href="/register/admin"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 cursor-pointer group"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-[#F59E0B] to-[#D97706] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#0F172A] dark:text-white mb-3 text-center">Admin</h3>
              <p className="text-gray-600 dark:text-gray-400 text-center mb-4">
                Government/Authority account for oversight and compliance
              </p>
              <div className="flex items-center justify-center text-[#F59E0B] group-hover:text-[#D97706] font-semibold">
                <span>Register as Admin</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </motion.a>
          </div>

          <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <a href="/login" className="text-[#2563EB] hover:text-[#1d4ed8] font-semibold">
              Login
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
