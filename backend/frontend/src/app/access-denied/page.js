'use client'

import { motion } from 'framer-motion'
import { ShieldAlert, Home } from 'lucide-react'
import Link from 'next/link'

export default function AccessDenied() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] dark:from-[#0f172a] dark:to-[#1e293b] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-12 shadow-2xl max-w-md w-full text-center"
      >
        <div className="w-24 h-24 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShieldAlert className="w-12 h-12 text-red-500" />
        </div>
        <h1 className="text-3xl font-bold text-[#0f172a] dark:text-white mb-4">Access Denied</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          You don't have permission to access this page. Please contact your administrator if you believe this is an error.
        </p>
        <Link href="/">
          <button className="w-full px-6 py-3 bg-[#2563EB] text-white rounded-lg font-semibold hover:bg-[#1d4ed8] transition-colors flex items-center justify-center space-x-2">
            <Home className="w-5 h-5" />
            <span>Return to Home</span>
          </button>
        </Link>
      </motion.div>
    </div>
  )
}
