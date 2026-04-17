'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'
import { Star, Download, Shield, Users, Zap, ArrowRight } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function DownloadApp() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gray-200 dark:bg-gray-900">
      <Navbar />
      
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Left - App Info */}
            <div className="md:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="bg-blue-900 rounded-2xl shadow-xl p-6 sticky top-24">
                  {/* App Icon */}
                  <div className="w-16 h-16 mx-auto mb-4 bg-white/10 backdrop-blur-md rounded-xl p-3 shadow-md">
                    <img 
                      src="/images/logo.png" 
                      alt="RIVA Logo" 
                      className="w-full h-full object-contain filter brightness(0) invert(1)"
                    />
                  </div>
                  
                  <h1 className="text-2xl font-bold text-white text-center mb-2">
                    RIVA
                  </h1>
                  <p className="text-sm text-blue-200 text-center mb-4">
                    RIVA Technologies
                  </p>
                  
                  {/* Rating */}
                  <div className="flex items-center justify-center gap-1 mb-4">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <span className="text-blue-100 ml-2">4.8</span>
                  </div>
                  
                  <div className="text-sm text-blue-200 text-center mb-6">
                    10K+ {t('reviews')}
                  </div>
                  
                  {/* Download Button */}
                  <a
                    href="https://play.google.com/store/apps/details?id=host.exp.exponent"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold shadow-md hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <Download className="w-5 h-5" />
                    <span>{t('install')}</span>
                  </a>
                  
                  <div className="mt-4 text-center text-xs text-blue-200">
                    {t('updatedOn')} April 15, 2026
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-blue-700">
                    <div className="text-sm text-blue-200 mb-2">
                      <span className="font-semibold text-white">10K+</span> {t('downloads')}
                    </div>
                    <div className="text-sm text-blue-200">
                      {t('ratedFor')} <span className="font-semibold text-white">3+</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Right - App Details */}
            <div className="md:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                {/* About This App */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    {t('aboutThisApp')}
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {t('aboutThisAppDescription')}
                  </p>
                </div>
                
                {/* Data Safety */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    {t('dataSafety')}
                  </h2>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{t('encryptedTransfer')}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{t('encryptedTransferDesc')}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{t('requestDeletion')}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{t('requestDeletionDesc')}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* What's New */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    {t('whatsNew')}
                  </h2>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li>• Enhanced AI-powered accident detection</li>
                    <li>• Improved fuel theft prevention</li>
                    <li>• Real-time GPS tracking improvements</li>
                    <li>• Kinyarwanda language support</li>
                    <li>• Bug fixes and performance optimizations</li>
                  </ul>
                </div>
                
                {/* App Features */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    {t('appFeatures')}
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <Zap className="w-5 h-5 text-blue-600" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{t('realtimeMonitoring')}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-blue-600" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{t('safetyAlerts')}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-blue-600" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{t('fleetManagement')}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Star className="w-5 h-5 text-blue-600" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{t('predictiveMaintenance')}</span>
                    </div>
                  </div>
                </div>
                
                {/* Developer Contact */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    {t('developerContact')}
                  </h2>
                  <div className="space-y-2">
                    <p className="text-gray-700 dark:text-gray-300">
                      <span className="font-medium text-gray-900 dark:text-white">{t('email')}:</span> support@riva.rw
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                      <span className="font-medium text-gray-900 dark:text-white">{t('phone')}:</span> +250 788 123 456
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                      <span className="font-medium text-gray-900 dark:text-white">{t('website')}:</span> riva.rw
                    </p>
                  </div>
                </div>
                
                {/* Back Button */}
                <a
                  href="/"
                  className="inline-flex items-center space-x-2 text-[#2563EB] dark:text-[#7C3AED] hover:underline font-medium"
                >
                  <ArrowRight className="w-5 h-5 rotate-180" />
                  <span>{t('backToHome')}</span>
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  )
}
