'use client'

import { motion } from 'framer-motion'
import { Smartphone, Download, QrCode, Play } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useLanguage } from '@/contexts/LanguageContext'

export default function TryApp() {
  const { t } = useLanguage()

  const steps = [
    {
      number: 1,
      icon: Download,
      title: t('installExpoGo'),
      description: t('installExpoGoDesc'),
    },
    {
      number: 2,
      icon: Smartphone,
      title: t('openExpoGo'),
      description: t('openExpoGoDesc'),
    },
    {
      number: 3,
      icon: QrCode,
      title: t('scanQrCode'),
      description: t('scanQrCodeDesc'),
    },
    {
      number: 4,
      icon: Play,
      title: t('startUsing'),
      description: t('startUsingDesc'),
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] via-[#EAF2FF] to-[#DBEAFE] dark:from-[#0B0F1A] dark:via-[#111827] dark:to-[#1F2937]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-sm font-semibold mb-4">
              {t('demoMode')}
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-[#0F172A] dark:text-white mb-6">
              {t('tryRivaApp')}
            </h1>
            <p className="text-xl text-[#475569] dark:text-gray-300 max-w-3xl mx-auto">
              {t('tryRivaAppDesc')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow"
              >
                <div className="relative inline-block mb-4">
                  <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto">
                    <step.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                    {step.number}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-[#0F172A] dark:text-white mb-2">{step.title}</h3>
                <p className="text-sm text-[#475569] dark:text-gray-400">{step.description}</p>
              </motion.div>
            ))}
          </div>

          {/* QR Code Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-12 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-[#0F172A] dark:text-white mb-4">Scan QR Code</h2>
              <p className="text-[#475569] dark:text-gray-400 mb-8">
                Use Expo Go to scan this QR code and launch the demo
              </p>
              
              {/* QR Code Placeholder */}
              <div className="max-w-sm mx-auto mb-8">
                <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl p-8 aspect-square flex items-center justify-center">
                  <QrCode className="w-48 h-48 text-gray-400" />
                </div>
                <p className="text-sm text-[#475569] dark:text-gray-400 mt-4">
                  QR code will be displayed here from your Expo project
                </p>
              </div>

              {/* Play Store Button */}
              <motion.a
                href="https://play.google.com/store/apps/details?id=host.exp.exponent"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center space-x-3 bg-[#0F172A] dark:bg-white text-white dark:text-[#0F172A] px-8 py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity"
              >
                <Play className="w-6 h-6" />
                <span>Get Expo Go on Play Store</span>
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-blue-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h3 className="text-2xl font-bold text-[#0F172A] dark:text-white mb-4">
              {t('demoInformation')}
            </h3>
            <p className="text-[#475569] dark:text-gray-400 leading-relaxed">
              {t('demoInfoDesc')}
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
