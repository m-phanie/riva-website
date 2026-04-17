'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Moon, Sun, Globe, Settings } from 'lucide-react'
import Link from 'next/link'
import { useTheme } from '@/contexts/ThemeContext'
import { useLanguage } from '@/contexts/LanguageContext'
import RIVALogo from '@/components/RIVALogo'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { language, changeLanguage, t } = useLanguage()

  const navItems = [
    { name: t('home'), href: '/', isPage: false },
    { name: t('features'), href: '#features', isPage: false },
    { name: t('howItWorksNav'), href: '#how-it-works', isPage: false },
    { name: t('appNav'), href: '#app', isPage: false },
    { name: t('about'), href: '/about', isPage: true },
    { name: t('contact'), href: '/contact', isPage: true },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 soft-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <Link href="/" className="group">
              <RIVALogo variant="full" size="large" />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            {navItems.map((item, index) => (
              item.isPage ? (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link 
                    href={item.href} 
                    className="text-[#475569] dark:text-gray-300 hover:text-[#2563EB] dark:hover:text-[#7C3AED] transition-colors duration-200 font-medium"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ) : (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-[#475569] dark:text-gray-300 hover:text-[#2563EB] dark:hover:text-[#7C3AED] transition-colors duration-200 font-medium"
                >
                  {item.name}
                </motion.a>
              )
            ))}

            {/* Settings Menu */}
            <div className="relative">
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <Settings size={20} />
              </motion.button>

              <AnimatePresence>
                {isSettingsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 top-12 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 py-4 w-56"
                  >
                    {/* Language Selector */}
                    <div className="px-4 pb-3 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center space-x-2 mb-3 text-gray-600 dark:text-gray-300">
                        <Globe size={18} />
                        <span className="font-medium text-sm">Language</span>
                      </div>
                      <div className="space-y-1">
                        {[
                          { code: 'english', label: 'English' },
                          { code: 'kinyarwanda', label: 'Kinyarwanda' },
                          { code: 'french', label: 'Français' }
                        ].map((lang) => (
                          <button
                            key={lang.code}
                            onClick={() => {
                              changeLanguage(lang.code)
                            }}
                            className={`w-full px-3 py-2 text-left text-sm rounded-lg transition-colors ${
                              language === lang.code
                                ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                            }`}
                          >
                            {lang.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Theme Toggle */}
                    <div className="px-4 pt-3">
                      <div className="flex items-center space-x-2 mb-3 text-gray-600 dark:text-gray-300">
                        {theme === 'light' ? <Sun size={18} /> : <Moon size={18} />}
                        <span className="font-medium text-sm">Theme</span>
                      </div>
                      <button
                        onClick={toggleTheme}
                        className="w-full px-3 py-2 text-left text-sm rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2"
                      >
                        {theme === 'light' ? (
                          <>
                            <Moon size={16} />
                            <span>Dark Mode</span>
                          </>
                        ) : (
                          <>
                            <Sun size={16} />
                            <span>Light Mode</span>
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Link href="/login">
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.45 }}
                className="gradient-btn px-6 py-2.5 rounded-full text-white font-semibold"
              >
                Request Demo →
              </motion.button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#475569] dark:text-gray-300 hover:text-[#2563EB] dark:hover:text-[#7C3AED]"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden soft-nav border-t border-gray-200 dark:border-gray-700"
          >
            <div className="px-4 pt-4 pb-6 space-y-3">
              {navItems.map((item) => (
                item.isPage ? (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-4 py-3 text-[#475569] dark:text-gray-300 hover:text-[#2563EB] dark:hover:text-[#7C3AED] hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block px-4 py-3 text-[#475569] dark:text-gray-300 hover:text-[#2563EB] dark:hover:text-[#7C3AED] hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </a>
                )
              ))}

              {/* Settings Mobile */}
              <div className="px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center space-x-2 mb-3 text-gray-600 dark:text-gray-300">
                  <Settings size={20} />
                  <span className="font-medium">Settings</span>
                </div>

                {/* Language Selector */}
                <div className="mb-4">
                  <div className="flex items-center space-x-2 mb-2 text-gray-600 dark:text-gray-300 text-sm">
                    <Globe size={16} />
                    <span>Language</span>
                  </div>
                  <div className="space-y-1">
                    {[
                      { code: 'english', label: 'English' },
                      { code: 'kinyarwanda', label: 'Kinyarwanda' },
                      { code: 'french', label: 'Français' }
                    ].map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className={`w-full px-3 py-2 text-left text-sm rounded-lg transition-colors ${
                          language === lang.code
                            ? 'bg-blue-500 text-white'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                        }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Theme Toggle */}
                <div>
                  <div className="flex items-center space-x-2 mb-2 text-gray-600 dark:text-gray-300 text-sm">
                    {theme === 'light' ? <Sun size={16} /> : <Moon size={16} />}
                    <span>Theme</span>
                  </div>
                  <button
                    onClick={toggleTheme}
                    className="w-full px-3 py-2 text-left text-sm rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2"
                  >
                    {theme === 'light' ? (
                      <>
                        <Moon size={16} />
                        <span>Dark Mode</span>
                      </>
                    ) : (
                      <>
                        <Sun size={16} />
                        <span>Light Mode</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
              <Link href="/login" className="w-full">
                <button className="w-full gradient-btn px-4 py-3 rounded-lg text-white font-semibold">
                  Request Demo →
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
