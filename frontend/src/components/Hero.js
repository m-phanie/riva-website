'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Star } from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Hero() {
  const { t } = useLanguage()

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/s1.jpg"
          alt="RIVA Background"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = 'none'
          }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/10 to-transparent dark:from-gray-900/20 dark:via-gray-900/10 dark:to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30"></div>
      </div>


      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center text-center">
            {/* Text Content */}
            <motion.div
              className="w-full max-w-3xl px-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full mb-6 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
            >
              <span className="text-sm font-medium">✦ {t('aiPowered')}</span>
            </motion.div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-[#0f172a] dark:text-white mb-6 leading-tight">
              {t('heroTitle')}
              <br />
              <span className="bg-gradient-to-r from-[#2563EB] to-[#7C3AED] bg-clip-text text-transparent">
                {t('heroSubtitle')}
              </span>
            </h1>

            {/* Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-[#475569] dark:text-gray-300 max-w-xl mb-8 leading-relaxed"
            >
              {t('heroDescription')}
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-10"
            >
              <Link href="/get-started" className="px-8 py-4 bg-[#064e3b] hover:bg-[#065f46] rounded-full text-white font-semibold text-lg transition-all duration-300 flex items-center space-x-2">
                <span>{t('getStarted')}</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/try-app" className="px-8 py-4 border-2 border-[#064e3b] rounded-full text-[#064e3b] font-semibold text-lg hover:bg-[#064e3b] hover:text-white transition-all duration-300 flex items-center space-x-2">
                <span>Try Demo App</span>
              </Link>
            </motion.div>

            {/* Trust badge */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex items-center space-x-4"
            >
              {/* Avatars */}
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white dark:border-gray-800 flex items-center justify-center text-white text-sm font-bold"
                  >
                    {i}
                  </div>
                ))}
              </div>
              {/* Stars */}
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <div>
                <div className="text-sm font-semibold text-[#0F172A] dark:text-white">{t('trustedBy')}</div>
              </div>
            </motion.div>
          </motion.div>

          </div>
        </div>
      </div>
    </section>
  )
}
