'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock, Send, Facebook, Twitter, Linkedin, Instagram, Youtube, MessageCircle, Globe } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Contact() {
  const { t } = useLanguage()

  const contactInfo = [
    {
      icon: Mail,
      label: t('email'),
      value: 'info@riva.rw',
      link: 'mailto:info@riva.rw',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Phone,
      label: t('phone'),
      value: '+250 788 123 456',
      link: 'tel:+250788123456',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: MapPin,
      label: 'Address',
      value: 'Kigali, Rwanda',
      link: 'https://maps.google.com',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: Clock,
      label: 'Hours',
      value: 'Mon-Fri: 9AM - 6PM',
      link: null,
      color: 'bg-orange-100 text-orange-600'
    },
  ]

  const socialMedia = [
    {
      icon: Facebook,
      name: 'Facebook',
      handle: 'Riva vehicle assistant',
      link: 'https://facebook.com/Rivavehicleassistant',
      color: 'bg-blue-600'
    },
    {
      icon: Twitter,
      name: 'Twitter/X',
      handle: '@riva_rwanda',
      link: 'https://twitter.com/riva_rwanda',
      color: 'bg-sky-500'
    },
    {
      icon: Linkedin,
      name: 'LinkedIn',
      handle: 'RIVA Technologies',
      link: 'https://linkedin.com/company/riva-technologies',
      color: 'bg-blue-700'
    },
    {
      icon: Instagram,
      name: 'Instagram',
      handle: 'riva6302026',
      link: 'https://instagram.com/riva6302026',
      color: 'bg-pink-600'
    },
    {
      icon: Youtube,
      name: 'YouTube',
      handle: 'RIVA Official',
      link: 'https://youtube.com/@rivaofficial',
      color: 'bg-red-600'
    },
    {
      icon: MessageCircle,
      name: 'WhatsApp',
      handle: '+250 788 123 456',
      link: 'https://wa.me/250788123456',
      color: 'bg-green-500'
    },
    {
      icon: Globe,
      name: 'Website',
      handle: 'www.riva.rw',
      link: 'https://www.riva.rw',
      color: 'bg-indigo-600'
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
            <h1 className="text-5xl md:text-6xl font-bold text-[#0F172A] dark:text-white mb-6">
              {t('contactUs')}
            </h1>
            <p className="text-xl text-[#475569] dark:text-gray-300 max-w-3xl mx-auto">
              {t('contactDescription')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <motion.a
                key={index}
                href={info.link}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 ${info.color}`}>
                  <info.icon className="w-7 h-7" />
                </div>
                <h3 className="text-sm font-semibold text-[#475569] dark:text-gray-400 mb-2">{info.label}</h3>
                <p className="text-lg font-bold text-[#0F172A] dark:text-white">{info.value}</p>
              </motion.a>
            ))}
          </div>

          {/* Contact Form */}
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8"
            >
              <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white mb-6">{t('sendMessage')}</h2>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-[#475569] dark:text-gray-400 mb-2">
                    {t('fullName')}
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-[#1a6fd4] transition-colors bg-white dark:bg-gray-700 text-[#0F172A] dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#475569] dark:text-gray-400 mb-2">
                    {t('emailAddress')}
                  </label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-[#1a6fd4] transition-colors bg-white dark:bg-gray-700 text-[#0F172A] dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#475569] dark:text-gray-400 mb-2">
                    {t('phoneNumber')}
                  </label>
                  <input
                    type="tel"
                    placeholder="+250 788 123 456"
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-[#1a6fd4] transition-colors bg-white dark:bg-gray-700 text-[#0F172A] dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#475569] dark:text-gray-400 mb-2">
                    {t('subject')}
                  </label>
                  <input
                    type="text"
                    placeholder={t('howCanWeHelp')}
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-[#1a6fd4] transition-colors bg-white dark:bg-gray-700 text-[#0F172A] dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#475569] dark:text-gray-400 mb-2">
                    {t('message')}
                  </label>
                  <textarea
                    rows={5}
                    placeholder={t('tellUsMore')}
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-[#1a6fd4] transition-colors resize-none bg-white dark:bg-gray-700 text-[#0F172A] dark:text-white"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-[#1a6fd4] rounded-full text-white font-semibold text-lg hover:bg-[#1558b0] transition-colors flex items-center justify-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>{t('sendButton')}</span>
                </button>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8"
            >
              <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white mb-6">{t('findUsOnSocial')}</h2>
              <p className="text-[#475569] dark:text-gray-400 mb-8">
                {t('socialDescription')}
              </p>
              
              <div className="space-y-4">
                {socialMedia.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 ${social.color} rounded-full flex items-center justify-center`}>
                        <social.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#0F172A] dark:text-white">{social.name}</h3>
                        <p className="text-sm text-[#475569] dark:text-gray-400">{social.handle}</p>
                      </div>
                    </div>
                    <div className="text-[#1a6fd4]">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-[#0F172A] dark:text-white mb-4">{t('visitOurOffice')}</h2>
            <p className="text-[#475569] dark:text-gray-300">
              {t('visitOfficeDesc')}
            </p>
          </motion.div>

          <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl overflow-hidden h-96">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.4777569185787!2d30.0619!3d-1.9536!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19d0747e2b2b2b2b%3A0x0!2sKigali%2C%20Rwanda!5e0!3m2!1sen!2sus!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
