'use client'

import { motion } from 'framer-motion'
import { Shield, Brain, Zap, Users, Target, Globe, Award, Heart } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useLanguage } from '@/contexts/LanguageContext'

export default function About() {
  const { t } = useLanguage()

  const values = [
    {
      icon: Shield,
      title: t('safetyFirst'),
      description: t('safetyFirstDesc'),
      color: 'bg-red-100 text-red-600'
    },
    {
      icon: Brain,
      title: t('aiInnovation'),
      description: t('aiInnovationDesc'),
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: Heart,
      title: t('communityImpact'),
      description: t('communityImpactDesc'),
      color: 'bg-blue-100 text-blue-600'
    },
  ]

  const stats = [
    { value: '10,000+', label: t('vehiclesProtected'), icon: Shield },
    { value: '98.7%', label: t('accuracyRate'), icon: Target },
    { value: '50+', label: t('partnerCompanies'), icon: Globe },
    { value: '24/7', label: t('monitoring'), icon: Zap },
  ]

  const team = [
    { name: 'Rukundo Hugue', image: '/images/Rukundo.png' },
    { name: 'Mucyo Epiphanie',  image: '/images/mucyo.png' },
    { name: 'Yagizeneza Aimme Hope',  image: '/images/yagizeneza.png' },
    { name: 'Irasubiza Jean Cadeau',  image: '/images/irasubiza.png' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0F9FF] via-[#E0F2FE] to-[#DBEAFE] dark:from-[#0C1222] dark:via-[#1E293B] dark:to-[#334155]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-24 px-6 relative">
        {/* Background Image with blur and tint */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-transparent"></div>
          <img
            src="/images/About background.png"
            alt="About Background"
            className="w-full h-full object-cover backdrop-blur-sm"
            style={{ filter: 'brightness(0.8) contrast(1.05)' }}
            onError={(e) => {
              e.target.style.display = 'none'
            }}
          />
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/70 via-white/40 to-transparent dark:from-black/70 dark:via-black/40 to-transparent"></div>
        
        {/* Content Container - Left Text Layout */}
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* Left Side - Text */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-md rounded-2xl shadow-md p-8">
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                  {t('aboutRiva')}
                </h1>
                <p className="text-lg text-gray-700 dark:text-gray-300 mt-4 leading-relaxed">
                  {t('aboutDescription')}
                </p>
              </div>
            </motion.div>
            
            {/* Right Side - Empty for background visibility */}
            <div></div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-[#0F172A] dark:text-white mb-6">{t('ourStory')}</h2>
              <p className="text-[#475569] dark:text-gray-400 mb-4">
                {t('storyParagraph1')}
              </p>
              <p className="text-[#475569] dark:text-gray-400 mb-4">
                {t('storyParagraph2')}
              </p>
              <p className="text-[#475569] dark:text-gray-400 mb-4">
                {t('storyParagraph3')}
              </p>
              <p className="text-[#475569] dark:text-gray-400 mb-4 italic font-semibold">
                {t('storyParagraph4')}
              </p>
              <p className="text-[#475569] dark:text-gray-400 mb-4">
                {t('storyParagraph5')}
              </p>
              <p className="text-[#475569] dark:text-gray-400">
                {t('storyParagraph6')}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8"
            >
              <h3 className="text-2xl font-bold text-[#0F172A] dark:text-white text-center mb-6">{t('ourMission')}</h3>
              <p className="text-[#475569] dark:text-gray-400 text-center leading-relaxed mb-6">
                {t('missionDescription')}
              </p>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
                <h3 className="text-2xl font-bold text-[#0F172A] dark:text-white text-center mb-4">{t('ourVision')}</h3>
                <p className="text-[#475569] dark:text-gray-400 text-center leading-relaxed">
                  {t('visionDescription')}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-[#0F172A] dark:text-white mb-4">{t('ourValues')}</h2>
            <p className="text-[#475569] dark:text-gray-400 max-w-2xl mx-auto">
              {t('valuesDescription')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow"
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${value.color}`}>
                  <value.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-[#0F172A] dark:text-white mb-3">{value.title}</h3>
                <p className="text-[#475569] dark:text-gray-400">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <stat.icon className="w-8 h-8 text-[#1a6fd4] mx-auto mb-3" />
                  <div className="text-3xl font-bold text-[#0F172A] dark:text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-[#475569] dark:text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Technology */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-[#0F172A] dark:text-white mb-4">{t('ourTechnology')}</h2>
            <p className="text-[#475569] dark:text-gray-400 max-w-2xl mx-auto">
              {t('technologyDescription')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-[#0F172A] dark:text-white mb-4">{t('rivaSoulAI')}</h3>
              <p className="text-[#475569] dark:text-gray-400 mb-4">
                {t('rivaSoulAIDesc')}
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-[#475569] dark:text-gray-400">
                  <Award className="w-5 h-5 text-green-600 mr-2" />
                  {t('realtimeAlcoholDetection')}
                </li>
                <li className="flex items-center text-[#475569] dark:text-gray-400">
                  <Award className="w-5 h-5 text-green-600 mr-2" />
                  {t('fuelTheftPrevention')}
                </li>
                <li className="flex items-center text-[#475569] dark:text-gray-400">
                  <Award className="w-5 h-5 text-green-600 mr-2" />
                  {t('predictiveMaintenance')}
                </li>
                <li className="flex items-center text-[#475569] dark:text-gray-400">
                  <Award className="w-5 h-5 text-green-600 mr-2" />
                  {t('voiceAssistantKinyarwanda')}
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-[#0F172A] dark:text-white mb-4">{t('smartMonitoring')}</h3>
              <p className="text-[#475569] dark:text-gray-400 mb-4">
                {t('smartMonitoringDesc')}
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-[#475569] dark:text-gray-400">
                  <Award className="w-5 h-5 text-green-600 mr-2" />
                  {t('realtimeGpsTracking')}
                </li>
                <li className="flex items-center text-[#475569] dark:text-gray-400">
                  <Award className="w-5 h-5 text-green-600 mr-2" />
                  {t('intelligentFuelUsage')}
                </li>
                <li className="flex items-center text-[#475569] dark:text-gray-400">
                  <Award className="w-5 h-5 text-green-600 mr-2" />
                  {t('sensorBasedDiagnostics')}
                </li>
                <li className="flex items-center text-[#475569] dark:text-gray-400">
                  <Award className="w-5 h-5 text-green-600 mr-2" />
                  {t('instantSafetyAlerts')}
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-[#0F172A] dark:text-white mb-4">{t('ourTeam')}</h2>
            <p className="text-[#475569] dark:text-gray-400 max-w-2xl mx-auto">
              {t('teamDescription')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 text-center"
              >
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center mx-auto mb-4 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.parentElement.innerHTML = `<span class="text-4xl">👤</span>`
                    }}
                  />
                </div>
                <h3 className="text-xl font-bold text-[#0F172A] dark:text-white mb-2">{member.name}</h3>
                <p className="text-[#475569] dark:text-gray-400">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
