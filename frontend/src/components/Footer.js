'use client'

import { Twitter, Linkedin, Instagram, Youtube } from 'lucide-react'
import RIVALogo from '@/components/RIVALogo'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="py-16 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo on left */}
          <div className="flex items-center">
            <RIVALogo variant="full" size="medium" />
          </div>

          {/* Copyright centered */}
          <div className="text-center">
            <p className="text-[#475569] dark:text-gray-400">
              © 2026 RIVA Technologies. {t('rightsReserved')}.
            </p>
          </div>

          {/* Social icons on right */}
          <div className="flex space-x-4">
            <a
              href="#"
              className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-[#2563EB] dark:hover:text-[#7C3AED] hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
              aria-label="Twitter"
            >
              <Twitter size={20} />
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-[#2563EB] dark:hover:text-[#7C3AED] hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-[#2563EB] dark:hover:text-[#7C3AED] hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-[#2563EB] dark:hover:text-[#7C3AED] hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
              aria-label="YouTube"
            >
              <Youtube size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
